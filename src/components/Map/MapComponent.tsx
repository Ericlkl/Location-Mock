import { useRef, useEffect, useState } from "react";

// Types
import { DirectionsWaypoint, QueryState } from "@/types";
// Constant
import { HONG_KONG_COORINATE } from "@/constant";

function MapComponent({
  zoom,
  waypoints,
}: {
  zoom: number;
  waypoints: DirectionsWaypoint[];
}) {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsDisplay] = useState(new google.maps.DirectionsRenderer());
  const [directionsService] = useState(new google.maps.DirectionsService());

  const fitMapBounds = (start: google.maps.LatLng, end: google.maps.LatLng) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    map?.fitBounds(bounds);
  };

  const removeRoute = () => {
    directionsDisplay.setMap(null);
  }

  const drawRoute = () => {
    if (waypoints.length < 2) {
      return removeRoute()
    }

    const origin = waypoints[0].location;
    const destinationIdx = waypoints.length - 1;
    const destination = waypoints[destinationIdx].location;

    fitMapBounds(origin, destination);

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      waypoints: waypoints.slice(1, destinationIdx),
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      }
      // else {
      //     alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      // }
    });

  };


  // Initialize Map
  useEffect(() => {
    if (ref.current) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: HONG_KONG_COORINATE,
          zoom,
        })
      );
    }
  }, [ref.current]);

  // Draw Route on Path change
  useEffect(() => {
    if(waypoints.length > 0) {
      drawRoute();
    }
    else {
      removeRoute();
    }
    
  }, [waypoints]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export default MapComponent;
