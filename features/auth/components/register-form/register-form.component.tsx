"use client";

import { Button, FormField, Icon } from "@/features/ui/components";
import useRegisterForm from "./hooks/use-register-form.hook";
import styles from "./register-form.module.css";

export default function RegisterForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useRegisterForm();

  const { username, password, confirmPassword } = values;
  const {
    username: usernameError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = errors;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Register form"
      className={styles.registerForm}
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
            placeholder="Enter your username"
            value={username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
          />
        </FormField.Label>
      </FormField.WithError>
      <FormField.WithError error={passwordError}>
        <FormField.Label label="Password">
          <FormField.Password
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
          />
        </FormField.Label>
      </FormField.WithError>
      <FormField.WithError error={confirmPasswordError}>
        <FormField.Label label="Confirm Password">
          <FormField.Password
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
          />
        </FormField.Label>
      </FormField.WithError>
      <Button
        className={styles.submitButton}
        type="submit"
        width="full"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Register"}
      </Button>
    </form>
  );
}
