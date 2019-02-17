import * as React from 'react';
import { Input, InputValue } from '../components/form';
import style from './login.st.css';

export interface LogInState {
  email: string;
  password: string;
  [key: string]: any;
}

export default class LogIn extends React.Component<{}, LogInState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render(): React.ReactNode {
    const { email, password } = this.state;

    return (
      <div {...style('root', {}, this.props)}>
        <Input
          type="email"
          name="email"
          value={email}
          label="Email"
          onUpdate={this.handleUpdate}
        />
        <Input
          type="password"
          name="password"
          value={password}
          label="Password"
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }

  handleUpdate(value: InputValue, name?: string) {
    if (name) {
      this.setState({ [name]: value });
    }
  }
}
