const SITE_LANGS = ['en', 'fr', 'ht', 'es', 'pt'] as const;

// MyMemory sometimes returns multiple translation candidates joined by "/"
// e.g. "Ki jan li ta dwe travay?/Comment ça devrait fonctionner?"
// Strip everything from the "/" onward when it follows sentence-ending punctuation.
function clean(text: string): string {
  return text.replace(/([.!?])\s*\/.+$/, '$1').trim();
}

export async function translateToOtherLanguages(
  text: string,
  sourceLang: string
): Promise<Record<string, string>> {
  if (!text.trim()) return {};

  const targetLangs = SITE_LANGS.filter((l) => l !== sourceLang);
  const results: Record<string, string> = {};

  await Promise.all(
    targetLangs.map(async (lang) => {
      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${lang}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          results[lang] = clean(data.responseData.translatedText);
        }
      } catch {
        // silently fail — caller falls back to base text
      }
    })
  );

  return results;
}
