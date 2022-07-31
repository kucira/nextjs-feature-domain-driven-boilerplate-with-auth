import Head from 'next/head';
import React from 'react';

interface Props {
	title: string;
	children?: React.ReactNode;
}

const HeadMeta = ({ title, children }: Props) => {
	return (
		<Head>
			<title>{title}</title>
			{children}
		</Head>
	);
};

export default HeadMeta;
