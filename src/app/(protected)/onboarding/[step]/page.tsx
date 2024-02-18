import OnboardingStep from "@/features/onboarding/components/onboarding-step/onboarding-step.component";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const generateStaticParams = async () => {
  return [{ step: "1" }, { step: "2" }, { step: "3" }];
};

// In production mode, dynamicParams set to false does not show 404 pages for unknown paths
// See https://github.com/vercel/next.js/issues/52765
// export const dynamicParams = false;

export default function OnboardingPage({
  params: { step },
}: {
  params: { step: "1" | "2" | "3" };
}) {
  // While dynamicParams bug is not fixed, we need to check manually for the step
  if (!["1", "2", "3"].includes(step)) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <OnboardingStep step={+step as 1 | 2 | 3} />
    </main>
  );
}
