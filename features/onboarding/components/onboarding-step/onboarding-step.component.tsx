import Button from "@/features/ui/components/button/button.component";
import { STEPS_INFO } from "./constants/steps-info.constant";
import styles from "./onboarding-step.module.css";

export type OnboardingStepProps = { step: 1 | 2 | 3 };

export default function OnboardingStep({ step }: OnboardingStepProps) {
  const isFirstStep = step === 1;
  const isLastStep = step === 3;

  const stepInfo = STEPS_INFO[step];

  return (
    <div className={styles.onboardingStep}>
      <Button.AsLink className={styles.skipButton} href="/">
        Skip
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
          <Button.AsLink href={`/onboarding/${step - 1}`}>Back</Button.AsLink>
        )}
        <Button.AsLink
          className={styles.nextButton}
          href={isLastStep ? "/" : `/onboarding/${step + 1}`}
        >
          {isLastStep ? "Get Started" : "Next"}
        </Button.AsLink>
      </div>
    </div>
  );
}
