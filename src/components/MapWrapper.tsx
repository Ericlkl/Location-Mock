// Library 
import { ReactElement } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// Constant
import { GOOGLE_MAP_KEY } from '@/constant'

interface MapWrapperProps {
  children: ReactElement
}

const MapWrapper: React.FC<MapWrapperProps> = ({ children }) => {

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <h1>Loading...</h1>;
      case Status.FAILURE:
        return <h1>Failed to load google map...</h1>;
      case Status.SUCCESS:
        return children;
    }
  };

  return <Wrapper apiKey={GOOGLE_MAP_KEY} render={render} />
}

export default MapWrapper;