import { useState } from "react";
import Icon from "../icon/icon.component";
import Input, { InputProps } from "./input.component";
import styles from "./input.module.css";

export type PasswordInputProps = Omit<InputProps, "type"> & {};

export default function PasswordInput({ endContent, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Input
      type={showPassword ? "text" : "password"}
      endContent={
        <>
          <button
            className={styles.showPasswordButton}
            onClick={toggleShowPassword}
            aria-label="Toggle password visibility"
            type="button"
          >
            <Icon
              className={styles.showPasswordIcon}
              name={showPassword ? "eye-off" : "eye"}
            />
          </button>
          {endContent}
        </>
      }
      {...props}
    />
  );
}
