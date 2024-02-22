import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { changePassword } from "../actions/change-password.action";

export function useChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [submitError, setSubmitError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const changeHandler =
    (fieldName: "currentPassword" | "newPassword") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { error } = validatePassword(event.target.value);

      if (fieldName === "currentPassword") {
        setCurrentPassword(event.target.value);
        setCurrentPasswordError(error ?? "");
        return;
      }

      setNewPassword(event.target.value);
      setNewPasswordError(error ?? "");
    };

  const blurHandler = (fieldName: "currentPassword" | "newPassword") => () => {
    if (fieldName === "currentPassword") {
      const { error } = validatePassword(currentPassword);
      setCurrentPasswordError(error ?? "");
      return;
    }

    const { error } = validatePassword(newPassword);
    setNewPasswordError(error ?? "");
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error: currentPasswordError } = validatePassword(currentPassword);
    const { error: newPasswordError } = validatePassword(newPassword);

    setCurrentPasswordError(currentPasswordError ?? "");
    setNewPasswordError(newPasswordError ?? "");

    if (currentPasswordError || newPasswordError) {
      return;
    }

    setIsLoading(true);
    const { success, error } = await changePassword(
      currentPassword,
      newPassword,
    );
    setIsLoading(false);

    if (!success) {
      setSubmitError(error ?? "Something went wrong");
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  return {
    currentPassword,
    newPassword,
    currentPasswordError,
    newPasswordError,
    submitError,
    isLoading,
    changeHandler,
    blurHandler,
    submitHandler,
  };
}
