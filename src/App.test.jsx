import { render } from '@testing-library/react';
import App from './App';
/* global describe, test */

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Add your test assertions here
    // For example:
    // expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
}); 