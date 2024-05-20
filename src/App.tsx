import { useEffect, useState } from "react";
import { HONG_KONG_COORINATE } from "@/constant";

// Components
import MapWrapper from "@/components/MapWrapper";
import MapComponent from "@/components/Map";
function App() {
  const [count, setCount] = useState(0);

  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(HONG_KONG_COORINATE);

  return (
    <MapWrapper>
      <MapComponent center={center} zoom={12} />
    </MapWrapper>
  );
}

export default App;
