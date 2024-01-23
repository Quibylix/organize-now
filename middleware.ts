import langParser from "accept-language-parser";
import { NextRequest, NextResponse } from "next/server";
import {
  ACCEPTED_LANGUAGES_HEADER,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_COOKIE_NAME,
} from "./features/i18n/constants/language.constant";

const findBestMatchingLanguage = (acceptLangHeader: string) => {
  const parsedLangs = langParser.parse(acceptLangHeader);

  for (const parserLang of parsedLangs) {
    const matchedLanguage = LANGUAGES.find(lang => parserLang.code === lang);

    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
};

const isValidLanguage = (lang: string) => LANGUAGES.some(l => l === lang);

export function middleware(req: NextRequest) {
  const langCookie = req.cookies.get(LANGUAGE_COOKIE_NAME)?.value;

  if (langCookie && isValidLanguage(langCookie)) {
    return NextResponse.next();
  }

  const matchedLanguage = findBestMatchingLanguage(
    req.headers.get(ACCEPTED_LANGUAGES_HEADER) ?? "",
  );

  const response = NextResponse.next();
  response.cookies.set(LANGUAGE_COOKIE_NAME, matchedLanguage, {
    maxAge: 60 * 60 * 24 * 400, // TODO: store the user language preference in the database and set it when the user logs in
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
