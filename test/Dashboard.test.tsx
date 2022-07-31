/* eslint-disable jest/expect-expect */
import React from 'react';
import {
	cleanup,
	render,
	screen,
	waitFor,
	within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import server from 'src/mocks/server';
import { rest } from 'msw';
import USER_LIST from './mocks/USER_LIST';
import SectionData from 'src/features/dashboard/home/ui/components/SectionData';

beforeEach(() => {
	server.use(
		rest.get('https://randomuser.me/api', (_, res, ctx) => {
			return res(ctx.json(USER_LIST));
		}),
	);
});

afterEach(() => {
	cleanup();
});

test('render Dashboard List Page', async () => {
	const queryClient = new QueryClient();
	render(
		<QueryClientProvider client={queryClient}>
			<SectionData />
		</QueryClientProvider>,
	);
	const label = await screen.findByText(/Search by Keyword Filter by Gender/);
	expect(label).toBeInTheDocument();

	let tbody;
	let rows;

	await waitFor(() => {
		[, tbody] = screen.getAllByRole('rowgroup');
		rows = within(tbody).getAllByRole('row');
		expect(rows.length).toBe(10);
	});
});
