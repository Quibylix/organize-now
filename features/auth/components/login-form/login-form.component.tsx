"use client";

import Button from "@/features/ui/components/button/button.component";
import FormField from "@/features/ui/components/form-field/form-field.component";
import Icon from "@/features/ui/components/icon/icon.component";
import { useLoginForm } from "./hooks/use-login-form.hook";
import styles from "./login-form.module.css";

export default function LoginForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useLoginForm();

  const { username, password } = values;
  const { username: usernameError, password: passwordError } = errors;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Login form"
      className={styles.loginForm}
    >
      {submitError && (
        <p className={styles.submitError}>
          <Icon name="info" className={styles.submitErrorIcon} />
          <span>{submitError}</span>
        </p>
      )}
      <FormField.WithError error={usernameError}>
        <FormField.Label label="Username">
          <FormField
            name="username"
            value={username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
            placeholder="Enter your username"
            type="text"
          />
        </FormField.Label>
      </FormField.WithError>
      <FormField.WithError error={passwordError}>
        <FormField.Label label="Password">
          <FormField.Password
            name="password"
            value={password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="Enter your password"
          />
        </FormField.Label>
      </FormField.WithError>
      <Button
        type="submit"
        className={styles.submitButton}
        width="full"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}
