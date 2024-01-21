import Icon from "../icon/icon.component";
import Input, { InputProps } from "./input.component";
import styles from "./input.module.css";

export type SearchInputProps = Omit<InputProps, "type">;

export default function SearchInput({
  startContent,
  ...props
}: SearchInputProps) {
  return (
    <Input
      type="search"
      startContent={
        <>
          {startContent}
          <Icon className={styles.icon} name="search" />
        </>
      }
      {...props}
    />
  );
}
