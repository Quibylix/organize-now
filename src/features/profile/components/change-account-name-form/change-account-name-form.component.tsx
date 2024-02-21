"use client";

import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import styles from "./change-account-name.module.css";
import { useChangeAccountNameForm } from "./hooks/use-change-account-name-form.hook";

type ChangeAccountNameFormProps = {
  currentName: string;
  dictionary: {
    submitButton: string;
    accountNameLabel: string;
    accountNamePlaceholder: string;
    loading: string;
  };
};

export default function ChangeAccountNameForm({
  currentName,
  dictionary,
}: ChangeAccountNameFormProps) {
  const {
    name,
    nameError,
    isLoading,
    changeHandler,
    blurHandler,
    submitHandler,
  } = useChangeAccountNameForm(currentName);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label={dictionary.accountNameLabel}
        placeholder={dictionary.accountNamePlaceholder}
        value={name}
        onChange={changeHandler}
        onBlur={blurHandler}
        error={nameError}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? dictionary.loading : dictionary.submitButton}
      </Button>
    </form>
  );
}
