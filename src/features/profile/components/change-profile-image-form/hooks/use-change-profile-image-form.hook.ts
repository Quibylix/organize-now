import type { ValidationResponse } from "@/types/validation-response.type";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { changeAccountImage } from "../actions/change-account-image.action";

export function useChangeProfileImageForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const router = useRouter();

  const checkFile = (file: File): ValidationResponse => {
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    if (!file.size || file.size > 100 * 1024) {
      return { success: false, error: "File must be less than 100KB" };
    }

    return { success: true };
  };

  const handleFileChange = async (file: File) => {
    setImageFile(file);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile) return;

    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const base64String = btoa(String.fromCharCode(...Array.from(uint8Array)));

    setIsLoading(true);
    const result = await changeAccountImage(base64String);
    setIsLoading(false);

    if (!result.success) {
      return setError(result.error);
    }

    router.push("/profile");
    router.refresh();
  };

  const clearImage = () => {
    setImageFile(null);
  };

  return {
    error,
    imageFile,
    isLoading,
    checkFile,
    clearImage,
    handleFileChange,
    submitHandler,
  };
}
