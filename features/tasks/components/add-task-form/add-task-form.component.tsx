"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import styles from "./add-task-form.module.css";
import { useAddTaskForm } from "./hooks/use-add-task-form.hook";
import PriorityInputButton from "./priority-input-button.component";

type AddTaskFormProps = {
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
};

export default function AddTaskForm({ dictionary }: AddTaskFormProps) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useAddTaskForm();

  const { name, description, datetime, priority, category } = values;
  const {
    name: nameError,
    description: descriptionError,
    datetime: datetimeError,
    priority: priorityError,
    category: categoryError,
  } = errors;

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
        autoFocus
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
