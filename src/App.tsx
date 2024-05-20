import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

// Constant
import { HONG_KONG_COORINATE } from "@/constant";
// Custom Components
import MapWrapper from "@/components/Map/MapWrapper";
import MapComponent from "@/components/Map/MapComponent";
import SearchForm from "@/components/Form/SearchForm";

function App() {
  const [count, setCount] = useState(0);

  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(HONG_KONG_COORINATE);

  return (
    <MapWrapper>
      <Stack
        sx={{ width: "100%", height: "100%" }}
        direction={{ xs: "column", md: "row" }}
        spacing={1}
      >
        <SearchForm />
        <MapComponent center={center} zoom={12} />
      </Stack>
    </MapWrapper>
  );
}

export default App;
