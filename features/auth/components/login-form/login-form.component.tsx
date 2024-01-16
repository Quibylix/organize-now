import Button from "@/features/ui/components/button/button.component";
import FormField from "@/features/ui/components/form-field/form-field.component";
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
