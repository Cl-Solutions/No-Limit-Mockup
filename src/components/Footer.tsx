import { useState } from 'react';
import { useModalA11y } from '../hooks/useModalA11y';

const navLinks = [
  { label: 'Über uns', href: '#about' },
  { label: 'Flotte', href: '#flotte' },
  { label: 'Führerscheine', href: '#fuehrerscheine' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Seminare', href: '#seminare' },
  { label: 'Team', href: '#team' },
  { label: 'Anmelden', href: '#oeffnungszeiten' },
];

const handleNav = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function DatenschutzModal({ onClose }: { onClose: () => void }) {
  useModalA11y(true, onClose);
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Datenschutzerklärung"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#111111] dark:text-white font-black text-2xl mb-2">Datenschutzerklärung</h2>
        <p className="text-[#666666] dark:text-white/40 text-xs mb-6">
          Übernommen aus den Angaben der Fahrschule NoLimit, an diese Website angepasst.
        </p>

        <div className="text-[#444444] dark:text-white/65 text-sm leading-relaxed space-y-5">
          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">1. Verantwortlicher</h3>
            <p>
              Fahrschule NoLimit · Inh. Etem Bardakcioglu<br />
              Bahnhofstr. 71, 75417 Mühlacker<br />
              Telefon: 07041 49 71 35 · Mobil: 0176 247 246 35<br />
              E-Mail: info@fahrschule-nolimit.de
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">2. Allgemeines zur Datenverarbeitung</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften, insbesondere der DSGVO.
            </p>
            <p className="mt-2">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.
              Soweit personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis.
              Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p className="mt-2">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation
              per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem
              Zugriff durch Dritte ist nicht möglich.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">3. Rechtsgrundlagen der Verarbeitung</h3>
            <p>
              Soweit wir eine Einwilligung einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.
              Für die Verarbeitung zur Erfüllung eines Vertrages gilt Art. 6 Abs. 1 lit. b DSGVO.
              Für rechtliche Verpflichtungen gilt Art. 6 Abs. 1 lit. c DSGVO. Liegt unser berechtigtes
              Interesse vor, ist Art. 6 Abs. 1 lit. f DSGVO Rechtsgrundlage.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">4. Server-Logfiles</h3>
            <p>
              Beim Aufruf unserer Seite erfasst unser Provider automatisch folgende Daten in Server-Logfiles:
              Browsertyp und -version, Betriebssystem, Referrer-URL, gekürzte IP-Adresse sowie Datum und
              Uhrzeit des Zugriffs. Diese Daten sind nicht bestimmten Personen zuordenbar; eine Zusammenführung
              mit anderen Datenquellen erfolgt nicht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">5. Kontaktaufnahme</h3>
            <p>
              Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, werden Ihre Angaben zur
              Bearbeitung der Anfrage gespeichert und nicht an Dritte weitergegeben. Es erfolgt kein
              automatisierter Versand an externe Systeme.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">6. Eingebundene Drittinhalte</h3>
            <p>
              Diese Seite verlinkt auf Google Maps (Routenführung) und Google Reviews. Beim Klick auf
              einen externen Link werden Sie zur jeweiligen Seite von Google weitergeleitet. Auf den
              dortigen Datenschutz haben wir keinen Einfluss; siehe{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-[#E31E2D] underline hover:no-underline">policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">7. Ihre Rechte</h3>
            <p>
              Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten
              (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
              (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21). Außerdem steht Ihnen
              ein Beschwerderecht bei einer Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h3 className="text-[#111111] dark:text-white font-bold text-base mb-2">8. Widerspruch gegen Werbe-Mails</h3>
            <p>
              Der Nutzung der im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur
              Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit widersprochen.
              Die Betreiber behalten sich rechtliche Schritte im Falle unverlangter Zusendung von
              Werbeinformationen, etwa durch Spam-E-Mails, ausdrücklich vor.
            </p>
          </section>

          <p className="text-[#999999] dark:text-white/30 text-xs pt-2 border-t border-black/5 dark:border-white/5">
            Diese Datenschutzerklärung basiert auf der bestehenden Erklärung der Fahrschule NoLimit
            und wurde an die aktuelle Website angepasst. Bitte vor Live-Schaltung von einem Rechtsanwalt
            prüfen lassen.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-[#E31E2D] text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] rounded-sm"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

function ImpressumModal({ onClose }: { onClose: () => void }) {
  useModalA11y(true, onClose);
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Impressum"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#111111] dark:text-white font-black text-2xl mb-6">Impressum</h2>
        <div className="text-[#444444] dark:text-white/60 text-sm leading-relaxed space-y-4">
          <p>
            <strong className="text-[#111111] dark:text-white">Angaben gemäß § 5 TMG:</strong><br />
            Fahrschule NoLimit<br />
            Inh. Etem Bardakcioglu<br />
            Bahnhofstr. 71<br />
            75417 Mühlacker
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Kontakt:</strong><br />
            Telefon: 07041 49 71 35<br />
            Mobil: 0176 247 246 35<br />
            Fax: 07041 146 289 5<br />
            E-Mail: info@fahrschule-nolimit.de
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Berufsbezeichnung:</strong><br />
            Fahrlehrer (verliehen in der Bundesrepublik Deutschland)
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Haftung für Inhalte:</strong><br />
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
            Gewähr übernehmen.
          </p>
          <p className="text-[#999999] dark:text-white/30 text-xs">
            Stand: 2025 — Dies ist ein Platzhalter-Impressum.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-[#E31E2D] text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] rounded-sm"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <>
      {showDatenschutz && <DatenschutzModal onClose={() => setShowDatenschutz(false)} />}
      {showImpressum && <ImpressumModal onClose={() => setShowImpressum(false)} />}

      <footer className="bg-[#F0F0F0] dark:bg-[#080808] border-t border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <div className="bg-white inline-block rounded-sm p-2.5 mb-4">
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img src="/logo.png" alt="Fahrschule NoLimit" className="h-12 w-auto" width={248} height={184} />
                </picture>
              </div>
              <p className="text-[#666666] dark:text-gray-400 text-sm leading-relaxed">
                Deine Fahrschule in Mühlacker und Knittlingen seit 2008.
                Inh. Etem Bardakcioglu.
              </p>
            </div>

            <div>
              <h4 className="text-[#111111] dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="text-[#666666] dark:text-gray-300 hover:text-[#111111] dark:hover:text-white text-sm text-left transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#111111] dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">Kontakt</h4>
              <div className="space-y-3 text-sm text-[#666666] dark:text-gray-400">
                <p><a href="tel:017624724635" className="hover:text-[#111111] dark:hover:text-white transition-colors">0176 247 246 35</a></p>
                <p><a href="tel:07041497135" className="hover:text-[#111111] dark:hover:text-white transition-colors">07041 49 71 35</a></p>
                <p><a href="mailto:info@fahrschule-nolimit.de" className="hover:text-[#111111] dark:hover:text-white transition-colors">info@fahrschule-nolimit.de</a></p>
                <p>Bahnhofstr. 71, Mühlacker</p>
                <p>Bahnhofstr. 4, Knittlingen</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10 dark:border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-black/25 dark:text-white/25 text-xs text-center md:text-left">
              © 2025 Fahrschule NoLimit | Inh. Etem Bardakcioglu
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowDatenschutz(true)}
                className="text-black/25 dark:text-white/25 hover:text-black/60 dark:hover:text-white/60 text-xs transition-colors"
              >
                Datenschutz
              </button>
              <span className="text-black/10 dark:text-white/10">|</span>
              <button
                onClick={() => setShowImpressum(true)}
                className="text-black/25 dark:text-white/25 hover:text-black/60 dark:hover:text-white/60 text-xs transition-colors"
              >
                Impressum
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
