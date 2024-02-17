import { getTranslation } from "@/features/i18n/services/get-translation.service";
import UserData from "@/features/profile/components/user-data/user-data.component";
import SectionedLinkList from "@/features/ui/components/sectioned-link-list/sectioned-link-list.component";
import type { Metadata } from "next";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getTranslation();

  return {
    title: dictionary.profile.title,
    description: dictionary.profile.description,
  };
}

export default async function AppSettingsPage() {
  const dictionary = await getTranslation();

  return (
    <div className={styles.wrapper}>
      <UserData />
      <SectionedLinkList
        sections={[
          {
            title: dictionary.profile.links.settings,
            links: [
              {
                href: "/profile/change-language",
                title: dictionary.profile.links.changeLanguage,
                icon: "language",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
