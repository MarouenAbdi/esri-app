import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CalciteTile } from '@esri/calcite-components-react';

const useCordPopup = (view: __esri.View | null) => {
	useEffect(() => {
		if (!view) return;

		const handleClick = (event: __esri.ViewClickEvent) => {
			const mapPoint = event.mapPoint;

			if (mapPoint) {
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

				if (view.popup) {
					view.popup.open({
						location: mapPoint,
						content: container,
					});
				}
			}
		};

		view.on('click', handleClick);

		return () => {
			view.on('click', handleClick).remove();
		};
	}, [view]);
};

export default useCordPopup;
