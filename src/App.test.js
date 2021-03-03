import { render, screen } from './testUtils'

import App from './App';

test('renders UI without crashing', () => {
  render(<App />, { initialState: {} })
  const linkElement = screen.getByText(/Welcome to Free-roam/i)
  expect(linkElement).toBeInTheDocument()
})
