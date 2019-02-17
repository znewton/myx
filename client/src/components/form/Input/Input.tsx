import * as React from 'react';
import style from './Input.st.css';

export type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];
export type InputUpdateHandler = (value: InputValue, name?: string) => void;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpdate?: InputUpdateHandler;
  label?: string;
  initialValue?: InputValue;
}

export interface InputState {
  value?: InputValue | null;
}

export class Input extends React.Component<InputProps, InputState> {
  defaultProps: InputProps = {
    label: '',
    onUpdate: () => {},
  };
  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.value || props.initialValue || null,
    };
    this.handleInput = this.handleInput.bind(this);
  }
  render(): React.ReactNode {
    const { label, onUpdate, ...others } = this.props;
    return (
      <label {...style('root', {}, this.props)}>
        <span className="Input__label">{label}</span>
        <input
          className="Input__input"
          onInput={this.handleInput}
          onChange={this.handleInput}
          {...others}
        />
      </label>
    );
  }

  handleInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (this.props.value === null) {
      this.setState({ value });
    }
    if (this.props.onUpdate) {
      this.props.onUpdate(value);
    }
  }
}
