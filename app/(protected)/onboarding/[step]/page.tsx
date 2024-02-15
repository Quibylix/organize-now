import OnboardingStep from "@/features/onboarding/components/onboarding-step/onboarding-step.component";
import styles from "./page.module.css";

export const generateStaticParams = async () => {
  return [{ step: "1" }, { step: "2" }, { step: "3" }];
};

export const dynamicParams = false;

export default function OnboardingPage({
  params: { step },
}: {
  params: { step: "1" | "2" | "3" };
}) {
  return (
    <main className={styles.page}>
      <OnboardingStep step={+step as 1 | 2 | 3} />
    </main>
  );
}
