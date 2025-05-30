import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Add your test assertions here
    // For example:
    // expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
}); 