import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { validateUsername } from "@/features/auth/utils/validate-username/validate-username.util";
import { useRequest } from "@/hooks/use-request.hook";
import { ValidationResponse } from "@/types/validation-response.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginUser } from "../services/login-user.service";

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
    }
  };

  const handleChange = (fieldName: FieldName) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values, [fieldName]: event.target.value };

      setValues(newValues);

      handleErrors(newValues, fieldName);
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const handleFormError = (err: unknown) => {
      if (err instanceof Error) {
        return err.message;
      }

      return "Something went wrong";
    };

    handleRequest(
      loginUser({ username: values.username, password: values.password }),
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
