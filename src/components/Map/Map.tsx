/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import '@arcgis/map-components/dist/components/arcgis-map';
import '@arcgis/map-components/dist/components/arcgis-scene';
import '@arcgis/map-components/dist/components/arcgis-home';
import '@arcgis/map-components/dist/components/arcgis-zoom';
import '@arcgis/map-components/dist/components/arcgis-weather';
import '@arcgis/map-components/dist/components/arcgis-line-of-sight';
import '@arcgis/map-components/dist/components/arcgis-navigation-toggle';
import {
	ArcgisMap,
	ArcgisScene,
	ArcgisHome,
	ArcgisZoom,
	ArcgisWeather,
	ArcgisLineOfSight,
	ArcgisNavigationToggle,
} from '@arcgis/map-components-react';
import Extent from '@arcgis/core/geometry/Extent';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import './Map.css';
import { handleCordPopup } from '../../shared/utils';

interface MapProps {
	basemap: string;
	is3D: boolean;
	isWeather: boolean;
	isLineOfSight: boolean;
}

const extent = new Extent({
	xmin: -3600,
	ymin: -70,
	xmax: 3600,
	ymax: 70,
	spatialReference: SpatialReference.WGS84,
});

export default function Map(props: MapProps) {
	const { basemap, is3D, isWeather, isLineOfSight } = props;
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
		handleCordPopup(view, event.detail);
	};

	return (
		<div className="container">
			{isWeather ? (
				<ArcgisScene
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view;
						handleViewReady(view);
					}}
					itemId="c56dab9e4d1a4b0c9d1ee7f589343516"
				>
					<ArcgisWeather position="bottom-right" />
				</ArcgisScene>
			) : isLineOfSight ? (
				<ArcgisScene
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view;
						handleViewReady(view);
					}}
					itemId="82127fea11d6439abba3318cb93252f7"
				>
					<ArcgisLineOfSight position="bottom-right" />
				</ArcgisScene>
			) : is3D ? (
				<ArcgisScene
					onArcgisViewReadyChange={(event) => {
						const view = event.target.view;
						handleViewReady(view);
					}}
					itemId="e2da7564e4f24eaaa918ffd70378056a"
				>
					{viewReady && (
						<>
							<ArcgisZoom position="top-left" />
							<ArcgisNavigationToggle position="top-left" />
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
