import axios from "axios";

// Constant
import { BACKEND_API_BASEURL } from "@/constant";
// Types
import { RouteTokenResponse, RouteResponse } from "@/types/apiResponse";

const backend_api = axios.create({ baseURL: BACKEND_API_BASEURL });

export async function getRouteToken(
  origin: string,
  destination: string
): Promise<RouteTokenResponse> {
  try {
    const response = await backend_api.post<RouteTokenResponse>("/route", {
      origin,
      destination,
    });
    return response.data;
  } catch (error) {
    console.log("Get getRouteToken Failed!!!");
    console.log(error);
    throw error;
  }
}
export async function getRoute(token: string): Promise<RouteResponse> {
  try {
    const response = await backend_api.get<RouteResponse>(`/route/${token}`);
    // const response = await backend_api.get<RouteResponse>(`/mock/route/inprogress`);
    // const response = await backend_api.get<RouteResponse>(`/mock/route/success`);
    return response.data;
  } catch (error) {
    console.log("Get getRoute Failed!!!");
    console.log(error);
    throw error;
  }
}
export async function getInProgress() {
  try {
    const response = await backend_api.get("/mock/route/inprogress");
    return response.data;
  } catch (error) {
    console.log("Get getInProgress Failed!!!");
    console.log(error);
    throw error;
  }
}
