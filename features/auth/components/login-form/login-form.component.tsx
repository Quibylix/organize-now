"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
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
      <Input.Password
        name="password"
        value={password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        placeholder="Enter your password"
        label="Password"
        error={passwordError}
      />
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
