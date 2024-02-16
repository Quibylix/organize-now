export const PROFILE_LINKS_SECTIONS = [
  {
    title: "Settings",
    links: [
      {
        title: "App settings",
        icon: "settings",
        href: "/profile/settings",
        blank: false,
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        title: "Change account name",
        icon: "profile",
        href: "/profile/change-account-name",
        blank: false,
      },
      {
        title: "Change password",
        icon: "key",
        href: "/profile/change-password",
        blank: false,
      },
      {
        title: "Change account image",
        icon: "image",
        href: "/profile/change-account-image",
        blank: false,
      },
    ],
  },
  {
    title: "Organize Now",
    links: [
      {
        title: "About Us",
        icon: "business",
        href: "/about",
        blank: false,
      },
      {
        title: "FAQ",
        icon: "info",
        href: "/faq",
        blank: false,
      },
      {
        title: "Help And Feedback",
        icon: "feedback",
        href: "/help",
        blank: false,
      },
      {
        title: "Support Us",
        icon: "like",
        href: "https://www.buymeacoffee.com/quibylix",
        blank: true,
      },
    ],
  },
] as const;
