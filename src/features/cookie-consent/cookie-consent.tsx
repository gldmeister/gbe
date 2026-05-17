// src/features/cookie-consent/cookie-consent.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_STORAGE_KEY = "gameboxedu-cookie-consent";

type CookieConsentChoice = "necessary" | "all";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(
      COOKIE_CONSENT_STORAGE_KEY
    );

    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  function saveConsent(choice: CookieConsentChoice) {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6 md:pb-6"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-slate-900">
              Cookie-Einstellungen
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              Dieser Webshop verwendet notwendige Cookies für grundlegende
              Funktionen. Analyse-Cookies werden in dieser Übung nur simuliert.
              Weitere Informationen finden Sie in unserer{" "}
              <Link
                href="/privacy"
                className="font-semibold text-blue-700 underline hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => saveConsent("necessary")}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Nur notwendige Cookies
            </button>

            <button
              type="button"
              onClick={() => saveConsent("all")}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}