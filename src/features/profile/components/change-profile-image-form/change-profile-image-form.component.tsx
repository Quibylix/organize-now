"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import DropZone from "@/features/ui/components/drop-zone/drop-zone.component";
import Image from "next/image";
import styles from "./change-profile-image-form.module.css";
import { useChangeProfileImageForm } from "./hooks/use-change-profile-image-form.hook";

export type ChangeProfileImageFormProps = {
  dictionary: {
    preview: {
      title: string;
      imageAlt: string;
      changeImage: string;
      saveImage: string;
      loading: string;
    };
    dropzone: {
      dragAndDrop: string;
      selectFile: string;
    };
  };
};

export default function ChangeProfileImageForm({
  dictionary,
}: ChangeProfileImageFormProps) {
  const {
    error,
    imageFile,
    isLoading,
    handleFileChange,
    submitHandler,
    checkFile,
    clearImage,
  } = useChangeProfileImageForm();

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      {error && <Alert message={error} />}
      {imageFile ? (
        <section className={styles.preview}>
          <h2 className={styles.previewTitle}>{dictionary.preview.title}</h2>
          <Image
            className={styles.previewImage}
            width={192}
            height={192}
            src={URL.createObjectURL(imageFile)}
            alt={dictionary.preview.imageAlt}
          />
          <div className={styles.previewButtons}>
            <Button
              type="button"
              color="secondary"
              variant="text"
              onClick={clearImage}
            >
              {dictionary.preview.changeImage}
            </Button>
            <Button type="submit">
              {isLoading
                ? dictionary.preview.loading
                : dictionary.preview.saveImage}
            </Button>
          </div>
        </section>
      ) : (
        <DropZone
          dictionary={dictionary.dropzone}
          accept="image/*"
          onFileChange={handleFileChange}
          checkFile={checkFile}
        />
      )}
    </form>
  );
}
