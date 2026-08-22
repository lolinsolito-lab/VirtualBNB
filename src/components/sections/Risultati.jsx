import { motion } from 'framer-motion'

const caseStudies = [
  {
    type: 'Da Affitto Tradizionale a VirtualBNB',
    title: 'Bilocale in Zona Porta Romana',
    oldRevenue: '€1.100/mese',
    newRevenue: '€3.450/mese',
    increase: '+213%',
    story: 'Il proprietario aveva l\'appartamento in affitto tradizionale 4+4 a 1.100€ al mese, spesso in ritardo coi pagamenti. Grazie a VirtualBNB e all\'implementazione del nostro AI Pricing, intercetta costantemente i viaggiatori corporate e gli eventi di Milano (Design Week, Fashion Week). L\'appartamento è curato, controllato giornalmente tramite la nostra checklist fotografica da hotel e non si usura.',
    guestType: 'Clientela B2B & Manager in Trasferta',
    photo: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'Da Ex Property Manager a Noi',
    title: 'Trilocale Luxury Navigli',
    oldRevenue: '€3.200/mese',
    newRevenue: '€5.100/mese',
    increase: '+59%',
    story: 'Affidato inizialmente a una nota agenzia tradizionale che operava con un prezzo semi-fisso tutto l\'anno. Il nostro tool di Wheelhouse & Pricelabs aggiorna i prezzi ogni 6 ore analizzando fiera per fiera. Durante il Salone del Mobile abbiamo massimizzato a 1.200€/notte, occupandolo non solo su Airbnb ma tramite le nostre partnership dirette a commissione zero.',
    guestType: 'Famiglie Premium & Design Week',
    photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Risultati() {
  return (
    <section id="risultati" className="bg-dark-900 relative overflow-hidden text-left border-y border-gold-500/10">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at right, rgba(184,150,62,0.05) 0%, transparent 60%)' }}
      />

      <div className="py-28 md:py-36 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col gap-1 font-sans text-[13px] md:text-[14px] tracking-[0.25em] uppercase text-gold-500 mb-6"
          >
            <span className="flex items-center gap-3">
              <span className="w-8 h-px bg-gold-500" />
              Esempi Storici & Simulazioni
            </span>
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-light text-white leading-[1.1] mb-16"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
          >
            Risultati che<br />
            <em className="italic text-gold-400">prendono vita.</em>
          </motion.h2>

          {/* Case studies */}
          <div className="flex flex-col gap-12 md:gap-16">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center p-8 md:p-12 bg-dark-800 border border-dark-700`}
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
              >
                {/* Photo */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
                  <img
                    src={cs.photo}
                    alt={cs.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border border-gold-500/20" />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="font-mono text-[13px] tracking-[0.15em] uppercase text-gold-500 mb-3">{cs.type}</p>
                  <h3 className="font-serif text-[32px] md:text-[38px] text-white font-normal mb-8 leading-snug">{cs.title}</h3>

                  <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-white/10">
                    <div>
                      <p className="font-sans text-[12px] uppercase tracking-widest text-dark-200 mb-1">Precedente</p>
                      <p className="font-mono text-[24px] text-dark-100 line-through decoration-red-500/50">{cs.oldRevenue}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[12px] uppercase tracking-widest text-gold-500 mb-1">Con VirtualBNB</p>
                      <p className="font-mono text-[34px] text-white">
                        {cs.newRevenue}
                        <span className="text-green-400 text-[18px] ml-3 align-middle">{cs.increase}</span>
                      </p>
                    </div>
                  </div>

                  <p className="font-sans font-light text-[17px] md:text-[18px] text-dark-100 leading-relaxed max-w-xl mb-6">{cs.story}</p>
                  <p className="font-sans font-medium text-[13px] tracking-[0.1em] uppercase text-dark-200">
                    <span className="text-gold-500">Ospiti tipo:</span> {cs.guestType}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
