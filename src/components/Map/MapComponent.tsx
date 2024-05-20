import { useRef, useEffect } from "react";

function MapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  }, [ref.current]);

  return <div ref={ref} style={{ 
    width: '100%',
    height: '100%'
  }} />;
}

export default MapComponent;