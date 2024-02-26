type ProfileDictionary = {
  settings: string;
  appSettings: string;
  account: string;
  changeAccountName: string;
  changePassword: string;
  changeAccountImage: string;
  appName: string;
  aboutUs: string;
  faq: string;
  helpAndFeedback: string;
  helpAndFeedbackSubject: string;
  helpAndFeedbackBody: string;
  supportUs: string;
};

export function getProfileLinks(dictionary: ProfileDictionary) {
  return [
    {
      title: dictionary.settings,
      links: [
        {
          title: dictionary.appSettings,
          icon: "settings",
          href: "/profile/settings",
          blank: false,
        },
      ],
    },
    {
      title: dictionary.account,
      links: [
        {
          title: dictionary.changeAccountName,
          icon: "profile",
          href: "/profile/change-account-name",
          blank: false,
        },
        {
          title: dictionary.changePassword,
          icon: "key",
          href: "/profile/change-password",
          blank: false,
        },
        {
          title: dictionary.changeAccountImage,
          icon: "image",
          href: "/profile/change-account-image",
          blank: false,
        },
      ],
    },
    {
      title: dictionary.appName,
      links: [
        {
          title: dictionary.aboutUs,
          icon: "business",
          href: "/about",
          blank: false,
        },
        {
          title: dictionary.faq,
          icon: "info",
          href: "/faq",
          blank: false,
        },
        {
          title: dictionary.helpAndFeedback,
          icon: "feedback",
          href: `mailto:barraza.fredimanuel+organize-now@gmail.com?subject=${encodeURIComponent(
            dictionary.helpAndFeedbackSubject,
          )}&body=${encodeURIComponent(dictionary.helpAndFeedbackBody)}`,
          blank: true,
        },
        {
          title: dictionary.supportUs,
          icon: "like",
          href: "https://www.buymeacoffee.com/quibylix",
          blank: true,
        },
      ],
    },
  ] as const;
}
