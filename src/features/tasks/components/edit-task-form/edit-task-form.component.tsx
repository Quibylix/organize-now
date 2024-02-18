"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import { useEffect, useState } from "react";
import PriorityInputButton from "../add-task-form/priority-input-button.component";
import styles from "./edit-task-form.module.css";
import { useEditTaskForm } from "./hooks/use-edit-task-form.hook";

type EditTaskProps = {
  id: number;
  dictionary: {
    nameLabel: string;
    namePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    datetimeLabel: string;
    datetimePlaceholder: string;
    priorityLabel: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    submitButton: string;
    loading: string;
  };
  initialValues: {
    name: string;
    description: string;
    datetime: string;
    priority: number;
    category: string;
  };
};

export default function EditTask({
  id,
  dictionary,
  initialValues,
}: EditTaskProps) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useEditTaskForm(id, initialValues);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { name, description, datetime, priority, category } = values;
  const {
    name: nameError,
    description: descriptionError,
    datetime: datetimeError,
    priority: priorityError,
    category: categoryError,
  } = errors;

  // Avoid the user can submit the form before the client is ready to handle the form submission
  if (!isClient) {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {submitError && <Alert message={submitError} />}
      <Input
        error={nameError}
        value={name}
        onChange={handleChange("name")}
        onBlur={handleBlur("name")}
        type="text"
        label={dictionary.nameLabel}
        placeholder={dictionary.namePlaceholder}
        name="name"
      />
      <Input
        error={descriptionError}
        value={description}
        onChange={handleChange("description")}
        onBlur={handleBlur("description")}
        type="text"
        label={dictionary.descriptionLabel}
        placeholder={dictionary.descriptionPlaceholder}
        name="description"
      />
      <Input
        error={datetimeError}
        value={datetime}
        onChange={handleChange("datetime")}
        onBlur={handleBlur("datetime")}
        type="datetime-local"
        label={dictionary.datetimeLabel}
        placeholder={dictionary.datetimePlaceholder}
        name="datetime"
      />
      <fieldset className={styles.prioritySet}>
        <legend className={styles.priorityLegend}>
          {dictionary.priorityLabel}
        </legend>
        {Array.from({ length: 10 }).map((_, index) => (
          <PriorityInputButton
            onChange={handleChange("priority")}
            key={index}
            name="priority"
            value={(index + 1).toString()}
            checked={priority === index + 1}
          />
        ))}
        {priorityError && <Alert message={priorityError} />}
      </fieldset>
      <Input
        error={categoryError}
        value={category}
        onChange={handleChange("category")}
        onBlur={handleBlur("category")}
        type="text"
        label={dictionary.categoryLabel}
        placeholder={dictionary.categoryPlaceholder}
        name="category"
      />
      <Button
        className={styles.submitButton}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? dictionary.loading : dictionary.submitButton}
      </Button>
    </form>
  );
}
