import { validatePassword, validateUsername } from "@/features/auth/utils";
import { useRequest } from "@/hooks";
import { ValidationResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { registerUser } from "../services";

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

  const {
    data: submitData,
    error: submitError,
    isLoading,
    handleRequest,
  } = useRequest<ValidationResponse>();
  const router = useRouter();

  useEffect(() => {
    if (!submitData) {
      return;
    }

    const { success } = submitData;

    if (success) {
      router.push("/");
    }
  }, [submitData, router]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const handleFormError = (err: unknown) => {
      if (err instanceof Error) {
        return err.message;
      }

      return "Something went wrong";
    };

    handleRequest(
      registerUser({ username: values.username, password: values.password }),
      {
        handleError: handleFormError,
      },
    );
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
