import ArrowUpIcon from "./arrow-up.component";
import BusinessIcon from "./business.component";
import CalendarIcon from "./calendar.component";
import ClockIcon from "./clock.component";
import { EyeOffIcon } from "./eye-off.component";
import { EyeIcon } from "./eye.component";
import FeedbackIcon from "./feedback.component";
import FlagIcon from "./flag.component";
import GoBackIcon from "./go-back.component";
import HomeIcon from "./home.component";
import ImageIcon from "./image.component";
import InfoIcon from "./info.component";
import KeyIcon from "./key.component";
import LikeIcon from "./like.component";
import LogoutIcon from "./logout.component";
import PlusIcon from "./plus.component";
import ProfileIcon from "./profile.component";
import { SearchIcon } from "./search.component";
import SettingsIcon from "./settings.component";
import TagIcon from "./tag.component";
import TrashIcon from "./trash.component";

export type IconProps = {
  name:
    | "home"
    | "calendar"
    | "clock"
    | "profile"
    | "plus"
    | "eye"
    | "eye-off"
    | "info"
    | "search"
    | "flag"
    | "tag"
    | "trash"
    | "go-back"
    | "business"
    | "feedback"
    | "image"
    | "key"
    | "like"
    | "settings"
    | "logout"
    | "arrow-up";
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
    case "info":
      return <InfoIcon {...props} />;
    case "search":
      return <SearchIcon {...props} />;
    case "flag":
      return <FlagIcon {...props} />;
    case "tag":
      return <TagIcon {...props} />;
    case "trash":
      return <TrashIcon {...props} />;
    case "go-back":
      return <GoBackIcon {...props} />;
    case "business":
      return <BusinessIcon {...props} />;
    case "feedback":
      return <FeedbackIcon {...props} />;
    case "image":
      return <ImageIcon {...props} />;
    case "key":
      return <KeyIcon {...props} />;
    case "like":
      return <LikeIcon {...props} />;
    case "settings":
      return <SettingsIcon {...props} />;
    case "logout":
      return <LogoutIcon {...props} />;
    case "arrow-up":
      return <ArrowUpIcon {...props} />;
  }
}
