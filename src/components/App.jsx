import React from 'react';

import { Form, ErrorBoundary } from './common';
import './styles.css'

export class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Form />
      </ErrorBoundary>
    )
  }
}
