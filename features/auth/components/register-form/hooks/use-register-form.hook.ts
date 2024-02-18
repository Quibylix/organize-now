import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { validateUsername } from "@/features/auth/utils/validate-username/validate-username.util";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { registerUser } from "../actions/register-user.action";

type FieldName = "username" | "password" | "confirmPassword";

export default function useRegisterForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<FieldName, string>>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const handleErrors = (
    values: Record<FieldName, string>,
    fieldName: FieldName,
  ) => {
    switch (fieldName) {
      case "username": {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: validateUsername(values.username).error ?? "",
        }));
        break;
      }
      case "password": {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: validatePassword(values.password).error ?? "",
        }));
        break;
      }
      case "confirmPassword": {
        const passwordsMatch = values.password === values.confirmPassword;
        setErrors(prevErrors => ({
          ...prevErrors,
          confirmPassword: passwordsMatch ? "" : "Passwords do not match",
        }));
        break;
      }
    }
  };

  const handleChange = (fieldName: FieldName) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values, [fieldName]: event.target.value };

      setValues(newValues);

      handleErrors(newValues, fieldName);
      handleErrors(newValues, "confirmPassword");
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameError = validateUsername(values.username).error ?? "";
    const passwordError = validatePassword(values.password).error ?? "";
    const confirmPasswordError =
      values.password === values.confirmPassword
        ? ""
        : "Passwords do not match";

    setErrors({
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (usernameError || passwordError || confirmPasswordError) {
      return;
    }

    setIsLoading(true);
    const { success, error } = await registerUser(values);
    setIsLoading(false);

    if (!success) {
      setSubmitError(error ?? "Something went wrong");
      return;
    }

    router.push("/onboarding/1");
  };

  const handleBlur = (fieldName: FieldName) => {
    return () => {
      handleErrors(values, fieldName);
    };
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  };
}
