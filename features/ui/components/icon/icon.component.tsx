import CalendarIcon from "./calendar.component";
import ClockIcon from "./clock.component";
import { EyeOffIcon } from "./eye-off.component";
import { EyeIcon } from "./eye.component";
import HomeIcon from "./home.component";
import PlusIcon from "./plus.component";
import ProfileIcon from "./profile.component";

export type IconProps = {
  name: "home" | "calendar" | "clock" | "profile" | "plus" | "eye" | "eye-off";
} & React.SVGProps<SVGSVGElement>;

export default function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "home":
      return <HomeIcon {...props} />;
    case "calendar":
      return <CalendarIcon {...props} />;
    case "clock":
      return <ClockIcon {...props} />;
    case "profile":
      return <ProfileIcon {...props} />;
    case "plus":
      return <PlusIcon {...props} />;
    case "eye":
      return <EyeIcon {...props} />;
    case "eye-off":
      return <EyeOffIcon {...props} />;
  }
}