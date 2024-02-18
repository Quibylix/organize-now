"use client";

import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";

export default function RedirectToUserTimestamp() {
  const router = useRouter();

  useEffect(() => {
    const date = new Date();

    router.push(
      `/calendar?min_ts=${date.setHours(0, 0, 0, 0)}&max_ts=${date.setHours(
        23,
        59,
        59,
        999,
      )}`,
    );
  }, [router]);

  return null;
}
