---
name: project-translation
description: Translation feature is planned but deferred — do it last after all text is finalized
metadata:
  type: project
---

Translation feature is deferred until all app text is finalized.

**Why:** Text content is still being written/revised. Translating early would mean re-translating every time copy changes.

**How to apply:** Don't implement translation yet. When the user says they're done with text/copy, remind them about this and pick it back up.

**Planned approach (already agreed on):**
- Google Cloud Translation REST API (user will set up their own account/key)
- `TranslationContext.js` for language state + `t("key")` function
- `translations/en.js` as source-of-truth strings file
- `translations/translationService.js` with API key placeholder
- Per-language caching to avoid re-fetching
- Language dropdown in settings panel (using existing `react-native-dropdown-picker`)
- Languages: English, Spanish, French, Portuguese, Hindi, Chinese (Simplified), Arabic, Tagalog
- Skip `Info.js` and `TermsAndCo.js` (too long, decide separately)
- Don't translate dynamic values (numbers, math operators, user answers)
