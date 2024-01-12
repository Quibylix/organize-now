import { Button, FormField } from "@/features/ui";
import styles from "./register-form.module.css";

export default function RegisterForm() {
  return (
    <form className={styles.registerForm}>
      <FormField.Label label="Username">
        <FormField placeholder="Enter your username" type="text" />
      </FormField.Label>
      <FormField.Label label="Password">
        <FormField.Password placeholder="Enter your password" />
      </FormField.Label>
      <FormField.Label label="Confirm Password">
        <FormField.Password placeholder="Confirm your password" />
      </FormField.Label>
      <Button className={styles.submitButton} type="submit" width="full">
        Register
      </Button>
    </form>
  );
}
