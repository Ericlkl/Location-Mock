import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import { getRoute, getRouteToken } from "@/api";
// Types 
import { RouteResponse } from '@/types/apiResponse'
// Constant
import { HONG_KONG_COORINATE } from "@/constant";
// Custom Components
import MapWrapper from "@/components/Map/MapWrapper";
import MapComponent from "@/components/Map/MapComponent";
import SearchForm from "@/components/Form/SearchForm";

function App() {
  const [origin, setOrigin] = useState("Innocentre, Hong Kong");
  const [destination, setDestination] = useState("Hong Kong International Airport Terminal 1");
  const [route, setRoute] = useState<Array<[number, number]>>([]);

  const onFormSubmit = async () => {
    try {
      const { token } = await getRouteToken(origin, destination);
      const routeResponse = await getRoute(token);
      if (routeResponse.status === 'success') {
        setRoute(routeResponse.path)
      }
    } catch (error) {
      console.log("Query Route Failed!!! ")
      console.log(error)
    }
  };

  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(HONG_KONG_COORINATE);

  return (
    <MapWrapper>
      <Stack
        sx={{ width: "100%", height: "100%" }}
        direction={{ xs: "column", md: "row" }}
        spacing={1}
      >
        <SearchForm
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          onSubmit={onFormSubmit}
        />
        <MapComponent center={center} zoom={12} />
      </Stack>
    </MapWrapper>
  );
}

export default App;
