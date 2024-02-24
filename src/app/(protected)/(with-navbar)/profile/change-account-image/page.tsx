import { getTranslation } from "@/features/i18n/services/get-translation.service";
import ChangeProfileImageForm from "@/features/profile/components/change-profile-image-form/change-profile-image-form.component";

export default async function ChangeAccountImagePage() {
  const dictionary = await getTranslation();

  return (
    <div>
      <ChangeProfileImageForm dictionary={dictionary.changeProfileImage} />
    </div>
  );
}
