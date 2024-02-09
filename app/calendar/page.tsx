import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import DatePickerWithSelectedDate from "@/features/calendar/date-picker-with-selected-date/date-picker-with-selected-date.component";
import RedirectToUserTimestamp from "@/features/calendar/redirect-to-user-timestamp/redirect-to-user-timestamp.component";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import TaskSearchBar from "@/features/tasks/components/tasks-search-bar/tasks-search-bar.component";
import Tasks from "@/features/tasks/components/tasks/tasks.component";
import { searchParamsToTasksFilters } from "@/features/tasks/components/tasks/utils/search-params-to-tasks-filters/search-params-to-tasks-filters.util";
import styles from "./page.module.css";

export type CalendarPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const dictionary = await getTranslation();

  const searchBarDictionary = {
    searchBarPlaceholder: dictionary.tasks.searchBarPlaceholder,
  };

  const filters = searchParamsToTasksFilters(searchParams);

  if (!filters.timestamp) {
    return <RedirectToUserTimestamp />;
  }

  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <div className={styles.datePicker}>
            <DatePickerWithSelectedDate
              timestamp={filters.timestamp}
              dictionary={dictionary.calendar}
            />
          </div>
          <TaskSearchBar dictionary={searchBarDictionary} />
          <Tasks filters={filters} />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
