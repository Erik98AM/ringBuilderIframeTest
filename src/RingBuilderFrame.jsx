import { useEffect } from 'react';
const severName = 'https://rbiframe.netlify.app';
// const severName = 'http://localhost:5173';
const RingBuilderFrame = () => {
	useEffect(() => {
		// Слушать запросы от iframe
		const handleMessage = event => {
			// Проверить что сообщение от вашего iframe
			if (event.origin !== `${severName}`) return;

			if (event.data.type === 'REQUEST_QUERY_PARAMS') {
				const iframe = document.getElementById('ring-builder-iframe');
				if (iframe && iframe.contentWindow) {
					// Отправить текущие query параметры
					const queryParams = window.location.search;
					iframe.contentWindow.postMessage(
						{ type: 'PARENT_QUERY_PARAMS', queryParams },
						`${severName}`
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
				src={`${severName}/?locationId=uphmh4FJXquVB7TZBme8`}
				title='Ring Builder'
				allowFullScreen
				style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
			/>
		</div>
	);
};

export default RingBuilderFrame;
