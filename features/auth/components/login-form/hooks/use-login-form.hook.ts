import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { validateUsername } from "@/features/auth/utils/validate-username/validate-username.util";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { loginUser } from "../actions/login-user.action";

type FieldName = "username" | "password";

export function useLoginForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<FieldName, string>>({
    username: "",
    password: "",
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
    }
  };

  const handleChange = (fieldName: FieldName) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values, [fieldName]: event.target.value };

      setValues(newValues);

      handleErrors(newValues, fieldName);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameError = validateUsername(values.username).error ?? "";
    const passwordError = validatePassword(values.password).error ?? "";

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    if (usernameError || passwordError) {
      return;
    }

    setIsLoading(true);
    const { success, error } = await loginUser({
      username: values.username,
      password: values.password,
    });
    setIsLoading(false);

    if (!success) {
      setSubmitError(error ?? "Something went wrong");
      return;
    }

    router.push("/");
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
