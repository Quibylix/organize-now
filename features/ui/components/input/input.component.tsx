"use client";

import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import { useId, useRef, useState } from "react";
import styles from "./input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  error?: string;
};

export default function Input({
  label,
  startContent,
  endContent,
  error,
  id: customId,
  className: customClassName,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const id = useId();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      inputRef.current?.focus();
    }
  };

  const inputId = customId || id;
  const className = joinClassNames(styles.input, customClassName);
  const inputContainerClassName = joinClassNames(styles.inputContainer, {
    [styles.inputContainerFocused]: isFocused,
  });

  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div onClick={handleContainerClick} className={inputContainerClassName}>
        {startContent}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={inputId}
          className={className}
          ref={inputRef}
          {...props}
        />
        {endContent}
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
