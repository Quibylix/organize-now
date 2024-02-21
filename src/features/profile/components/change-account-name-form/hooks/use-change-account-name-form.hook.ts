import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { changeAccountName } from "../actions/change-account-name.action";

export function useChangeAccountNameForm(currentName: string) {
  const [name, setName] = useState(currentName);
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    const { error } = validateNonEmptyString(
      event.target.value,
      "Account name",
    );

    setNameError(error ?? "");
  };

  const blurHandler = () => {
    const { error } = validateNonEmptyString(name, "Account name");

    setNameError(error ?? "");
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError) {
      return;
    }

    setIsLoading(true);
    const { success, error } = await changeAccountName(name);
    setIsLoading(false);

    if (!success) {
      setNameError(error ?? "Something went wrong");
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  return {
    name,
    nameError,
    isLoading,
    changeHandler,
    blurHandler,
    submitHandler,
  };
}
