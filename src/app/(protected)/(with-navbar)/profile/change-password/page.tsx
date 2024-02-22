import { getTranslation } from "@/features/i18n/services/get-translation.service";
import ChangePasswordForm from "@/features/profile/components/change-password-form/change-password-form.component";

export default async function ChangePasswordPage() {
  const dictionary = await getTranslation();

  return <ChangePasswordForm dictionary={dictionary.changePassword} />;
}
