"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import PasswordInput from "@/features/ui/components/input/password-input.component";
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
      {submitError && <Alert message={submitError} />}
      <Input
        name="username"
        value={username}
        onChange={handleChange("username")}
        onBlur={handleBlur("username")}
        placeholder="Enter your username"
        type="text"
        label="Username"
        error={usernameError}
      />
      <PasswordInput
        name="password"
        value={password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        placeholder="Enter your password"
        label="Password"
        error={passwordError}
      />
      <PasswordInput
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        placeholder="Confirm your password"
        label="Confirm Password"
        error={confirmPasswordError}
      />
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
