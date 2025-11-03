const RingBuilderFrame = () => {
	return (
		<div style={{ width: '100%', height: '100vh', border: 'none' }}>
			<iframe
				id='ring-builder-iframe'
				src='https://rbiframe.netlify.app/?locationId=uphmh4FJXquVB7TZBme8'
				title='Ring Builder'
				allowFullScreen
				style={{ width: '100%', height: '100%', border: 'none' }}
			/>
		</div>
	);
};

export default RingBuilderFrame;
