import { useState } from 'react';
import { ArcgisMapCustomEvent } from '@arcgis/map-components';
import {
	CalciteNavigation,
	CalciteNavigationLogo,
	CalcitePanel,
	CalciteShell,
	CalciteShellPanel,
	CalciteSelect,
	CalciteOption,
} from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-navigation';
import '@esri/calcite-components/dist/components/calcite-navigation-logo';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import './App.css';
import Coordinates from './components/Coordinates';
import MyMap from './components/Map';

function App() {
	const [basemap, setBasemap] = useState('satellite');
	const [coordinates, setCoordinates] = useState<__esri.Point>();
	const [is3D, setIs3D] = useState(false);

	// Handle basemap change
	const handleBasemapChange = (event: CustomEvent) => {
		const target = event.target as HTMLCalciteSelectElement;
		if (target) {
			setBasemap(target.value);
		}
	};

	// Handle map click
	const handleViewClick = (
		event: ArcgisMapCustomEvent<__esri.ViewClickEvent>
	) => {
		setCoordinates(event.detail.mapPoint);
	};

	// List of available ESRI basemaps
	const basemaps = [
		'streets',
		'satellite',
		'hybrid',
		'topo-vector',
		'gray-vector',
		'dark-gray-vector',
		'oceans',
		'national-geographic',
		'terrain',
		'osm',
	];

	// Composition of components
	return (
		<CalciteShell>
			<CalciteNavigation navigation-action slot="header" id="nav">
				<CalciteNavigationLogo
					icon="clustering"
					slot="logo"
					heading="ArcGIS Map SDK - React"
				></CalciteNavigationLogo>
			</CalciteNavigation>
			<CalciteShellPanel slot="panel-start">
				<CalcitePanel style={{ padding: '10px' }} className="options-container">
					{/* 2D/3D Toggle */}
					<button
						onClick={() => setIs3D((prev) => !prev)}
						style={{
							marginBottom: '10px',
							padding: '5px',
							display: 'block',
							width: '100%',
						}}
					>
						{is3D ? 'Switch to 2D' : 'Switch to 3D'}
					</button>

					{/* Show basemap options if 2D */}
					{!is3D && (
						<>
							<h4>Choose a Basemap</h4>
							<CalciteSelect
								label="Basemap"
								style={{
									width: '100%',
									marginBottom: '10px',
								}}
								value={basemap}
								onCalciteSelectChange={handleBasemapChange}
							>
								{basemaps.map((mapStyle) => (
									<CalciteOption key={mapStyle} value={mapStyle}>
										{mapStyle}
									</CalciteOption>
								))}
							</CalciteSelect>
						</>
					)}

					{/* Show coordinates if available */}
					{coordinates && (
						<>
							<Coordinates
								className="coordinates"
								latitude={coordinates.latitude}
								longitude={coordinates.longitude}
							/>
						</>
					)}
				</CalcitePanel>
			</CalciteShellPanel>

			{/* Custom React component for the map */}
			<CalcitePanel>
				<div className="map-container">
					<MyMap
						basemap={basemap}
						onViewClick={handleViewClick}
						is3D={is3D} // Pass the is3D state
					/>
				</div>
			</CalcitePanel>
		</CalciteShell>
	);
}

export default App;
