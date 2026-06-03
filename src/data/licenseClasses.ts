/**
 * Führerscheinklassen — Detail-Daten.
 *
 * Quellen: § 6 FeV (Fahrerlaubnis-Verordnung), ADAC-Übersicht, TÜV.
 * Die Pflichtstunden (Grundstoff / klassenspezifischer Unterricht / Sonderfahrten)
 * sind bundesweit gesetzlich festgelegt — sie ändern sich nicht durch die Fahrschule.
 *
 * Struktur:
 * - id/name/title/badge/category: Anzeige-Metadaten
 * - summary: kurzer Pitch für die Karten-Vorschau
 * - mindestalter / voraussetzung / fahrzeuge: harte Fakten
 * - theorie / praxis: Pflichtstunden
 * - besonderheiten: BF17/B197-Hinweise etc.
 */

export type Category = 'Zweirad' | 'Auto' | 'Lkw';

export interface LicenseClass {
  id: string;
  name: string;            // z. B. "B"
  title: string;           // z. B. "PKW"
  category: Category;
  badge: string;           // Alters-/Status-Tag für die Vorschau
  summary: string;         // 1-Satz Pitch

  mindestalter: string;
  voraussetzung?: string;

  fahrzeuge: string[];     // Was darfst du fahren

  theorie: {
    grundstoff: string;          // z. B. "12 Doppelstunden" oder "6 (Erweiterung)"
    klassenspezifisch: string;   // z. B. "2 Doppelstunden"
  };
  praxis: {
    sonderfahrten?: {
      ueberland: number;
      autobahn: number;
      nacht: number;
    };
    pflicht: string;             // Beschreibung Pflicht-Praxis
  };
  besonderheiten?: string[];      // BF17, B197, Direkteinstieg etc.
}

export const licenseClasses: LicenseClass[] = [
  // ─────────── ZWEIRAD ───────────
  {
    id: 'mofa',
    name: 'Mofa',
    title: 'Mofa-Prüfbescheinigung',
    category: 'Zweirad',
    badge: 'Ab 15',
    summary: 'Bis 25 km/h. Nur Theorie, keine praktische Prüfung — der schnellste Weg in die Mobilität.',
    mindestalter: '15 Jahre',
    fahrzeuge: [
      'Einsitzige Krafträder bis 25 km/h',
      'Max. 50 ccm bei Verbrennungsmotor / 500 W bei E-Antrieb',
      'Auch dreirädrige Mofas',
    ],
    theorie: { grundstoff: '6 Doppelstunden (à 90 min)', klassenspezifisch: '— (nur Mofa-spezifisch)' },
    praxis: { pflicht: 'Keine praktische Prüfung. Praxis-Übungseinheiten zum Sicherheitsgefühl empfohlen.' },
    besonderheiten: ['Sehtest ist Pflicht', 'Erste-Hilfe-Kurs nicht zwingend, aber empfohlen'],
  },
  {
    id: 'am',
    name: 'AM',
    title: 'Roller & Mofa-Auto',
    category: 'Zweirad',
    badge: 'Ab 15/16',
    summary: 'Bis 45 km/h. Roller, Moped, leichte Quads — die klassische Einstiegsklasse.',
    mindestalter: '15 Jahre (Baden-Württemberg) / 16 Jahre (übrige Bundesländer)',
    fahrzeuge: [
      'Zweirädrige Kleinkrafträder bis 45 km/h, max. 50 ccm / 4 kW',
      'Dreirädrige Kleinkrafträder bis 45 km/h, max. 50 ccm bzw. 4 kW',
      'Vierrädrige Leichtkraftfahrzeuge bis 45 km/h, leer max. 350 kg',
    ],
    theorie: { grundstoff: '12 Doppelstunden', klassenspezifisch: '2 Doppelstunden' },
    praxis: { pflicht: 'Praktische Prüfung erforderlich. Keine Pflicht-Sonderfahrten.' },
    besonderheiten: ['Theorie- und Praxisprüfung', 'In Klasse B automatisch enthalten'],
  },
  {
    id: 'a1',
    name: 'A1',
    title: 'Leichtkraftrad',
    category: 'Zweirad',
    badge: 'Ab 16',
    summary: 'Motorrad bis 125 ccm und 11 kW — perfekter Einstieg ins richtige Motorradfahren.',
    mindestalter: '16 Jahre',
    fahrzeuge: [
      'Krafträder bis 125 ccm, max. 11 kW',
      'Leistung/Gewicht max. 0,1 kW/kg',
      'Dreirädrige Kraftfahrzeuge bis 15 kW (ab 16)',
    ],
    theorie: { grundstoff: '12 Doppelstunden', klassenspezifisch: '4 Doppelstunden' },
    praxis: {
      pflicht: 'Übungsstunden + Sonderfahrten.',
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3 },
    },
    besonderheiten: ['Nach 2 Jahren Aufstieg in A2 erleichtert', 'Klasse AM eingeschlossen'],
  },
  {
    id: 'a2',
    name: 'A2',
    title: 'Mittlere Motorräder',
    category: 'Zweirad',
    badge: 'Ab 18',
    summary: 'Motorräder bis 35 kW — der ideale Zwischenschritt zur offenen Klasse A.',
    mindestalter: '18 Jahre',
    fahrzeuge: [
      'Krafträder bis 35 kW Motorleistung',
      'Leistung/Gewicht max. 0,2 kW/kg',
      'Nicht aus Fahrzeugen mit über 70 kW abgeleitet',
    ],
    theorie: { grundstoff: '12 Doppelstunden', klassenspezifisch: '4 Doppelstunden' },
    praxis: {
      pflicht: 'Übungsstunden + Sonderfahrten.',
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3 },
    },
    besonderheiten: ['Bei Aufstieg aus A1 nach 2 Jahren: nur praktische Prüfung', 'Nach 2 Jahren Aufstieg in A möglich'],
  },
  {
    id: 'a',
    name: 'A',
    title: 'Alle Motorräder',
    category: 'Zweirad',
    badge: 'Ab 20/24',
    summary: 'Alle Motorräder ohne Leistungsgrenze. Direkteinstieg oder Aufstieg aus A2.',
    mindestalter: '24 Jahre (Direkteinstieg) · 20 Jahre (nach 2 Jahren A2)',
    voraussetzung: 'Direkteinstieg oder mindestens 2 Jahre Klasse A2',
    fahrzeuge: [
      'Krafträder ohne Leistungs- oder Hubraumbeschränkung',
      'Dreirädrige Kraftfahrzeuge über 15 kW',
    ],
    theorie: { grundstoff: '12 DStd (Direkteinstieg) · 0 (Aufstieg A2 → A)', klassenspezifisch: '4 DStd (Direkteinstieg)' },
    praxis: {
      pflicht: 'Direkteinstieg mit vollen Sonderfahrten. Aufstieg A2→A: nur praktische Prüfung, keine Pflichtstunden.',
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3 },
    },
    besonderheiten: ['Einschluss: A1, A2, AM, Mofa'],
  },

  // ─────────── AUTO ───────────
  {
    id: 'b',
    name: 'B',
    title: 'PKW',
    category: 'Auto',
    badge: 'Ab 17/18',
    summary: 'Der klassische Autoführerschein bis 3,5 t — mit BF17 schon ab 17 Jahren möglich.',
    mindestalter: '18 Jahre · 17 Jahre mit BF17 (Begleitetes Fahren)',
    fahrzeuge: [
      'Kraftfahrzeuge bis 3.500 kg zulässige Gesamtmasse (zGM)',
      'Max. 8 Sitzplätze (außer Fahrer)',
      'Anhänger bis 750 kg ohne Einschränkung',
      'Anhänger über 750 kg, wenn Zug max. 3.500 kg',
    ],
    theorie: { grundstoff: '12 Doppelstunden', klassenspezifisch: '2 Doppelstunden' },
    praxis: {
      pflicht: 'Übungsstunden nach Bedarf + Pflicht-Sonderfahrten.',
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3 },
    },
    besonderheiten: [
      'BF17: ab 17 mit Begleiter:in fahren — Antrag schon mit 16,5',
      'Klasse AM und L eingeschlossen',
    ],
  },
  {
    id: 'b-auto',
    name: 'B197',
    title: 'B mit Automatik-Prüfung',
    category: 'Auto',
    badge: 'Schlüsselzahl 197',
    summary: 'Prüfung auf Automatik — anschließend Schaltschulung (10 Std.) und du fährst trotzdem regulär B.',
    mindestalter: '18 Jahre · 17 Jahre mit BF17',
    fahrzeuge: ['Wie Klasse B', 'Prüfung auf Automatikfahrzeug, nach Schaltschulung volle B-Berechtigung'],
    theorie: { grundstoff: '12 Doppelstunden', klassenspezifisch: '2 Doppelstunden' },
    praxis: {
      pflicht: 'Wie B + zusätzlich 10 Fahrstunden Schaltschulung + 15 min Schalt-Testfahrt.',
      sonderfahrten: { ueberland: 5, autobahn: 4, nacht: 3 },
    },
    besonderheiten: [
      'Stressfreier Lernen — Fokus auf Verkehr statt Kupplung',
      'Kein "Automatik-Eintrag" in den Führerschein',
      'Bei NoLimit auf modernem Automatikfahrzeug',
    ],
  },
  {
    id: 'be',
    name: 'BE',
    title: 'PKW mit großem Anhänger',
    category: 'Auto',
    badge: 'Ab 18',
    summary: 'B + Anhänger über 750 kg — für Pferdeanhänger, Wohnwagen, Bootstrailer.',
    mindestalter: '18 Jahre',
    voraussetzung: 'Klasse B',
    fahrzeuge: [
      'Klasse B + Anhänger über 750 kg',
      'Gesamtmasse Anhänger bis 3.500 kg',
      'Zug bis 7.000 kg',
    ],
    theorie: { grundstoff: 'Entfällt (B vorausgesetzt)', klassenspezifisch: 'Entfällt' },
    praxis: {
      pflicht: 'Nur praktische Prüfung. Keine Theorieprüfung.',
      sonderfahrten: { ueberland: 3, autobahn: 1, nacht: 1 },
    },
    besonderheiten: ['Schnellster Weg zum Anhängerführerschein', 'Wird häufig kombiniert mit B-Prüfung'],
  },

  // ─────────── LKW ───────────
  {
    id: 'c1',
    name: 'C1',
    title: 'Mittlerer Lkw',
    category: 'Lkw',
    badge: 'Ab 18',
    summary: 'Fahrzeuge von 3,5 bis 7,5 t — der Einstieg in die Lkw-Klassen.',
    mindestalter: '18 Jahre',
    voraussetzung: 'Klasse B',
    fahrzeuge: [
      'Kraftfahrzeuge 3.500 – 7.500 kg zGM',
      'Max. 8 Sitzplätze (außer Fahrer)',
      'Anhänger bis 750 kg',
    ],
    theorie: { grundstoff: '6 DStd (Erweiterung)', klassenspezifisch: '6 Doppelstunden' },
    praxis: {
      pflicht: 'Übung + Sonderfahrten.',
      sonderfahrten: { ueberland: 3, autobahn: 1, nacht: 1 },
    },
    besonderheiten: ['Befristet auf 5 Jahre, Verlängerung mit ärztlicher Untersuchung'],
  },
  {
    id: 'c1e',
    name: 'C1E',
    title: 'C1 + Anhänger',
    category: 'Lkw',
    badge: 'Ab 18',
    voraussetzung: 'Klasse C1',
    summary: 'C1 mit großem Anhänger — Gesamtzug bis 12 t.',
    mindestalter: '18 Jahre',
    fahrzeuge: [
      'C1 + Anhänger über 750 kg',
      'Gesamtzug bis 12.000 kg',
      'Auch B + Anhänger über 3.500 kg, Zug bis 12.000 kg',
    ],
    theorie: { grundstoff: 'Entfällt (C1 vorausgesetzt)', klassenspezifisch: 'Entfällt' },
    praxis: {
      pflicht: 'Nur praktische Prüfung.',
      sonderfahrten: { ueberland: 3, autobahn: 1, nacht: 1 },
    },
    besonderheiten: ['Befristet auf 5 Jahre', 'Häufig kombiniert mit C1-Prüfung'],
  },
  {
    id: 'c',
    name: 'C',
    title: 'Schwerer Lkw',
    category: 'Lkw',
    badge: 'Ab 21',
    summary: 'Lkw ohne Gewichtsgrenze nach oben — Berufskraftfahrer-Klasse.',
    mindestalter: '21 Jahre · 18 Jahre mit BKrFQG-Grundqualifikation',
    voraussetzung: 'Klasse B',
    fahrzeuge: [
      'Kraftfahrzeuge über 3.500 kg zGM',
      'Max. 8 Sitzplätze (außer Fahrer)',
      'Anhänger bis 750 kg',
    ],
    theorie: { grundstoff: '6 DStd (Erweiterung)', klassenspezifisch: '10 Doppelstunden' },
    praxis: {
      pflicht: 'Übung + Sonderfahrten.',
      sonderfahrten: { ueberland: 5, autobahn: 2, nacht: 3 },
    },
    besonderheiten: ['Befristet auf 5 Jahre', 'Schlüssel zur Berufskraftfahrer-Ausbildung'],
  },
  {
    id: 'ce',
    name: 'CE',
    title: 'Lkw + Sattelanhänger',
    category: 'Lkw',
    badge: 'Ab 21',
    voraussetzung: 'Klasse C',
    summary: 'Lkw mit Sattelanhänger, Lastzüge — die offene Lkw-Klasse.',
    mindestalter: '21 Jahre · 18 Jahre mit BKrFQG-Grundqualifikation',
    fahrzeuge: [
      'C + Anhänger über 750 kg',
      'Sattelkraftfahrzeuge, Lastzüge',
      'Keine Gewichtsbegrenzung des Zugs',
    ],
    theorie: { grundstoff: 'Entfällt (C vorausgesetzt)', klassenspezifisch: 'Entfällt' },
    praxis: {
      pflicht: 'Nur praktische Prüfung.',
      sonderfahrten: { ueberland: 5, autobahn: 2, nacht: 3 },
    },
    besonderheiten: ['Befristet auf 5 Jahre', 'Einschluss: BE, T'],
  },
];

// ─────────── Kategorien-Metadaten für den Showcase ───────────
export interface CategoryInfo {
  id: 'auto' | 'motorrad' | 'roller' | 'lkw';
  label: string;
  icon: string;
  category: Category;
  classIds: string[];          // welche Klassen gehören in diese Kategorie-Ansicht
  intro: string;
  badge?: string;
  hotspot: { x: number; y: number };  // Position auf dem Showcase-Bild (%)
}

// Hotspot-Koordinaten: % auf /public/showcase.png (1408 × 628, ohne Watermark).
export const categories: CategoryInfo[] = [
  {
    id: 'auto',
    label: 'PKW',
    icon: '🚗',
    category: 'Auto',
    classIds: ['b', 'b-auto', 'be'],
    badge: 'Am beliebtesten',
    intro: 'Vom klassischen B-Schein bis zum großen Anhänger — alles, was du auf der Straße brauchst.',
    hotspot: { x: 13.5, y: 78 },
  },
  {
    id: 'motorrad',
    label: 'Motorrad',
    icon: '🏍️',
    category: 'Zweirad',
    classIds: ['a2', 'a'],
    intro: 'Das echte Motorradfahren — von A2 (mittlere Klasse) bis A (alle Maschinen).',
    hotspot: { x: 35, y: 70 },
  },
  {
    id: 'roller',
    label: 'Roller / Moped',
    icon: '🛵',
    category: 'Zweirad',
    classIds: ['mofa', 'am', 'a1'],
    intro: 'Klein, leicht, mobil — vom Mofa über Roller bis zum 125er.',
    hotspot: { x: 62.5, y: 78 },
  },
  {
    id: 'lkw',
    label: 'Lkw',
    icon: '🚛',
    category: 'Lkw',
    classIds: ['c1', 'c1e', 'c', 'ce'],
    intro: 'Von 3,5 t bis Sattelzug — alle Lkw-Klassen für Beruf und Privat.',
    hotspot: { x: 82, y: 50 },
  },
];

export function getClass(id: string): LicenseClass | undefined {
  return licenseClasses.find((c) => c.id === id);
}
