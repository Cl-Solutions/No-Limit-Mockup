import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Printer, Send } from 'lucide-react';

const subjects = ['Anmeldung', 'Führerscheinklasse', 'ASF Seminar', 'Sonstiges'];

interface FormState {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const baseInput =
  'w-full bg-[#F0F0F0] dark:bg-[#1a1a1a] border rounded-md text-[#111111] dark:text-white text-[15px] px-4 py-[14px] outline-none transition-colors duration-300 placeholder-[#999999] dark:placeholder-[#666666]';

const inputClass = (hasError?: string) =>
  `${baseInput} ${hasError ? 'border-[#E31E2D]' : 'border-black/10 dark:border-[#444444] focus:border-[#E31E2D]'}`;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    subject: subjects[0],
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = 'Pflichtfeld';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Gültige E-Mail erforderlich';
    if (!form.message.trim()) errs.message = 'Pflichtfeld';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-32 pb-28 bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#E31E2D]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E31E2D]" />
            <span className="text-[#E31E2D] text-xs font-bold uppercase tracking-[0.3em]">Kontakt</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111111] dark:text-white leading-tight tracking-tight">
            Meld dich bei uns
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-[#444444] dark:text-gray-300 text-lg leading-relaxed mb-12">
              Fragen, Anmeldung oder einfach Infos gewünscht?
              Ruf an oder schreib uns — wir antworten schnell.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Mobil', value: '0176 247 246 35', href: 'tel:017624724635' },
                { icon: Phone, label: 'Festnetz', value: '07041 49 71 35', href: 'tel:074014971 35' },
                { icon: Printer, label: 'Fax', value: '07041 146 289 5', href: undefined },
                { icon: Mail, label: 'E-Mail', value: 'info@fahrschule-nolimit.de', href: 'mailto:info@fahrschule-nolimit.de' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center gap-5 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  >
                    <div className="w-11 h-11 bg-[#E31E2D]/10 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[#E31E2D]/20 transition-colors">
                      <Icon size={18} className="text-[#E31E2D]" />
                    </div>
                    <div>
                      <div className="text-[#666666] dark:text-gray-400 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[#111111] dark:text-white font-medium hover:text-[#E31E2D] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[#111111] dark:text-white font-medium">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 pt-10 border-t border-black/5 dark:border-white/5 space-y-3">
              {[
                'Bahnhofstr. 71, Mühlacker',
                'Bahnhofstr. 4, Knittlingen',
              ].map((addr, i) => (
                <div key={i} className="flex items-center gap-4 text-[#444444] dark:text-gray-300">
                  <MapPin size={16} className="text-[#E31E2D] shrink-0" />
                  <span className="text-sm">{addr}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-[#F0F0F0] dark:bg-[#1a1a1a] border border-[#E31E2D]/30 rounded-md p-12 text-center">
                <div className="w-16 h-16 bg-[#E31E2D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={28} className="text-[#E31E2D]" />
                </div>
                <h3 className="text-[#111111] dark:text-white font-black text-2xl mb-3">Nachricht gesendet!</h3>
                <p className="text-[#444444] dark:text-gray-300">
                  Danke für deine Nachricht. Wir melden uns innerhalb weniger Stunden.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block text-[#444444] dark:text-gray-300 text-[13px] mb-1.5">Name *</label>
                  <input
                    type="text"
                    placeholder="Dein vollständiger Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-[#E31E2D] text-xs mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[#444444] dark:text-gray-300 text-[13px] mb-1.5">Telefonnummer</label>
                  <input
                    type="tel"
                    placeholder="z. B. 0176 123 456 78"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass()}
                  />
                </div>

                <div>
                  <label className="block text-[#444444] dark:text-gray-300 text-[13px] mb-1.5">E-Mail *</label>
                  <input
                    type="email"
                    placeholder="deine@email.de"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-[#E31E2D] text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[#444444] dark:text-gray-300 text-[13px] mb-1.5">Betreff</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`${inputClass()} appearance-none cursor-pointer`}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s} className="bg-[#F0F0F0] dark:bg-[#1a1a1a]">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#444444] dark:text-gray-300 text-[13px] mb-1.5">Nachricht *</label>
                  <textarea
                    placeholder="Deine Nachricht an uns..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass(errors.message)} resize-none min-h-[140px]`}
                  />
                  {errors.message && <p className="text-[#E31E2D] text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E31E2D] text-white py-4 font-bold uppercase tracking-[0.15em] text-sm hover:bg-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,30,45,0.4)] active:scale-[0.99] rounded-md flex items-center justify-center gap-3"
                >
                  <Send size={16} />
                  Nachricht senden
                </button>

                <p className="text-[#666666] dark:text-gray-300 text-xs text-center">
                  Wir antworten innerhalb weniger Stunden.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
