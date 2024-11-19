import { useState } from 'react';
import {
	CalciteShell,
	CalciteShellPanel,
	CalcitePanel,
	CalciteButton,
} from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import MyMap from './components/Map/Map';
import MySidebar from './components/Sidebar/Sidebar';

function App() {
	const [basemap, setBasemap] = useState('satellite');
	const [is3D, setIs3D] = useState(false);
	const [isWeather, setIsWeather] = useState(false);
	const [isLineOfSight, setIsLineOfSight] = useState(false);

	const toggle3D = () => {
		setIsWeather(false);
		setIsLineOfSight(false);
		setIs3D((prev) => !prev);
	};

	const toggleWeather = () => {
		setIsLineOfSight(false);
		setIsWeather((prev) => !prev);
		setIs3D(true);
	};

	const toggleLineOfSight = () => {
		setIsWeather(false);
		setIsLineOfSight((prev) => !prev);
		setIs3D(true);
	};

	const exitMode = () => {
		setIsWeather(false);
		setIsLineOfSight(false);
		setIs3D(false);
	};

	return (
		<CalciteShell>
			{!(isWeather || isLineOfSight) && (
				<CalciteShellPanel slot="panel-start">
					<MySidebar
						basemap={basemap}
						setBasemap={setBasemap}
						is3D={is3D}
						toggle3D={toggle3D}
						isWeather={isWeather}
						toggleWeather={toggleWeather}
						isLineOfSight={isLineOfSight}
						toggleLineOfSight={toggleLineOfSight}
					/>
				</CalciteShellPanel>
			)}

			<CalcitePanel>
				<div className="map-container">
					<MyMap
						basemap={basemap}
						is3D={is3D}
						isWeather={isWeather}
						isLineOfSight={isLineOfSight}
					/>
				</div>
				{(isWeather || isLineOfSight) && (
					<CalciteButton
						appearance="solid"
						width="auto"
						style={{
							position: 'absolute',
							bottom: '10px',
							left: '10px',
							zIndex: 1000,
						}}
						onClick={exitMode}
					>
						Exit Mode
					</CalciteButton>
				)}
			</CalcitePanel>
		</CalciteShell>
	);
}

export default App;
