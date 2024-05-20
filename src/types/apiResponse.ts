export type RouteResponse =
  | { status: "in progress" }
  | {
      status: "failure";
      error: "Location not accessible by car";
    }
  | {
      path: Array<[number, number]>;
      total_time: number;
      total_distance: number;
      status: "success";
    };

export type RouteTokenResponse = { token: string };
