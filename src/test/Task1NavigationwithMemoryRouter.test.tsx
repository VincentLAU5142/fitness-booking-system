import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App'; // Adjust the path as necessary

test('renders the home page by default', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Wait for loading to complete
  await waitFor(() => expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument());
});

test('navigates to the about page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Ensure there's a link to navigate to the About page
  const aboutLink = await screen.findByText('About Us'); // Use findByText for async elements
  aboutLink.click(); // Simulate the click event

  // Wait for loading to complete and the about page to be rendered
  await waitFor(() => expect(screen.getByText('About Us')).toBeInTheDocument());
});