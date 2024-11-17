/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-scene';
import '@arcgis/map-components/dist/components/arcgis-home';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import {
	ArcgisMap,
	ArcgisScene,
	ArcgisHome,
	ArcgisZoom,
} from '@arcgis/map-components-react';
import Extent from '@arcgis/core/geometry/Extent';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';

import './Map.css';

interface MapProps {
	basemap: string;
	onViewReady: () => void;
	onViewClick: (event: any) => void;
	is3D: boolean;
}

// Define the extent to block vertical dragging
const extent = new Extent({
	xmin: -3600, // Westernmost longitude
	ymin: -70, // Southernmost latitude
	xmax: 3600, // Easternmost longitude
	ymax: 70, // Northernmost latitude
	spatialReference: SpatialReference.WGS84, // Ensure this matches the map's spatial reference
});

export default function Map(props: MapProps) {
	const { basemap, onViewReady, onViewClick, is3D } = props;
	const sceneRef = useRef<HTMLArcgisSceneElement>(null);
	const mapRef = useRef<HTMLArcgisMapElement>(null);
	const [viewReady, setViewReady] = useState(false);

	const handleViewReady = (view: any) => {
		console.log('View Ready');
		view.constraints = {
			minZoom: 3, // Minimum zoom level
			rotationEnabled: true, // Allow rotation
			geometry: extent, // Apply the extent as a constraint to block vertical dragging
		};

		// Add event listeners
		view.on('click', (event: any) => {
			onViewClick(event);
		});

		setViewReady(true);
		onViewReady();
	};

	return (
		<div className="container">
			{is3D ? (
				<ArcgisScene
					ref={sceneRef}
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view; // Access SceneView
						if (view) {
							handleViewReady(view);
						}
					}}
					itemId={'c56dab9e4d1a4b0c9d1ee7f589343516'}
				>
					{viewReady && (
						<>
							<ArcgisHome position="top-left" />
							<ArcgisZoom position="top-left" />
						</>
					)}
				</ArcgisScene>
			) : (
				<ArcgisMap
					ref={mapRef}
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view; // Access MapView
						if (view) {
							handleViewReady(view);
						}
					}}
					itemId={'05e015c5f0314db9a487a9b46cb37eca'}
					basemap={basemap}
					popupDisabled
				>
					{viewReady && (
						<>
							<ArcgisHome position="top-left" />
							<ArcgisZoom position="top-left" />
						</>
					)}
				</ArcgisMap>
			)}
		</div>
	);
}
