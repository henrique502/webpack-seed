import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('render version', () => {
    process.env.REACT_APP_VERSION = '1.0.0';

    const {container} = render(
      <App />
    );

    expect(container.textContent).toEqual(`Versão: ${process.env.REACT_APP_VERSION}`);
  });
});
