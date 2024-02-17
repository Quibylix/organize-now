import { getTranslation } from "@/features/i18n/services/get-translation.service";
import UserData from "@/features/profile/components/user-data/user-data.component";
import type { Metadata } from "next";
import styles from "./layout.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getTranslation();

  return {
    title: dictionary.profile.title,
    description: dictionary.profile.description,
  };
}

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <UserData />
      {children}
    </div>
  );
}
