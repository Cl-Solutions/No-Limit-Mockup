# Fahrschule NoLimit — Übergabe-Notizen

Diese Datei listet alles auf, was vor dem Live-Gang noch mit echten Inhalten
ersetzt werden muss. Alle Stellen sind im Code zusätzlich mit Kommentaren markiert.

## 1. Hero-Hintergrundvideo — ERLEDIGT ✅
- Liegt bereit als `/public/hero.webm` (3,7 MB, VP9) + `/public/hero.mp4`
  (5,6 MB, H.264) + Standbild `/public/hero-poster.jpg`.
- Aus dem 47-MB-Quellvideo `0602.mov` erzeugt: auf 1080p skaliert, ohne Ton,
  mit `faststart` → startet sofort statt erst komplett zu laden.
- Neues Video tauschen: gleiche Schritte mit ffmpeg, Dateien in `/public/` ersetzen.
  Das Roh-`.mov` ist per `.gitignore` ausgeschlossen.
- Datei: `src/components/Hero.tsx`

## 2. Flotte & Standort (Bilder)
- Echte Fotos in `src/components/Fleet.tsx` einsetzen: dem `<MediaTile>` ein
  `src` geben, z. B. `src="/flotte/standort.jpg"`, `"/flotte/amg.jpg"`,
  `"/flotte/motorrad.jpg"`. Dateien nach `/public/flotte/` legen.

## 3. Bewertungen
- `src/components/Reviews.tsx`, oben im Datei-Kopf:
  - `RATING` (z. B. "4,9"), `REVIEW_COUNT` (z. B. "120+")
  - `GOOGLE_REVIEWS_URL` → echter Link zum Google-Profil
  - `reviews[]` → echte Bewertungstexte/Namen (aktuell realistische Platzhalter)
- Die Hero-Bewertung („4,9 Top-Bewertungen") in `Hero.tsx` ggf. angleichen.

## 4. Team
- `src/components/Team.tsx`, Array `members[]`: echte Namen/Rollen eintragen und
  `photo` auf z. B. `"/team/person.jpg"` setzen (Dateien nach `/public/team/`).
- Foto von Etem Bardakcioglu im Inhaber-Block ebenfalls einsetzbar.

## 5. Vorschaubild (Social/Google)
- `index.html`: `/og-image.jpg` (1200×630) unter `/public/` ablegen.

## 6. Vehicle-Showcase-Bild
- `src/components/VehicleShowcase.tsx` nutzt aktuell ein KI-Bild
  (`/Gemini_Generated_Image_...png`). Bei Bedarf durch echtes Bild ersetzen und
  die Hotspot-Koordinaten (`x`/`y` in Prozent) anpassen.

## 7. Rechtstexte
- Impressum & Datenschutz in `src/components/Footer.tsx` sind Platzhalter —
  bitte juristisch prüfen lassen.

---
Dev starten: `npm run dev` · Build: `npm run build`
