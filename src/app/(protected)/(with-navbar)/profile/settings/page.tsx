import { getTranslation } from "@/features/i18n/services/get-translation.service";
import SectionedLinkList from "@/features/ui/components/sectioned-link-list/sectioned-link-list.component";

export default async function AppSettingsPage() {
  const dictionary = await getTranslation();

  return (
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
  );
}
