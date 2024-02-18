import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Alert from "@/features/ui/components/alert/alert.component";
import Image from "next/image";
import { getUserDetails } from "./services/get-user-details.service";
import styles from "./user-data.module.css";

const PROFILE_IMAGE_PLACEHOLDER = "/images/profile-placeholder.png";

export default async function UserData() {
  const response = await getUserDetails();
  const dictionary = await getTranslation();

  if (!response.success) return <Alert message={response.error} />;

  const {
    data: { profileImageUrl, accountName, tasksLeft, tasksCompleted },
  } = response;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{dictionary.profile.heading}</h1>
      <Image
        className={styles.image}
        src={profileImageUrl ?? PROFILE_IMAGE_PLACEHOLDER}
        width={80}
        height={80}
        alt={dictionary.profile.profileImageAlt}
        priority
      />
      <p className={styles.name}>{accountName}</p>
      <div className={styles.tasksInfo}>
        <p>
          {dictionary.profile.tasksLeft}: {tasksLeft}
        </p>
        <p>
          {dictionary.profile.tasksDone}: {tasksCompleted}
        </p>
      </div>
    </header>
  );
}
