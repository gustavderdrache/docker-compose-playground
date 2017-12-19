import React from 'react';

import tryLogin from '../tryLogin';

interface AppState {
  username: string | null;
  error: Error | null;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      error: null,
      username: null,
    };
  }

  private handleClick = () => {
    const { error, username } = this.state;

    if (error || username) {
      return;
    }

    tryLogin()
      .then(
        user => this.setState({ username: user.getUsername()! }),
        error => this.setState({ error }),
      );
  }

  render() {
    const { error, username } = this.state;

    if (error) {
      const style = {
        color: 'red',
      };

      return (
        <div style={style}>{String(error)}</div>
      );
    }

    if (username) {
      return (
        <div>Logged-in username: {username}</div>
      );
    }

    return (
      <button type="button" onClick={this.handleClick}>Log in</button>
    );
  }
}
