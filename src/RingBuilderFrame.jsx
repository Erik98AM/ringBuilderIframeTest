import { useEffect } from 'react';

const severName = 'https://rbiframe.netlify.app';
// const severName = 'http://localhost:5173';

const RingBuilderFrame = () => {
	useEffect(() => {
		const iframe = document.getElementById('ring-builder-iframe');

		const handleMessage = event => {
			if (event.origin !== `${severName}`) return;

			// Handle query params request
			if (event.data.type === 'REQUEST_QUERY_PARAMS') {
				if (iframe && iframe.contentWindow) {
					const queryParams = window.location.search;
					iframe.contentWindow.postMessage(
						{ type: 'PARENT_QUERY_PARAMS', queryParams },
						`${severName}`
					);
				}
			}

			// Handle parent URL request
			if (event.data.type === 'REQUEST_PARENT_URL') {
				if (iframe && iframe.contentWindow) {
					iframe.contentWindow.postMessage(
						{ type: 'PARENT_URL_RESPONSE', url: window.location.href },
						`${severName}`
					);
				}
			}

			// Handle dynamic iframe height
			// if (event.data.type === 'resize' && event.data.height) {
			// 	if (iframe) {
			// 		iframe.style.height = event.data.height + 'px';
			// 	}
			// }
		};

		window.addEventListener('message', handleMessage);

		// Send initial parent URL when iframe loads
		const handleLoad = () => {
			setTimeout(() => {
				if (iframe && iframe.contentWindow) {
					iframe.contentWindow.postMessage(
						{ type: 'PARENT_URL_RESPONSE', url: window.location.href },
						`${severName}`
					);
				}
			}, 500);
		};

		if (iframe) {
			iframe.addEventListener('load', handleLoad);
		}

		let attempts = 0;
		const maxAttempts = 5;
		const interval = setInterval(() => {
			attempts++;

			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage(
					{ type: 'PARENT_URL_RESPONSE', url: window.location.href },
					`${severName}`
				);
			}

			if (attempts >= maxAttempts) {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			window.removeEventListener('message', handleMessage);
			if (iframe) {
				iframe.removeEventListener('load', handleLoad);
			}
			clearInterval(interval);
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
