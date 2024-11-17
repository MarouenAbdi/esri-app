/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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
import { handleCordPopup } from '../shared/utils';

interface MapProps {
	basemap: string;
	is3D: boolean;
}

const extent = new Extent({
	xmin: -3600,
	ymin: -70,
	xmax: 3600,
	ymax: 70,
	spatialReference: SpatialReference.WGS84,
});

export default function Map(props: MapProps) {
	const { basemap, is3D } = props;
	const [view, setView] = useState<__esri.View | null>(null);
	const [viewReady, setViewReady] = useState(false);

	const handleViewReady = (view: any) => {
		if (view) {
			view.constraints = {
				minZoom: 3,
				rotationEnabled: true,
				geometry: extent,
			};
			setView(view);
			setViewReady(true);
		}
	};

	const handleMapClick = (event: any) => {
		console.log('clicked');
		handleCordPopup(view, event.detail);
	};

	return (
		<div className="container">
			{is3D ? (
				<ArcgisScene
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view;
						handleViewReady(view);
					}}
					itemId="c56dab9e4d1a4b0c9d1ee7f589343516"
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
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view;
						handleViewReady(view);
					}}
					onArcgisViewClick={handleMapClick}
					itemId="d5dda743788a4b0688fe48f43ae7beb9"
					basemap={basemap}
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
