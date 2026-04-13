import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'NoLimit', href: '#about' },
  { label: 'Führerscheine', href: '#fuehrerscheine' },
  { label: 'Seminare', href: '#seminare' },
  { label: 'Team', href: '#team' },
  { label: 'Öffnungszeiten', href: '#oeffnungszeiten' },
  { label: 'Kontakt', href: '#kontakt' },
];

const handleNav = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function DatenschutzModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#111111] dark:text-white font-black text-2xl mb-6">Datenschutzerklärung</h2>
        <div className="text-[#444444] dark:text-white/60 text-sm leading-relaxed space-y-4">
          <p>
            <strong className="text-[#111111] dark:text-white">Verantwortlicher:</strong><br />
            Fahrschule NoLimit | Inh. Etem Bardakcioglu<br />
            Bahnhofstr. 71, Mühlacker<br />
            info@fahrschule-nolimit.de
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Erhebung personenbezogener Daten:</strong><br />
            Personenbezogene Daten werden nur erhoben, soweit dies für die Nutzung unserer Angebote
            erforderlich ist. Ihre Daten werden nicht an Dritte weitergegeben.
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Kontaktformular:</strong><br />
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der
            Anfrage bei uns gespeichert.
          </p>
          <p>
            <strong className="text-[#111111] dark:text-white">Ihre Rechte:</strong><br />
            Sie haben das Recht auf Auskunft über die bei uns gespeicherten personenbezogenen Daten
            sowie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung.
          </p>
          <p className="text-[#999999] dark:text-white/30 text-xs">
            Stand: 2025 — Diese Datenschutzerklärung ist ein Platzhalter.
            Bitte lassen Sie diese durch einen Rechtsanwalt prüfen und anpassen.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-[#E31E2D] text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors rounded-sm"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

function ImpressumModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
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
          className="mt-8 bg-[#E31E2D] text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors rounded-sm"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex flex-col items-start mb-4">
                <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.2em]">Fahrschule</span>
                <span className="text-[#111111] dark:text-white text-3xl font-black tracking-tight">NoLimit</span>
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
                    className="text-[#666666] dark:text-gray-300 hover:text-[#111111] dark:hover:text-white text-sm text-left transition-colors hover:pl-1 duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#111111] dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-5">Kontakt</h4>
              <div className="space-y-2 text-sm text-[#666666] dark:text-gray-400">
                <p>0176 247 246 35</p>
                <p>info@fahrschule-nolimit.de</p>
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
