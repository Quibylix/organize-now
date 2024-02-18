import { TasksFilters } from "../../types/tasks-filters.type";

export function searchParamsToTasksFilters(searchParams: {
  [key: string]: string | string[] | undefined;
}): TasksFilters {
  const filters: TasksFilters = {};

  if (searchParams.category) {
    const categoryString = Array.isArray(searchParams.category)
      ? searchParams.category[0]
      : searchParams.category;

    const isCategoryValid = categoryString.trim().length > 0;

    if (isCategoryValid) {
      filters.category = categoryString;
    }
  }

  if (searchParams.priority) {
    const priorityString = Array.isArray(searchParams.priority)
      ? searchParams.priority[0]
      : searchParams.priority;

    const isPriorityNumber = !isNaN(Number(priorityString));

    if (isPriorityNumber) {
      filters.priority = Number(priorityString);
    }
  }

  if (searchParams.status) {
    const statusString = Array.isArray(searchParams.status)
      ? searchParams.status[0]
      : searchParams.status;

    const isStatusValid = ["completed", "uncompleted"].includes(statusString);

    if (isStatusValid) {
      filters.status = statusString as "completed" | "uncompleted";
    }
  }

  if (searchParams.min_ts && searchParams.max_ts) {
    const minTimestamp = Number(
      Array.isArray(searchParams.min_ts)
        ? searchParams.min_ts[0]
        : searchParams.min_ts,
    );

    const maxTimestamp = Number(
      Array.isArray(searchParams.max_ts)
        ? searchParams.max_ts[0]
        : searchParams.max_ts,
    );

    const isMinTimestampValid = !isNaN(minTimestamp);
    const isMaxTimestampValid = !isNaN(maxTimestamp);

    if (
      isMinTimestampValid &&
      isMaxTimestampValid &&
      minTimestamp <= maxTimestamp
    ) {
      filters.timestamp = {
        min: minTimestamp,
        max: maxTimestamp,
      };
    }
  }

  if (searchParams.search) {
    const searchParamsString = Array.isArray(searchParams.search)
      ? searchParams.search[0]
      : searchParams.search;

    const isSearchValid = searchParamsString.trim().length > 0;

    if (isSearchValid) {
      filters.search = searchParamsString;
    }
  }

  return filters;
}
