export type RouteResponse =
  | { status: "in progress" }
  | {
      status: "failure";
      error: string;
    }
  | {
      path: Array<[string, string]>;
      total_time: number;
      total_distance: number;
      status: "success";
    };

export type RouteTokenResponse = { token: string };
