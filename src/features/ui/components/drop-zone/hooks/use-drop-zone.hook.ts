import type { ValidationResponse } from "@/types/validation-response.type";
import { useRef, useState } from "react";

export function useDropZone(
  onFileChange: (file: File) => void,
  checkFile?: (file: File) => ValidationResponse,
) {
  const [error, setError] = useState<string>("");
  const [dragCounter, setDragCounter] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    setDragCounter(counter => counter + 1);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    setDragCounter(counter => counter - 1);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    setDragCounter(0);

    if (event.dataTransfer.files.length === 0) return;

    const file = event.dataTransfer.files[0];

    const checkResult = checkFile?.(file);

    if (checkResult && !checkResult.success) {
      setError(checkResult.error ?? "");
      return;
    }

    onFileChange(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];

    const checkResult = checkFile?.(file);

    if (checkResult && !checkResult.success) {
      setError(checkResult.error ?? "");
      return;
    }

    onFileChange(file);
  };

  const isDragging = dragCounter > 0;

  return {
    error,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleChange,
    handleClick,
    isDragging,
    inputRef,
  };
}
