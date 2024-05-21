import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

// Custom Components
import MapWrapper from "@/components/Map/MapWrapper";
import MapComponent from "@/components/Map/MapComponent";
import SearchForm from "@/components/Form/SearchForm";
import { useRouteQuery } from "./hooks";

function App() {

  const {
    origin,
    destination,
    waypoints,
    queryState,
    setOrigin,
    setDestination,
    onFormSubmit,
    onReset
  } = useRouteQuery()

  return (
    <MapWrapper>
      <Stack
        sx={{ width: "100%", height: "100%" }}
        direction={{ xs: "column", md: "row" }}
        spacing={1}
      >
        <SearchForm
          origin={origin}
          destination={destination}
          queryState={queryState}
          setOrigin={setOrigin}
          setDestination={setDestination}
          onSubmit={onFormSubmit}
          onReset={onReset}
        />
        <MapComponent zoom={12} waypoints={waypoints} />
      </Stack>
    </MapWrapper>
  );
}

export default App;
