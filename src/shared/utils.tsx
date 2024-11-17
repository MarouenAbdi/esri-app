/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from 'react-dom/client';
import { CalciteTile } from '@esri/calcite-components-react';

export const handleCordPopup = (view: __esri.View | null, event: any) => {
	if (!view || !event.mapPoint) return;

	const mapPoint = event.mapPoint;

	console.log(mapPoint);

	const container = document.createElement('div');
	const root = createRoot(container);

	root.render(
		<CalciteTile
			icon="map-pin"
			alignment="start"
			description={`${mapPoint.latitude.toFixed(
				2
			)}, ${mapPoint.longitude.toFixed(2)}`}
			heading="Coordinates"
			scale="m"
		/>
	);

	view.openPopup({
		location: mapPoint,
		content: container.innerHTML,
	});
};
