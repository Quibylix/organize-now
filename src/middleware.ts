import langParser from "accept-language-parser";
import cookie from "cookie";
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

const getUpdatedHeadersWithLanguageCookie = (
  req: NextRequest,
  language: string,
) => {
  const { headers } = req;

  const newHeaders = new Headers(headers);
  const cookieHeader = newHeaders.get("cookie");

  const cookies = cookie.parse(cookieHeader ?? "");
  cookies[LANGUAGE_COOKIE_NAME] = language;

  const newCookieHeader = Object.entries(cookies)
    .map(([key, value]) => cookie.serialize(key, value))
    .join("; ");
  newHeaders.set("cookie", newCookieHeader);

  return newHeaders;
};

export function middleware(req: NextRequest) {
  const langCookie = req.cookies.get(LANGUAGE_COOKIE_NAME)?.value;

  if (langCookie && isValidLanguage(langCookie)) {
    return NextResponse.next();
  }

  const matchedLanguage = findBestMatchingLanguage(
    req.headers.get(ACCEPTED_LANGUAGES_HEADER) ?? "",
  );

  // Next.js cookies set in the middleware are not available in the cookies() function,
  // so we need to set the cookie in the headers as well
  const newHeaders = getUpdatedHeadersWithLanguageCookie(req, matchedLanguage);

  const response = NextResponse.next({ headers: newHeaders });

  response.cookies.set(LANGUAGE_COOKIE_NAME, matchedLanguage, {
    maxAge: 60 * 60 * 24 * 400, // TODO: store the user language preference in the database and set it when the user logs in
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
