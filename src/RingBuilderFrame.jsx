import { useEffect } from 'react';

const RingBuilderFrame = () => {
	useEffect(() => {
		// Слушать запросы от iframe
		const handleMessage = event => {
			// Проверить что сообщение от вашего iframe
			if (event.origin !== 'https://rbiframe.netlify.app') return;

			if (event.data.type === 'REQUEST_QUERY_PARAMS') {
				const iframe = document.getElementById('ring-builder-iframe');
				if (iframe && iframe.contentWindow) {
					// Отправить текущие query параметры
					const queryParams = window.location.search;
					iframe.contentWindow.postMessage(
						{ type: 'PARENT_QUERY_PARAMS', queryParams },
						'https://rbiframe.netlify.app'
					);
				}
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);
	return (
		<div style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}>
			<iframe
				id='ring-builder-iframe'
				src='https://rbiframe.netlify.app/?locationId=uphmh4FJXquVB7TZBme8'
				title='Ring Builder'
				allowFullScreen
				style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
			/>
		</div>
	);
};

export default RingBuilderFrame;
