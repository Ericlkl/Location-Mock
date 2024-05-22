import { useState } from "react";
import { getRoute, getRouteToken } from "@/api";
// Types
import { DirectionsWaypoint, QueryState } from "@/types";
// Constant
import { API_RETRY_MS } from "@/constant";

export function useRouteQuery(){
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setwaypoints] = useState<DirectionsWaypoint[]>([])
  const [queryState, setQueryState] = useState<QueryState>({
    status: "pending"
  })

  const resetQueryResult = () => {
    setQueryState({
      status: "pending"
    })
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
      else if (routeResponse.status === 'in progress') {
        // Retry to fet
        setTimeout(() => queryRoute(token), API_RETRY_MS) 
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
      const { token } = await getRouteToken(origin, destination);
      await queryRoute(token);
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