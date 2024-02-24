"use client";

import type { ValidationResponse } from "@/types/validation-response.type";
import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import Alert from "../alert/alert.component";
import Button from "../button/button.component";
import Icon from "../icon/icon.component";
import styles from "./drop-zone.module.css";
import { useDropZone } from "./hooks/use-drop-zone.hook";

export type DropZoneProps = {
  accept?: string;
  checkFile?: (file: File) => ValidationResponse;
  onFileChange: (file: File) => void;
  dictionary: {
    dragAndDrop: string;
    selectFile: string;
  };
};

export default function DropZone({
  accept,
  checkFile,
  onFileChange,
  dictionary,
}: DropZoneProps) {
  const {
    error,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleChange,
    handleClick,
    isDragging,
    inputRef,
  } = useDropZone(onFileChange, checkFile);

  const dropZoneClassName = joinClassNames(styles.dropZone, {
    [styles.isDragging]: isDragging,
  });

  return (
    <div
      role="region"
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={dropZoneClassName}
    >
      {error && <Alert message={error} />}
      <p className={styles.text}>
        <span className={styles.icon}>
          <Icon name="image" />
        </span>
        {dictionary.dragAndDrop}
      </p>
      <input
        data-testid="file-input"
        className={styles.input}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={false}
        onChange={handleChange}
      />
      <Button size="sm" type="button" width="content">
        {dictionary.selectFile}
      </Button>
    </div>
  );
}
