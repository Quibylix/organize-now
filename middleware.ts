import langParser from "accept-language-parser";
import { NextRequest, NextResponse } from "next/server";

const defaultLanguage = "en";
const languages = ["en", "es"];

const findBestMatchingLanguage = (acceptLangHeader: string) => {
  const parsedLangs = langParser.parse(acceptLangHeader);

  for (const parserLang of parsedLangs) {
    const matchedLanguage = languages.find(lang => parserLang.code === lang);

    if (matchedLanguage) {
      return matchedLanguage;
    }
  }

  return defaultLanguage;
};

const isValidLanguage = (lang: string) => languages.some(l => l === lang);

export function middleware(req: NextRequest) {
  const langCookie = req.cookies.get("lang")?.value;

  if (langCookie && isValidLanguage(langCookie)) {
    return NextResponse.next();
  }

  const matchedLanguage = findBestMatchingLanguage(
    req.headers.get("Accept-Language") ?? "",
  );

  const response = NextResponse.next();
  response.cookies.set("lang", matchedLanguage, {
    maxAge: 60 * 60 * 24 * 400, // TODO: store the user language preference in the database and set it when the user logs in
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
