import PomodoroTimer from "@/features/focus/components/pomodoro-timer/pomodoro-timer.component";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.focus.title,
    description: dictionary.focus.description,
  };
};

export default async function FocusPage() {
  const dictionary = await getTranslation();

  return <PomodoroTimer dictionary={dictionary.focus.timer} />;
}
