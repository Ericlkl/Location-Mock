import { useEffect, useState } from "react";

import { getRoute, getRouteToken } from "@/api";
// Types
import { DirectionsWaypoint, QueryState } from "@/types";

export function useRouteQuery(){
  const [origin, setOrigin] = useState("Innocentre, Hong Kong");
  const [destination, setDestination] = useState("Hong Kong International Airport Terminal 1");
  const [routeToken, setRouteToken] = useState("");
  const [waypoints, setwaypoints] = useState<DirectionsWaypoint[]>([])
  const [queryState, setQueryState] = useState<QueryState>({
    status: "pending"
  })

  const resetQueryResult = () => {
    setQueryState({
      status: "pending"
    })
    setRouteToken("")
    setwaypoints([])
  }

  const onReset = () => {
    setOrigin("")
    setDestination("")
    resetQueryResult()
  }

  const convertPathTowaypoints = (path: [string, string][]) => {
    return path.map((coordintate) => {
      const lat = Number(coordintate[0]);
      const lng = Number(coordintate[1]);
      return {
        location: new google.maps.LatLng(lat, lng),
      };
    });
  }

  const queryRoute = async (token: string) => {
    try {
      const routeResponse = await getRoute(token);
      // API Response 200 - In progress / Success / "failure"
      setQueryState(routeResponse)
      if (routeResponse.status === 'success') {
        setwaypoints(convertPathTowaypoints(routeResponse.path))
      }
    } catch (error) {
      console.log("Query Route Failed!!! ");
      console.log(error);
      setQueryState({
        status: "failure",
        error: "Internal Server Error"
      })
    }
  }

  const onFormSubmit = async () => {
    try {
      resetQueryResult()
      // Get Route token for query 
      const tokenResponse = await getRouteToken(origin, destination);
      setRouteToken(tokenResponse.token)
      await queryRoute(tokenResponse.token);
    } catch (error) {
      // Should stop requesting when the backend returns error.
      console.log("Submit Form Failed!!! ");
      console.log(error);
      setQueryState({
        status: "failure",
        error: "Internal Server Error"
      })
    }
  };

  // Retry logic when the backend is busy (returns in progress response).
  useEffect(() => {
    const isInProgress = queryState.status === 'in progress';
    const isFetchedToken = routeToken.length > 0;
    if (isInProgress && isFetchedToken) {
      queryRoute(routeToken)
    }
  }, [queryState.status, routeToken])

  return {
    origin,
    destination,
    waypoints,
    queryState,
    setOrigin,
    setDestination,
    onFormSubmit,
    onReset
  }
}