import { CalciteTile } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-tile";

interface CoordinatesProps {
  className?: string;
  latitude: number;
  longitude: number;
}

/**
 * Custom component to display map lat/lon coordinates
 */
export default function Coordinates(props: CoordinatesProps) {
  const { className, latitude, longitude } = props;

  return (
    <CalciteTile
      className={`${className}`}
      icon="map-pin"
      alignment="start"
      description={`${latitude.toFixed(2)} ${longitude.toFixed(2)}`}
      heading="Coordinates"
      scale="m"
    ></CalciteTile>
  );
}
