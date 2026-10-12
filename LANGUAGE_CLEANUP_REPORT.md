# SIVI Tunes — Stage 1 (Inspection) + Stage 2 (Language Cleanup Proposal)

> NOTHING HAS BEEN DELETED. No song files, catalog entries, or code changed.
> Awaiting user confirmation before Stage 3 (quarantine).

## Stage 1 — How songs & languages are currently stored

- **Catalog:** single `songs` array in `script.js` (2228 lines total), **1138 entries**, all with
  `id / title / artist / album / language / duration / audio / favorite`.
- **Language storage:** explicit curated `language` field per song. Triple-redundant and
  **100% consistent (0 mismatches)** across all 1138 rows:
  - id prefix (`ta-`/`te-`/`en-`/`ml-`) == `language` field == audio path prefix
    (`tamil/`/`telugu/`/`english/`/`malayalam/`).
  - There is **no automatic language-detection logic** in the codebase — language is
    manually curated metadata, which is the reliable signal (not filenames).
- **Counts:** Tamil **839** (`ta-001`…​· gaps like ta-007/ta-191 missing) · Telugu **100**
  (`te-`…) · English **100** (`en-`…) · Malayalam **99** (`ml-`…).
  Hindi / Kannada / Punjabi: **0 songs** — none exist in the library.
- **Audio:** no local MP3s in repo (`assets/music/` holds only `_README.txt`).
  Playback resolves via `MUSIC_BASE_URL` (Cloudflare R2 CDN) + relative `audio` path,
  e.g. `…/music/tamil/ta-001.mp3`. Favorites persist in `localStorage` (`isai_favorites`).
- **UI:** header + search + tabs (All / Tamil / Telugu / English / Malayalam / Favorites)
  in `index.html`; filtering (`filteredSongs`), counts (`updateCounts`), search, favorites,
  and HTML5-audio playback in `script.js`; dark neon theme in `style.css`.

## Stage 2 — Proposed cleanup (needs confirmation)

### A. KEEP — 830 certain-Tamil songs
All `language: "Tamil"` entries except the 9 uncertain ones below.
Files/pathsunchanged (`tamil/*.mp3` via R2 + local backup convention).

### B. REMOVE (quarantine, restorable) — 299 non-Tamil songs
| Language | Count | ID range | Audio prefix | Example titles |
|---|---|---|---|---|
| Telugu | 100 | `te-*` | `telugu/` | Kushi Movie, Mallela Vaanala, Cheppave Prema |
| English | 100 | `en-*` | `english/` | Lose Control, Animals, Maps |
| Malayalam | 99 | `ml-*` | `malayalam/` | Amsham, KALYANI, Aalunnu Neeye |
| Hindi/Kannada/Punjabi/other | 0 | — | — | none present |

Plan on approval: move these 299 catalog entries out of the active `songs` array into
`quarantine/non-tamil-songs.js` (same object shape + `quarantinedAt` + original index),
so one import restores them. Playback paths of Tamil songs untouched; favorites pruned
of quarantined ids only (backed up to `quarantine/favorites-backup.json`).

### C. UNCERTAIN — 9 Tamil-tagged songs needing your decision
Tagged `Tamil` (dubbed-version albums) but titles are Telugu-sounding; filename alone
cannot confirm. Recommend KEEPING by default (metadata says Tamil), remove only if you say so:

- `ta-017` Vachindamma — Vachindamma (Tamil)
- `ta-162` Srivalli — Pushpa - The Rise (Tamil)
- `ta-168` Alaakaa Loovaa (Unplugged) — OM (Tamil)
- `ta-184` Alaakaa Loova (Tamil) — OM (Tamil)
- `ta-261` KISSIK (Tamil) — Pushpa 2 The Rule (Tamil)
- `ta-457` Oo Solriya (Tamil) — Pushpa (Tamil)
- `ta-462` PEELINGS Tamil — Pushpa 2 The Rule (Tamil)
- `ta-507` Saami Saami (Tamil) — Pushpa (Tamil)
- `ta-508` Saami Saami (Tamil) — Pushpa - The Rise (Tamil)

Full machine-readable lists: temp files `nontamil.json` (299) and `sus.json` (flagged
candidates) were used to build this report.

## Outcome (Stages 3–5, completed)

**User confirmations received:** quarantine 299 non-Tamil (yes); 9 dubbed-version songs (keep as Tamil);
Aaya Sher + all three KALYANI (keep as Tamil).

### Stage 3 — Quarantine (nothing permanently deleted)
- `te-007` (Aaya Sher), `ml-002` / `ml-164` / `ml-169` (KALYANI): `language` flipped to
  `"Tamil"` per your request. Ids and `audio` paths **unchanged**, so playback URLs
  (`…/music/telugu/te-007.mp3`, `…/music/malayalam/ml-*.mp3`) keep working.
  Note: catalog metadata still calls these Telugu/Malayalam — they are in the library
  by your explicit override, not by language detection.
- Remaining **295** non-Tamil entries (Telugu 99, English 100, Malayalam 96) moved from
  `script.js` to `quarantine/non-tamil-songs.js` (same object shape, not loaded by the page).
  Restore: copy entries back into `songs`, or ask for a restore script.
- Active library: **843 Tamil songs**, 0 non-Tamil, ids unique (no duplicates removed).
- Favorites: first load after quarantine prunes ids that no longer exist, after backing
  up the original list to localStorage `isai_favorites_backup_preTamil`.

### Stage 4 — Categories + UI
- New editable map: `categories.js` (`window.SiviCategories`: 7 defs + id→categories).
  Counts: Love ❤️ 131 · Sleep 🌙 27 · Kuthu 🔥 53 ·
  Melody 🎹 103 · Album 🎧 9 · Trending 📈 68 · Uncategorized 🗂️ 542.
  (Classical Songs type removed per user request; its 2 songs — ta-144 Thillana Thillana,
  ta-455 Om Shiva Hom — remain in All Tamil Songs as Uncategorized. Library still 843.)
  Songs may sit in several categories; nothing was forced — 540 low-signal songs stay
  Uncategorized (full list: `quarantine/uncategorized-review.json`).
- Honesty notes: only 6 rows carry verified singer/year credits (unchanged `METADATA_SOURCES`);
  everything else shows film/Unknown artist as before. **Trending is a recent-release proxy**
  (Coolie/Jana Nayagan/Retro/Thug Life/Dragon/Idli Kadai/Dude/Bison/Amaran/…) — the catalog
  contains no views/ratings/chart data, so no popularity stats are claimed.
- UI: same dark neon theme/header/logo/layout; tabs replaced with the 8 category tabs +
  Uncategorized (review) + Favorites, each with live counts; search combines with the active
  tab; song rows show small category icons; playback/favorites/player controls untouched.
- Manual moves: edit `categories.js` map, or in console
  `SIVI_moveSong("ta-001", ["love","melody"])` (saved to localStorage, wins over file;
  `SIVI_resetOverrides()` clears).

### Stage 5 — Verification (37/37 automated DOM checks passed)
Library size/purity, id uniqueness, retagged paths + R2 URLs, all 8 category counts,
exact row rendering per tab, in-category search ("kadhal" in Love → 21 rows),
favorite add/remove/persist/render, stale-fav pruning, move/reset overrides, DOM counts.
Responsive: category tabs reuse the existing horizontally-scrolling `.tabs` bar and all
existing media queries — no layout CSS was altered beyond chips/counts.
