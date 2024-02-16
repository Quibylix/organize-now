import { getTranslation } from "@/features/i18n/services/get-translation.service";
import ProfileLinks from "@/features/profile/components/profile-links/profile-links.component";
import UserData from "@/features/profile/components/user-data/user-data.component";
import type { Metadata } from "next";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getTranslation();

  return {
    title: dictionary.profile.title,
    description: dictionary.profile.description,
  };
}

export default async function ProfilePage() {
  return (
    <div className={styles.wrapper}>
      <UserData />
      <ProfileLinks />
    </div>
  );
}
