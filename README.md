# Murle Connect

A premium, static-content educational and cultural app for the Murle people —
built with **Expo**, **React Native**, **TypeScript**, and **Expo Router**.

No login, no backend, no database. All content lives in local JSON files
under `content/`, so you can add, edit, or remove articles without touching
any application code.

---

## Getting Started

```bash
npm install
npx expo start
```

Then press `a` to open on an Android emulator/device, or scan the QR code
with the Expo Go app on your Android phone.

To build an installable Android app later, use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas build --platform android
```

---

## ⚠️ Before you publish — please read

**1. The Murle-language proverb text is placeholder content, not verified translations.**
I don't have access to a verified source of authentic Murle-language proverbs,
so the six sample proverbs in `content/proverbs/proverbs.json` use
**invented placeholder phrasing** written to *look* like plausible proverb
structure. They are not real, community-sourced Murle proverbs. Because this
app's entire purpose is cultural preservation and accuracy matters a great
deal here, please replace every `murle` field with real proverbs verified by
Murle community members or elders before publishing. The English meanings
and explanations are also placeholders meant to demonstrate the format —
replace them alongside the proverb text.

**2. All sample articles (History, Culture, Traditions, Stories) are
illustrative placeholder writing**, not verified historical or cultural
fact. They're written in a plausible, respectful tone to show the app
working end-to-end, but they should be reviewed and replaced by people with
direct knowledge of Murle history and culture — ideally elders or community
historians — before this is presented as an authoritative source.

**3. AdMob IDs are placeholders.** In development the app automatically uses
Google's official test ad unit IDs (`react-native-google-mobile-ads`
`TestIds`), so you'll see real test ads and nothing will be charged or
flagged. Before publishing, replace the placeholder IDs in:
   - `app.json` → `plugins` → `react-native-google-mobile-ads` → `androidAppId`
   - `constants/ads.ts` → `REAL_BANNER_ID` / `REAL_INTERSTITIAL_ID`

**4. Images are placeholders from Unsplash** (free-to-use stock photography),
referenced by URL so the app works immediately without bundling large image
files. Since the app requires an internet connection anyway (for ads), this
keeps the initial project lightweight — but you should replace these with
real, appropriately-licensed or community-provided photography before
publishing.

**5. App icon / splash screen** (`assets/images/icon.png`, `adaptive-icon.png`,
`splash.png`) are simple placeholder graphics generated for this scaffold —
swap them for real branded artwork before publishing.

---

## Project Structure

```
app/                        Expo Router screens (file-based routing)
  _layout.tsx                Root layout: theming, splash, internet gate
  (tabs)/                     Bottom tab screens
    index.tsx                 Home
    history.tsx, culture.tsx, stories.tsx, about.tsx
  article/[category]/[id].tsx Generic reader for History/Culture/Stories
  traditions/                 Traditions list + detail reader
  proverbs/                   Proverbs list + detail reader
  search.tsx                  Global search
  privacy-policy.tsx, terms.tsx

components/                  Reusable UI (cards, hero, ad banner, etc.)
content/                     All static content as editable JSON
  history/ culture/ traditions/ proverbs/ stories/
hooks/                       useBookmarks, useNetworkStatus, useAppTheme, useInterstitialAd
utils/                       contentLoader (aggregates + searches JSON), readingTime
constants/                   theme.ts (light/dark), ads.ts (AdMob IDs)
types/content.ts             Shared TypeScript types for all content
```

## Adding Content

Every article is its own JSON file — copy an existing one as a template.

- **History / Culture / Stories** → add a file to `content/<section>/`, then
  import it and add it to the array in `utils/contentLoader.ts`.
- **Traditions** → same pattern, one file per card.
- **Proverbs** → all proverbs live together in `content/proverbs/proverbs.json`
  as a single array — just add a new object.

## Features Implemented

- Home, History, Culture, Traditions, Proverbs, Stories, About sections
- Bottom tab navigation (Home / History / Culture / Stories / About), with
  Traditions and Proverbs reachable from Home's category grid
- Full light & dark mode support
- Bookmarking (AsyncStorage, fully local, no login)
- Share button on every article/tradition/proverb
- Global search across all five content sections
- Mandatory internet-connection gate with a friendly retry screen (so
  AdMob ads can always load)
- AdMob banner ads on every reading page + interstitial every few articles
  (both wired to safe test IDs by default)
- Reading time estimates, related articles, smooth themed UI throughout
- Privacy Policy & Terms and Conditions pages, written to match this app's
  actual data practices
