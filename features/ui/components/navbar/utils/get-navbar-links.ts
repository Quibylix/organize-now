type NavbarDictionary = {
  index: string;
  calendar: string;
  newTask: string;
  focus: string;
  profile: string;
};

export function getNavbarLinks(dictionary: NavbarDictionary) {
  return [
    {
      label: dictionary.index,
      path: "/",
      icon: "home",
    },
    {
      label: dictionary.calendar,
      path: "/calendar",
      icon: "calendar",
    },
    {
      label: dictionary.newTask,
      path: "/new-task",
      icon: "plus",
    },
    {
      label: dictionary.focus,
      path: "/focus",
      icon: "clock",
    },
    {
      label: dictionary.profile,
      path: "/profile",
      icon: "profile",
    },
  ] as const;
}
