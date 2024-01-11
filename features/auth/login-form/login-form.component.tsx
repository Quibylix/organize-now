import { Button, FormField } from "@/features/ui";
import styles from "./login-form.module.css";

export default function LoginForm() {
  return (
    <form className={styles.loginForm}>
      <FormField.Label label="Username">
        <FormField placeholder="Enter your username" type="text" />
      </FormField.Label>
      <FormField.Label label="Password">
        <FormField.Password placeholder="Enter your password" />
      </FormField.Label>
      <Button type="submit" className={styles.submitButton} width="full">
        Login
      </Button>
    </form>
  );
}
