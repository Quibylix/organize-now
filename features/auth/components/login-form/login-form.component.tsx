"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import FormField from "@/features/ui/components/form-field/form-field.component";
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
      {submitError && <Alert message={submitError} />}
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
