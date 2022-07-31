/* eslint-disable jest/expect-expect */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import FormLogin from 'src/features/dashboard/login/ui/components/FormLogin';
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(cleanup);

test('renders Form Login component', async () => {
	const queryClient = new QueryClient();
	render(
		<QueryClientProvider client={queryClient}>
			<FormLogin />
		</QueryClientProvider>,
	);

	const label = await screen.findByText(/Login/);
	expect(label).toBeInTheDocument();

	const email = await screen.findByText(/Email/);
	expect(email).toBeInTheDocument();

	const pass = await screen.findByText(/Password/);
	expect(pass).toBeInTheDocument();

	const remember = await screen.findByText(/Remember me/);
	expect(remember).toBeInTheDocument();

	const signin = await screen.findByText(/Sign in/);
	expect(signin).toBeInTheDocument();

	const inputEmail = await screen.findByPlaceholderText(/Your email address/);
	expect(inputEmail).toBeInTheDocument();

	const inputPass = await screen.findByPlaceholderText(/Your Password/);
	expect(inputPass).toBeInTheDocument();
});
