const RingBuilderFrame = () => {
	return (
		<div style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}>
			<iframe
				id='ring-builder-iframe'
				src='http://rbiframe.netlify.app/?locationId=uphmh4FJXquVB7TZBme8'
				title='Ring Builder'
				allowFullScreen
				style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
			/>
		</div>
	);
};

export default RingBuilderFrame;
