function Error(props: any) {
	const { statusCode, err } = props;

	return (
		<div>
			<p>
				{statusCode} {err}
			</p>
		</div>
	);
}

Error.getInitialProps = (ctx: any) => {
	const { res, err } = ctx;
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode, err, ctx };
};

export default Error;
