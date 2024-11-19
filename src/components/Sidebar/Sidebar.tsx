import '@esri/calcite-components/dist/components/calcite-navigation';
import '@esri/calcite-components/dist/components/calcite-navigation-logo';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import '@esri/calcite-components/dist/components/calcite-button';
import React from 'react';
import {
	CalcitePanel,
	CalciteSelect,
	CalciteOption,
	CalciteButton,
	CalciteLabel,
} from '@esri/calcite-components-react';
import './Sidebar.css';

interface MySidebarProps {
	basemap: string;
	setBasemap: (basemap: string) => void;
	is3D: boolean;
	toggle3D: () => void;
	isWeather: boolean;
	toggleWeather: () => void;
	isLineOfSight: boolean;
	toggleLineOfSight: () => void;
}

const MySidebar: React.FC<MySidebarProps> = ({
	basemap,
	setBasemap,
	is3D,
	toggle3D,
	toggleWeather,
	toggleLineOfSight,
}) => {
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

	const handleBasemapChange = (event: CustomEvent) => {
		const target = event.target as HTMLCalciteSelectElement;
		if (target) {
			setBasemap(target.value);
		}
	};

	return (
		<CalcitePanel>
			<CalciteLabel>
				Switch between 2D and 3D
				<CalciteButton
					onClick={toggle3D}
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

			<CalciteLabel>
				Weather View
				<CalciteButton
					onClick={toggleWeather}
					appearance="solid"
					iconStart="cloudy"
					style={{
						width: '100%',
						marginTop: '10px',
					}}
				>
					Weather
				</CalciteButton>
			</CalciteLabel>

			<CalciteLabel>
				Line of Sight
				<CalciteButton
					onClick={toggleLineOfSight}
					appearance="solid"
					iconStart="line-of-sight"
					style={{
						width: '100%',
						marginTop: '10px',
					}}
				>
					Line of Sight
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
	);
};

export default MySidebar;
