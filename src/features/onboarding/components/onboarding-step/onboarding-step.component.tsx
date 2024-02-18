import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Button from "@/features/ui/components/button/button.component";
import styles from "./onboarding-step.module.css";

export type OnboardingStepProps = { step: 1 | 2 | 3 };

export default async function OnboardingStep({ step }: OnboardingStepProps) {
  const isFirstStep = step === 1;
  const isLastStep = step === 3;

  const dictionary = await getTranslation();

  const stepInfo = dictionary.onboarding[`step${step}`];

  return (
    <div className={styles.onboardingStep}>
      <Button.AsLink
        className={styles.skipButton}
        href="/"
        size="sm"
        variant="text"
      >
        {dictionary.onboarding.skip}
      </Button.AsLink>
      <img
        className={styles.image}
        src={`/images/onboarding/step-${step}.webp`}
        alt=""
      />
      <h2 className={styles.title}>{stepInfo.title}</h2>
      <p className={styles.description}>{stepInfo.description}</p>
      <div className={styles.buttons}>
        {!isFirstStep && (
          <Button.AsLink variant="outline" href={`/onboarding/${step - 1}`}>
            {dictionary.onboarding.back}
          </Button.AsLink>
        )}
        <Button.AsLink
          className={styles.nextButton}
          href={isLastStep ? "/" : `/onboarding/${step + 1}`}
        >
          {isLastStep
            ? dictionary.onboarding.getStarted
            : dictionary.onboarding.next}
        </Button.AsLink>
      </div>
    </div>
  );
}
