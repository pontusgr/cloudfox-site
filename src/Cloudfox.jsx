import { useState, useEffect, useRef } from "react";

function useReveal(th = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th });
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}
function R({ children, delay = 0 }) {
  const [ref, v] = useReveal();
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(22px)", transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}s, transform .6s cubic-bezier(.22,1,.36,1) ${delay}s` }}>{children}</div>;
}

export default function Cloudfox() {
  const [lang, setLang] = useState("sv");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xjgayrzr", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    });
    setSent(true);
  };
  const L = (en, sv) => lang === "sv" ? sv : en;

  useEffect(() => {
    if (document.getElementById("cf-f4")) return;
    const l = document.createElement("link"); l.id = "cf-f4"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = `
      .cfx{--a:#4F7FFF;--bg:#06090F;--s:'Inter',system-ui,sans-serif;font-family:var(--s);color:#F1F5F9;background:var(--bg)}
      .cfx *{box-sizing:border-box;margin:0}.cfx a{color:inherit;text-decoration:none}
      .cfx-card{transition:border-color .25s,background .25s}
      .cfx-card:hover{border-color:rgba(79,127,255,.25)!important;background:rgba(79,127,255,.02)!important}
      .cfx-g3{display:grid;grid-template-columns:1fr}
      @media(min-width:768px){.cfx-g3{grid-template-columns:repeat(3,1fr)}}
      .cfx-split{display:grid;grid-template-columns:1fr}
      @media(min-width:900px){.cfx-split{grid-template-columns:5fr 7fr;align-items:start}}
      .cfx-btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;border-radius:3px;font-family:var(--s);cursor:pointer;border:none;letter-spacing:-.01em;transition:filter .2s}
      .cfx-btn:hover{filter:brightness(1.1)}
      .cfx-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:2px;background:rgba(79,127,255,.1);color:#93C5FD}
      .cfx-input{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;color:#F1F5F9;font-size:15px;font-family:var(--s);outline:none;width:100%;transition:border-color .2s}
      .cfx-input:focus{border-color:rgba(79,127,255,.5)}
      .cfx-input::placeholder{color:#475569}
      .cfx-expand{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.22,1,.36,1)}
      .cfx-expand.open{max-height:600px}
    `;
    document.head.appendChild(s);
  }, []);

  const ac = "#4F7FFF";
  const m = "#94A3B8";
  const d = "#475569";
  const lt = "#E2E8F0";
  const bdr = "1px solid rgba(255,255,255,.07)";
  const pad = "clamp(1.5rem, 6vw, 7rem)";

  const Label = ({ children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 28, height: 2, background: ac }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: ac }}>{children}</span>
    </div>
  );

  const H2 = ({ children }) => (
    <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.06 }}>{children}</h2>
  );

  const reasons = lang === "sv" ? [
    {
      title: "Microsoft + Claude + Lovable",
      text: "Vi har medvetet fokuserat på de verktyg som tillsammans täcker svensk SMEs behov. Microsoft för djup integration med era befintliga system — Office, Power Platform, SharePoint. Claude för avancerad AI-utveckling där modellens kvalitet är avgörande — komplex reasoning, integration och custom-lösningar. Lovable för snabb prototyping och visuella front-ends när ni snabbt behöver se en idé i verkligheten. Vi väljer rätt verktyg per problem, inte rätt vendor per försäljning.",
    },
    {
      title: "Egen admin-modul — ni styr lösningen",
      text: "Vi bygger lösningen, ni styr den. I admin-modulen justerar er process-ägare AI-prompts, prisregler, output-mallar och form-fält själva — i minuter, utan att skriva kod. Ex för offert-app: ändra säsongstillägg från +8% till +10%, lägga till regler för nya destinationer, tweaka tone-of-voice. Säkra gränser så ni inte kan bryta arkitekturen. Större ändringar tar vi som tillägg.",
    },
    {
      title: "Driftsansvar från idé till drift",
      text: "När er AI-lösning går sönder klockan 22 på lördag finns det inte alltid någon att ringa hos andra leverantörer. Det finns hos oss. Manuell kodgranskning före leverans, GDPR-compliance, övervakning efter, namngiven kontakt när något händer.",
    },
  ] : [
    {
      title: "Microsoft + Claude + Lovable",
      text: "We have deliberately focused on the tools that together cover Swedish SME needs. Microsoft for deep integration with your existing systems — Office, Power Platform, SharePoint. Claude for advanced AI development where model quality is critical — complex reasoning, integration, and custom solutions. Lovable for rapid prototyping and visual front-ends when you need to see an idea come to life quickly. We choose the right tool per problem, not the right vendor per sale.",
    },
    {
      title: "Your own admin module — you steer the solution",
      text: "We build the solution, you steer it. In the admin module, your process owners adjust AI prompts, pricing rules, output templates and form fields themselves — in minutes, without writing code. Example for a quote app: change seasonal surcharge from +8% to +10%, add rules for new destinations, tweak tone-of-voice. Safe boundaries so you can't break the architecture. Larger changes we handle as add-ons.",
    },
    {
      title: "Operational accountability from idea to ongoing",
      text: "When your AI solution breaks at 10pm on a Saturday, there isn't always someone to call at other vendors. There is with us. Manual code review before delivery, GDPR compliance, monitoring after, named contact when something happens.",
    },
  ];

  return (
    <div className="cfx" style={{ background: "#06090F", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(6,9,15,.95)", backdropFilter: "blur(20px)", borderBottom: bdr }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, padding: `0 ${pad}` }}>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-.05em" }}>
            cloudfox<span style={{ color: ac }}>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {["sv", "en"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 10px", fontSize: 11, fontWeight: lang === l ? 700 : 400, textTransform: "uppercase",
                  background: "none", border: "none", cursor: "pointer", fontFamily: "var(--s)", letterSpacing: ".08em",
                  color: lang === l ? "#F1F5F9" : d, borderBottom: lang === l ? `2px solid ${ac}` : "2px solid transparent",
                }}>{l}</button>
              ))}
            </div>
            <a href="#contact" className="cfx-btn" style={{ fontSize: 13, padding: "9px 20px", background: ac, color: "#fff" }}>
              {L("Book free review", "Kostnadsfri genomgång")}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", padding: `clamp(4rem,7vw,6rem) ${pad} clamp(3rem,5vw,5rem)` }}>
        <div style={{ position: "absolute", top: "5%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,127,255,.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 28, height: 2, background: ac }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: ac }}>
                {L("AI partner for SME", "AI-partner för SME")}
              </span>
            </div>
          </R>
          <R delay={0.05}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1.05, maxWidth: "18em" }}>
              {L(
                <>Enterprise AI <span style={{ color: ac }}>for Swedish SME</span>.</>,
                <>Enterprise AI <span style={{ color: ac }}>för svensk SME</span>.</>
              )}
            </h1>
          </R>
          <R delay={0.1}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7, color: m, maxWidth: "46em" }}>
              {L(
                "AI that previously required million-budget investments and 6-12 months now takes weeks. For Swedish SMEs this means huge opportunities — the window for competitive advantage is open, but it closes when everyone has AI.",
                "AI som tidigare krävde miljonbudgetar och tog 6-12 månader tar nu veckor. För svensk SME innebär det stora möjligheter — fönstret för konkurrensfördel är öppet, men det stänger när alla har AI."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <p style={{ marginTop: 16, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 600, color: lt, maxWidth: "46em" }}>
              {L(
                "Cloudfox delivers enterprise-grade AI tailored to your business. Integrated with your systems. With operational accountability from day one. Data in your cloud environment.",
                "Cloudfox levererar enterprise-grade AI anpassad efter er affär. Integrerad med era system. Drift-ansvarig från dag ett. Datan i er moln-miljö."
              )}
            </p>
          </R>
          <R delay={0.16}>
            <div style={{ marginTop: 36 }}>
              <a href="#contact" className="cfx-btn" style={{ padding: "15px 30px", fontSize: 15, background: ac, color: "#fff" }}>
                {L("Book a free review", "Boka kostnadsfri genomgång")} <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </R>
        </div>
      </section>

      {/* HOW IT WORKS — productized offerings ladder */}
      <section id="offerings" style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(4rem,6vw,6rem) ${pad} clamp(2rem,3vw,3rem)` }}>
          <R>
            <Label>{L("How it works", "Så fungerar det")}</Label>
            <H2>{L(<>Tre roller, ett kontinuerligt<br />partnerskap.</>, <>Tre roller, ett kontinuerligt<br />partnerskap.</>)}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "Not a delivery project that ends. A continuous partnership with clear responsibilities. We build the foundation. You steer the solution through our admin module. We operate it — from day one through year five.",
                "Inte ett leveransprojekt med slut. Ett kontinuerligt partnerskap med tydliga ansvar. Vi bygger grunden. Ni styr lösningen genom vår admin-modul. Vi driftar den — från dag ett till år fem."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cfx-g3">
            {(lang === "sv" ? [
              {
                n: "01",
                title: "Discovery",
                summary: "Vi förstår er affär och identifierar use case",
                bullets: [
                  "Strategic AI Workshop med ledningsgruppen (90 min)",
                  "Inventering av era processer och AI-möjligheter",
                  "Konkret roadmap: vilka use cases, prioritering, ROI per case",
                  "Stack-rekommendation (Microsoft eller Anthropic) per use case",
                  "Foundation setup — databas, auth, miljöer förkonfigurerade",
                ],
                tail: "Fast pris: 15 000–25 000 kr",
              },
              {
                n: "02",
                title: "Anpassning",
                summary: "Ni styr lösningen — kontinuerligt, i admin-modulen",
                bullets: [
                  "Egen admin-modul: redigera AI-prompts, regler, mallar och fält",
                  "Test-sandbox — pröva ändringar innan de går live",
                  "Säkra gränser — ni kan inte bryta arkitekturen, bara konfigurera",
                  "Snabba iterationer — minuter, inte veckor, för småändringar",
                  "Större ändringar (nya integrationer, AI-funktioner) tar vi som tillägg",
                ],
                tail: "Från 50 000 kr — initial bygge",
              },
              {
                n: "03",
                title: "Drift",
                summary: "Vi tar driftsansvaret",
                bullets: [
                  "EU-hostat i er moln-miljö (Azure, AWS eller annan) — GDPR-säkert",
                  "Säkerhetsuppdateringar, tester och monitoring",
                  "Backup och felsökning vid driftstörningar",
                  "Namngiven kontakt och månadsrapportering",
                  "Förbättringar och buggfixar löpande",
                ],
                tail: "Från 1 500 kr/månad per app",
              },
            ] : [
              {
                n: "01",
                title: "Discovery",
                summary: "We understand your business and identify the use case",
                bullets: [
                  "Strategic AI Workshop with leadership team (90 min)",
                  "Inventory of your processes and AI opportunities",
                  "Concrete roadmap: which use cases, prioritization, ROI per case",
                  "Stack recommendation (Microsoft or Anthropic) per use case",
                  "Foundation setup — database, auth, environments preconfigured",
                ],
                tail: "Fixed price: 15,000–25,000 SEK",
              },
              {
                n: "02",
                title: "Adaptation",
                summary: "You steer the solution — continuously, in the admin module",
                bullets: [
                  "Your own admin module: edit AI prompts, rules, templates and fields",
                  "Test sandbox — try changes before they go live",
                  "Safe boundaries — you cannot break architecture, only configure",
                  "Fast iterations — minutes, not weeks, for small changes",
                  "Larger changes (new integrations, AI features) we handle as add-ons",
                ],
                tail: "From 50,000 SEK — initial build",
              },
              {
                n: "03",
                title: "Operations",
                summary: "We take operational accountability",
                bullets: [
                  "EU-hosted in your cloud environment (Azure, AWS or other) — GDPR-secure",
                  "Security updates, automated tests and monitoring",
                  "Backups and incident response",
                  "Named contact and monthly reporting",
                  "Improvements and bug fixes ongoing",
                ],
                tail: "From 1,500 SEK/month per app",
              },
            ]).map((step, i) => (
              <R key={step.n} delay={i * 0.06}>
                <div className="cfx-card" style={{ padding: `clamp(32px,3vw,48px) ${pad}`, borderRight: i < 2 ? bdr : "none", height: "100%", border: "1px solid transparent", borderTop: "none", borderBottom: "none", borderLeft: "none", display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700, letterSpacing: "-.03em" }}>{step.title}</h3>
                  <p style={{ marginTop: 10, fontSize: 14, color: lt, fontWeight: 500 }}>{step.summary}</p>
                  <ul style={{ marginTop: 18, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {step.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14, color: m, lineHeight: 1.6, position: "relative", paddingLeft: 18 }}>
                        <span style={{ position: "absolute", left: 0, top: 1, color: ac, fontWeight: 700 }}>·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {step.tail && <p style={{ marginTop: "auto", paddingTop: 16, borderTop: bdr, fontSize: 14, fontWeight: 600, color: lt }}>{step.tail}</p>}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CAN BE BUILT */}
      <section id="examples" style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(4rem,6vw,6rem) ${pad} clamp(2rem,3vw,3rem)` }}>
          <R>
            <Label>{L("What we deliver", "Vad vi levererar")}</Label>
            <H2>{L("AI solutions that solve real SME problems.", "AI-lösningar som löser konkreta SME-problem.")}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "Tailored delivery — every solution adapted to your business, your data and your existing systems. The list below is examples; we help you identify the right use cases for your industry and needs.",
                "Skräddarsydd leverans — varje lösning anpassad efter er affär, er data och era befintliga system. Listan är bara exempel — vi hjälper er identifiera rätt use cases utifrån er bransch och behov."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr, background: "rgba(255,255,255,.07)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
          }}>
            {(lang === "sv" ? [
              { title: "AI-driven offerthantering", desc: "Generera anpassade offerter på sekunder — er prislogik, era partners, era regler" },
              { title: "Lead-kvalificering & response", desc: "Svara på inkommande leads inom minuter, kvalificera och boka möten" },
              { title: "Kvalitetsavvikelser", desc: "Registrera, klassificera och spåra åtgärder" },
              { title: "Leverantörsuppföljning", desc: "Risk, prestanda och dokumenthantering" },
              { title: "ROI-kalkylator", desc: "Interaktiv på er webbsida som kvalificerar leads" },
              { title: "Produktkonfigurator", desc: "Kunden bygger sitt offertunderlag själv" },
              { title: "Inköpsförfrågan & anbudsmatris", desc: "RFP-automation och leverantörsjämförelse" },
              { title: "Avtalsöversikt", desc: "AI extraherar villkor, deadlines och parter från PDF" },
              { title: "Onboarding-flöde", desc: "Guide nyanställda genom första månaden" },
              { title: "Field service-app", desc: "Tekniker rapporterar arbete från fält" },
              { title: "Audit & compliance", desc: "Krav, evidens och deadlines på ett ställe" },
              { title: "Kundservice-agent", desc: "Svarar på vanliga frågor, eskalerar komplexa" },
            ] : [
              { title: "AI-driven quote management", desc: "Generate tailored quotes in seconds — your pricing logic, your partners, your rules" },
              { title: "Lead qualification & response", desc: "Respond to inbound leads in minutes, qualify and book meetings" },
              { title: "Quality deviations", desc: "Log, classify and track corrective actions" },
              { title: "Supplier follow-up", desc: "Risk, performance and document handling" },
              { title: "ROI calculator", desc: "Interactive on your website to qualify leads" },
              { title: "Product configurator", desc: "Customers build their own quote basis" },
              { title: "RFP & bid comparison", desc: "Procurement automation and supplier scoring" },
              { title: "Contract overview", desc: "AI extracts terms, deadlines and parties from PDF" },
              { title: "Onboarding flow", desc: "Guide new hires through their first month" },
              { title: "Field service app", desc: "Technicians report work from the field" },
              { title: "Audit & compliance", desc: "Requirements, evidence and deadlines in one place" },
              { title: "Customer service agent", desc: "Answers common queries, escalates complex ones" },
            ]).map((ex, i) => (
              <div key={i} className="cfx-card" style={{
                padding: "clamp(22px,2vw,30px) clamp(24px,2.5vw,36px)",
                background: "#06090F",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.015em", color: lt }}>{ex.title}</h3>
                <p style={{ marginTop: 8, fontSize: 13, color: m, lineHeight: 1.55 }}>{ex.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: bdr, borderBottom: bdr }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            { value: "80%", label: L("faster than traditional development", "snabbare än traditionell utveckling") },
            { value: L("Days", "Dagar"), label: L("from prototype to secure production", "från prototyp till säker produktion") },
            { value: "100%", label: L("you own the code from day one", "ni äger koden från dag ett") },
          ].map((s, i) => (
            <div key={i} style={{ padding: `clamp(28px,3vw,40px) ${pad}`, borderRight: i < 2 ? bdr : "none" }}>
              <div style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-.04em", color: "#fff" }}>{s.value}</div>
              <div style={{ marginTop: 6, fontSize: 14, color: m, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CLOUDFOX */}
      <section id="why" style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Why Cloudfox", "Varför Cloudfox")}</Label>
            <H2>{L(<>Three things that make Cloudfox<br />a different kind of partner.</>, <>Tre saker som gör Cloudfox<br />till en annan sorts partner.</>)}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "We combine deep expertise in both AI stacks, manual code review and senior delivery — in every engagement.",
                "Vi kombinerar djup expertis i båda AI-stackarna, manuell kodgranskning och senior leverans — i varje uppdrag."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {reasons.map((r, i) => (
              <R key={r.title} delay={(i % 3) * 0.05}>
                <div className="cfx-card" style={{ padding: `clamp(28px,3vw,40px) ${pad}`, borderBottom: bdr, border: bdr, borderTop: "none", borderLeft: "none" }}>
                  <h3 style={{ fontSize: "clamp(1rem,1.6vw,1.15rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{r.title}</h3>
                  <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, color: m }}>{r.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ borderTop: bdr }}>
          <div className="cfx-split">
            <div style={{ padding: `clamp(36px,4vw,56px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("The team", "Teamet")}</Label>
                <H2>{L("Senior expertise from day one.", "Senior expertis från dag ett.")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(36px,4vw,56px) ${pad}` }}>
              <R delay={0.06}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: m }}>
                  {L(
                    "Founded by Pontus Granborg — senior solution architect with 20+ years of experience in industrial operations, ERP systems and AI-native development. Every engagement is senior-led and backed by a global delivery team. You always know who is accountable.",
                    "Grundat av Pontus Granborg — senior lösningsarkitekt med 20+ års erfarenhet av industriell verksamhet, ERP-system och AI-native utveckling. Varje uppdrag är seniorlett och backat av ett globalt leveransteam. Ni vet alltid vem som ansvarar."
                  )}
                </p>
                <p style={{ marginTop: 24, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d }}>
                  {L("Contact CEO Pontus Granborg", "Kontakta VD Pontus Granborg")}
                </p>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                  <a href="tel:+46700901706" style={{ fontSize: 14, color: ac, fontWeight: 600 }}>070-090 17 06</a>
                  <span style={{ color: d }}>·</span>
                  <a href="https://www.linkedin.com/in/pontusgranborg" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: ac, fontWeight: 600 }}>LinkedIn ↗</a>
                  <span style={{ color: d }}>·</span>
                  <span style={{ fontSize: 14, color: d }}>Stockholm, Sweden</span>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ borderTop: bdr }}>
          <div className="cfx-split">
            <div style={{ padding: `clamp(40px,5vw,64px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("Contact", "Kontakt")}</Label>
                <H2>{L("Book a free review.", "Boka en kostnadsfri genomgång.")}</H2>
                <p style={{ marginTop: 16, fontSize: 15, color: d, lineHeight: 1.65 }}>
                  {L(
                    "Do you have a prototype you want to take to production? Or are you considering starting? We'll go through where it's worth investing — 45 min, no commitment.",
                    "Har ni en prototyp ni vill ta till produktion? Eller funderar ni på att börja? Vi går igenom var det är värt att satsa — 45 min, inget åtagande."
                  )}
                </p>
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Email", val: "info@cloudfox.se", href: "mailto:info@cloudfox.se" },
                    { label: L("Phone", "Telefon"), val: "070-090 17 06", href: "tel:+46700901706" },
                    { label: "LinkedIn", val: "Pontus Granborg ↗", href: "https://www.linkedin.com/in/pontusgranborg" },
                  ].map(({ label, val, href }) => (
                    <div key={label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, width: 64 }}>{label}</span>
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontSize: 15, color: lt, fontWeight: 500 }}>{val}</a>
                    </div>
                  ))}
                </div>
              </R>
            </div>
            <div style={{ padding: `clamp(40px,5vw,64px) ${pad}` }}>
              <R delay={0.06}>
                {sent ? (
                  <div style={{ padding: "32px", background: "rgba(34,197,94,.05)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 4 }}>
                    <p style={{ fontSize: 18, fontWeight: 600, color: "#22C55E" }}>
                      {L("Thanks — we'll be in touch shortly.", "Tack — vi hör av oss inom kort.")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { key: "name", placeholder: L("Your name", "Ditt namn"), type: "text" },
                      { key: "email", placeholder: L("Your email", "Din e-post"), type: "email" },
                    ].map(({ key, placeholder, type }) => (
                      <input key={key} type={type} placeholder={placeholder} required value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="cfx-input" />
                    ))}
                    <textarea
                      placeholder={L(
                        "Brief about you — have you already built prototypes or are you considering starting?",
                        "Kort om er — har ni redan byggt prototyper eller funderar ni på att börja?"
                      )}
                      required rows={5} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="cfx-input" style={{ resize: "vertical" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 4 }}>
                      <button type="submit" className="cfx-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                        {L("Send", "Skicka")} →
                      </button>
                      <span style={{ fontSize: 13, color: d }}>{L("No commitment.", "Inget åtagande.")}</span>
                    </div>
                  </form>
                )}
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: bdr, marginTop: "clamp(3rem,5vw,6rem)" }}>
        <div style={{ padding: `40px ${pad} 28px` }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
            <div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-.05em" }}>cloudfox<span style={{ color: ac }}>.</span></div>
              <p style={{ marginTop: 10, fontSize: 13, color: d, maxWidth: "22em", lineHeight: 1.6 }}>
                {L("Enterprise AI for Swedish SME. Delivered. Integrated. Operated. Stockholm.", "Enterprise AI för svensk SME. Levererat. Integrerat. Drift-ansvarigt. Stockholm.")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 48 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 14 }}>{L("Navigate", "Navigera")}</div>
                {[
                  { label: L("How it works", "Så fungerar det"), href: "#offerings" },
                  { label: L("What can be built", "Vad kan byggas"), href: "#examples" },
                  { label: L("Why Cloudfox", "Varför Cloudfox"), href: "#why" },
                  { label: L("Contact", "Kontakt"), href: "#contact" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>{link.label}</a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 14 }}>{L("Contact", "Kontakt")}</div>
                <a href="mailto:info@cloudfox.se" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>info@cloudfox.se</a>
                <a href="tel:+46700901706" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>070-090 17 06</a>
                <a href="https://www.linkedin.com/company/cloudfox-group/" target="_blank" rel="noreferrer" style={{ display: "block", fontSize: 14, color: m }}>LinkedIn ↗</a>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: d }}>© {new Date().getFullYear()} Cloudfox AB</span>
            <span style={{ fontSize: 12, color: d }}>{L("Enterprise AI for Swedish SME.", "Enterprise AI för svensk SME.")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
