import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: undefined,
      message: undefined,
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080').then(async response => {
      const { status, statusText } = response;
      const message = await response.text();

      this.setState({
        status: `${status} ${statusText}`,
        message,
      });
    });
  }

  render() {
    const { message, status } = this.state;

    if (message !== undefined && status !== undefined) {
      return React.createElement(
        'div',
        null,
        React.createElement('p', null, status),
        React.createElement('p', null, message),
      );
    }

    return React.createElement('div', null, 'Contacting server...');
  }
}
