
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../components/App.jsx'
import Related from '../components/RelatedAndComp/Related.jsx';

test('Checks to see if RELATED renders', () => {
  render(<Related />);

  const header = screen.getByClassName("sectionTitle")

  expect(header).toHaveContext("RELATED PRODUCTS")
})