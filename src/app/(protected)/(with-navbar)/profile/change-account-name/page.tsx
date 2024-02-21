import { getTranslation } from "@/features/i18n/services/get-translation.service";
import ChangeAccountNameForm from "@/features/profile/components/change-account-name-form/change-account-name-form.component";
import { getUserDetails } from "@/features/profile/components/user-data/services/get-user-details.service";
import Alert from "@/features/ui/components/alert/alert.component";

export default async function ChangeAccountNamePage() {
  const dictionary = await getTranslation();
  const response = await getUserDetails();

  if (!response.success) {
    return <Alert message={response.error} />;
  }

  return (
    <ChangeAccountNameForm
      currentName={response.data.accountName}
      dictionary={dictionary.changeAccountName}
    />
  );
}
