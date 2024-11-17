import { useState } from 'react';
import { ArcgisMapCustomEvent } from '@arcgis/map-components';
import {
	CalciteNavigation,
	CalciteNavigationLogo,
	CalcitePanel,
	CalciteShell,
	CalciteShellPanel,
} from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-navigation';
import '@esri/calcite-components/dist/components/calcite-navigation-logo';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import './App.css';
import Coordinates from './components/Coordinates';
import MyMap from './components/Map';

function App() {
	const [basemap, setBasemap] = useState('satellite');
	const [coordinates, setCoordinates] = useState<__esri.Point>();
	const [is3D, setIs3D] = useState(false);

	// Handle basemap change
	const handleBasemapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setBasemap(event.target.value);
	};

	// Handle map click
	const handleViewClick = (
		event: ArcgisMapCustomEvent<__esri.ViewClickEvent>
	) => {
		setCoordinates(event.detail.mapPoint);
	};

	// Handle map ready
	const handleViewReady = () => {
		console.log('Map is ready');
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
					heading="React Concepts"
					description="Esri European Developer Summit 2024"
				></CalciteNavigationLogo>
			</CalciteNavigation>
			<CalciteShellPanel slot="panel-start">
				<CalcitePanel heading="Map Controls" className="options-container">
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
							<select
								style={{
									width: '100%',
									padding: '10px',
									marginBottom: '10px',
									border: '1px solid #ccc',
									borderRadius: '4px',
								}}
								value={basemap}
								onChange={handleBasemapChange}
							>
								{basemaps.map((mapStyle) => (
									<option key={mapStyle} value={mapStyle}>
										{mapStyle}
									</option>
								))}
							</select>
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
			<CalcitePanel heading="Map">
				<div className="map-container">
					<MyMap
						basemap={basemap}
						onViewReady={handleViewReady}
						onViewClick={handleViewClick}
						is3D={is3D} // Pass the is3D state
					/>
				</div>
			</CalcitePanel>
		</CalciteShell>
	);
}

export default App;
