import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import { getTaskDetails } from "@/features/tasks/actions/get-task-details.action";
import EditTaskForm from "@/features/tasks/components/edit-task-form/edit-task-form.component";
import { dateToDatetimeLocalValue } from "@/features/tasks/utils/date-to-datetime-local-value/date-to-datetime-local-value.util";
import Alert from "@/features/ui/components/alert/alert.component";
import GoBackButton from "@/features/ui/components/go-back-button/go-back-button.component";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const generateMetadata = async () => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.editTask.title,
    description: dictionary.editTask.description,
  };
};

export default async function EditTaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (isNaN(Number(id))) {
    notFound();
  }

  const response = await getTaskDetails(Number(id));
  const dictionary = await getTranslation();

  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <div className={styles.goBackButton}>
            <GoBackButton href={`/task/${id}`} />
          </div>
          {!response.success ? (
            <Alert message={response.error} />
          ) : (
            <>
              <h1 className={styles.title}>{dictionary.editTask.heading}</h1>
              <p className={styles.editingTaskWithName}>
                {dictionary.editTask.editingTaskWithName}
                {": "}
                <strong>{response.data.name}</strong>
              </p>
              <EditTaskForm
                id={Number(id)}
                dictionary={dictionary.editTask.form}
                initialValues={{
                  name: response.data.name,
                  description: response.data.description,
                  datetime: dateToDatetimeLocalValue(response.data.datetime),
                  priority: response.data.priority,
                  category: response.data.category,
                }}
              />
            </>
          )}
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
