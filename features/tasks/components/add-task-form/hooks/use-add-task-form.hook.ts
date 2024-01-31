import { validatePriority } from "@/features/tasks/utils/validate-priority/validate-priority.util";
import { useRequest } from "@/hooks/use-request.hook";
import { ValidationResponse } from "@/types/validation-response.type";
import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { addTask } from "../services/add-task.service";
import { datetimeLocalValueToDate } from "../utils/datetime-local-value-to-date/datetime-local-value-to-date.util";
import { validateDatetime } from "../utils/validate-datetime/validate-datetime.util";

export type FieldName =
  | "name"
  | "description"
  | "datetime"
  | "priority"
  | "category";

export type Values = Omit<Record<FieldName, string>, "priority"> & {
  priority: number;
};

export function useAddTaskForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    description: "",
    datetime: "",
    priority: 1,
    category: "",
  });

  const [errors, setErrors] = useState<Record<FieldName, string>>({
    name: "",
    description: "",
    datetime: "",
    priority: "",
    category: "",
  });

  const {
    data: submitData,
    error: submitError,
    isLoading,
    handleRequest,
  } = useRequest<ValidationResponse>();

  const router = useRouter();

  useEffect(() => {
    if (submitData?.success) {
      router.push("/");
    }
  }, [submitData, router]);

  const handleErrors = (values: Values, fieldName: FieldName) => {
    switch (fieldName) {
      case "name": {
        setErrors(prevErrors => ({
          ...prevErrors,
          name: validateNonEmptyString(values.name, "Name").error ?? "",
        }));
        break;
      }
      case "datetime": {
        setErrors(prevErrors => ({
          ...prevErrors,
          datetime: validateDatetime(values.datetime).error ?? "",
        }));
        break;
      }
      case "priority": {
        setErrors(prevErrors => ({
          ...prevErrors,
          priority: validatePriority(values.priority).error ?? "",
        }));
        break;
      }
      case "category": {
        setErrors(prevErrors => ({
          ...prevErrors,
          category:
            validateNonEmptyString(values.category, "Category").error ?? "",
        }));
        break;
      }
    }
  };

  const handleChange = (fieldName: FieldName) => {
    if (fieldName === "priority") {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = {
          ...values,
          [fieldName]: Number(event.target.value),
        };

        setValues(newValues);

        handleErrors(newValues, fieldName);
      };
    }

    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values, [fieldName]: event.target.value };

      setValues(newValues);

      handleErrors(newValues, fieldName);
    };
  };

  const handleBlur = (fieldName: FieldName) => {
    return () => {
      handleErrors(values, fieldName);
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateNonEmptyString(values.name, "Name").error ?? "";
    const datetimeError = validateDatetime(values.datetime).error ?? "";
    const priorityError = validatePriority(values.priority).error ?? "";
    const categoryError =
      validateNonEmptyString(values.category, "Category").error ?? "";

    setErrors({
      ...errors,
      name: nameError,
      datetime: datetimeError,
      priority: priorityError,
      category: categoryError,
    });

    if (nameError || datetimeError || priorityError || categoryError) {
      return;
    }

    const handleFormError = (err: unknown) => {
      if (err instanceof Error) {
        return err.message;
      }

      return "Something went wrong";
    };

    handleRequest(
      addTask({
        ...values,
        datetime: datetimeLocalValueToDate(values.datetime),
      }),
      {
        handleError: handleFormError,
      },
    );
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
