import { RouteResponse } from '@/types/apiResponse'

export type QueryState = RouteResponse | { status: "pending"  }

export type DirectionsWaypoint = {
  location: google.maps.LatLng
}