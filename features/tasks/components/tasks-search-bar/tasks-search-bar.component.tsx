"use client";

import SearchInput from "@/features/ui/components/input/search-input.component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TASKS_SEARCH_BAR_DELAY } from "./constants/search-delay.constant";
import styles from "./tasks-search-bar.module.css";

type TaskSearchBarProps = {
  dictionary: {
    searchBarPlaceholder: string;
  };
};

export default function TaskSearchBar({ dictionary }: TaskSearchBarProps) {
  const [query, setQuery] = useState("");
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    setQuery(value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      trimmedValue
        ? params.set("search", trimmedValue)
        : params.delete("search");

      router.push(`${pathname}?${params.toString()}`);
    }, TASKS_SEARCH_BAR_DELAY);
  };

  return (
    <form className={styles.tasksSearchBar} onSubmit={e => e.preventDefault()}>
      <SearchInput
        name="search"
        placeholder={dictionary.searchBarPlaceholder}
        value={query}
        onChange={changeHandler}
      />
    </form>
  );
}
