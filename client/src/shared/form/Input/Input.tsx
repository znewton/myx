import * as React from 'react';
import style from './Input.st.css';

export type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];
export type InputUpdateHandler = (value: InputValue, name?: string) => void;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpdate?: InputUpdateHandler;
  label?: string;
  error?: string | null;
  initialValue?: InputValue;
}

export interface InputState {
  value?: InputValue | null;
}

export const Input: React.SFC<InputProps> = ({
  onUpdate,
  label,
  error,
  initialValue = '',
  className,
  ...others
}: InputProps) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (onUpdate) onUpdate(value);
  });

  return (
    <label
      {...style(
        'root',
        { empty: !value, error: !!error },
        { className, ...others }
      )}
    >
      <span className={style.label}>{label}</span>
      <input
        className={style.input}
        onChange={e => setValue(e.currentTarget.value)}
        {...others}
      />
      {!!error && <span className={style.error}>{error}</span>}
    </label>
  );
};
