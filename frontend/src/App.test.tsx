import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import App from './App';

const mockStore = (state = {}) => configureMockStore()(state);

test('renders learn react link', () => {
  const { getByText } = render(<App store={mockStore} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
