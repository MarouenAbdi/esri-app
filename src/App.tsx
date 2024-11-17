import { useState } from 'react';
import {
	CalciteNavigation,
	CalciteNavigationLogo,
	CalcitePanel,
	CalciteShell,
	CalciteShellPanel,
	CalciteSelect,
	CalciteOption,
	CalciteButton,
	CalciteLabel,
} from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-navigation';
import '@esri/calcite-components/dist/components/calcite-navigation-logo';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import '@esri/calcite-components/dist/components/calcite-button';
import './App.css';
import MyMap from './components/Map';

function App() {
	const [basemap, setBasemap] = useState('satellite');
	const [is3D, setIs3D] = useState(false);

	const handleBasemapChange = (event: CustomEvent) => {
		const target = event.target as HTMLCalciteSelectElement;
		if (target) {
			setBasemap(target.value);
		}
	};

	const basemaps = [
		{ value: 'streets', label: 'Streets' },
		{ value: 'satellite', label: 'Satellite' },
		{ value: 'hybrid', label: 'Hybrid' },
		{ value: 'topo-vector', label: 'Topographic' },
		{ value: 'gray-vector', label: 'Light Gray' },
		{ value: 'dark-gray-vector', label: 'Dark Gray' },
		{ value: 'oceans', label: 'Oceans' },
		{ value: 'terrain', label: 'Terrain' },
		{ value: 'osm', label: 'OpenStreetMap' },
	];

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
				<CalcitePanel>
					<CalciteLabel>
						Switch between 2D and 3D
						<CalciteButton
							onClick={() => setIs3D((prev) => !prev)}
							appearance="solid"
							iconStart={is3D ? '2d-explore' : 'cube'}
							style={{
								width: '100%',
								marginTop: '10px',
							}}
						>
							{is3D ? '2D' : '3D'}
						</CalciteButton>
					</CalciteLabel>

					{!is3D && (
						<CalciteLabel>
							Choose a basemap
							<CalciteSelect
								label="Basemap"
								style={{
									width: '100%',
									marginTop: '10px',
								}}
								value={basemap}
								onCalciteSelectChange={handleBasemapChange}
							>
								{basemaps.map(({ value, label }) => (
									<CalciteOption key={value} value={value}>
										{label}
									</CalciteOption>
								))}
							</CalciteSelect>
						</CalciteLabel>
					)}
				</CalcitePanel>
			</CalciteShellPanel>

			<CalcitePanel>
				<div className="map-container">
					<MyMap basemap={basemap} is3D={is3D} />
				</div>
			</CalcitePanel>
		</CalciteShell>
	);
}

export default App;
