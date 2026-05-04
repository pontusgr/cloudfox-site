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
      title: "Inget vendor lock-in",
      text: "Ni äger koden, miljön och besluten. Vi har djup i båda AI-stackarna som faktiskt spelar roll för svensk SME — Microsoft och Anthropic — men inget intresse av att låsa er till någondera. Vi väljer rätt verktyg per problem.",
    },
    {
      title: "Ert team bygger, vi gör det produktionsdugligt",
      text: "Marknadschefen bygger i Lovable. Inköp vibar i Claude. Vi tar prototyperna till produktion — säkerhet, integrationer, deployment. Ni äger koden från dag ett. Vi är inte grindvakter, vi är acceleratorn.",
    },
    {
      title: "Driftsansvar",
      text: "När en vibe-codad app går sönder klockan 22 på lördag finns det inte alltid någon att ringa. Det finns hos oss. En partner från idé till drift — manuell kodgranskning före leverans, övervakning efter, namngiven kontakt när något händer.",
    },
  ] : [
    {
      title: "No vendor lock-in",
      text: "You own the code, the environment and the decisions. We have depth in both AI stacks that actually matter for Swedish SMEs — Microsoft and Anthropic — but no interest in locking you into either. We choose the right tool per problem.",
    },
    {
      title: "Your team builds, we make it production-ready",
      text: "Your marketing manager is building in Lovable. Procurement is vibing in Claude. We take the prototypes to production — security, integrations, deployment. You own the code from day one. We're not gatekeepers, we're the accelerator.",
    },
    {
      title: "Operational accountability",
      text: "When a vibe-coded app breaks at 10pm on a Saturday, there isn't always someone to call. There is with us. A partner from idea to operations — manual code review before delivery, monitoring after, named contact when something happens.",
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
                <>AI on your terms.<br />You build the prototype.<br />We make it <span style={{ color: ac }}>secure in production.</span></>,
                <>AI på era villkor.<br />Ni bygger prototypen.<br />Vi gör den <span style={{ color: ac }}>säker i produktion.</span></>
              )}
            </h1>
          </R>
          <R delay={0.1}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7, color: m, maxWidth: "46em" }}>
              {L(
                "Your marketing manager is building in Lovable. Procurement is vibing in Claude. But the prototypes get stuck: no safe deployment, no integration, no one accountable for operations. Bridging that gap takes AI expertise and budgets Swedish SMEs rarely have.",
                "Marknadschefen bygger i Lovable. Inköp vibar i Claude. Men prototyperna fastnar: ingen säker driftsättning, ingen integration, ingen som ansvarar för driften. Att överbrygga gapet kräver AI-expertis och budgetar svenska SME sällan har."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <p style={{ marginTop: 16, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 600, color: lt }}>
              {L("That is why we created Cloudfox.", "Därför har vi skapat Cloudfox.")}
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
            <H2>{L("Three steps from idea to operations.", "Tre steg från idé till drift.")}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "A connected journey from idea to operations — three steps, three clear handoffs of responsibility.",
                "En sammanhängande resa från idé till drift — tre tydliga steg, tre tydliga ansvarsskiften."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cfx-g3">
            {(lang === "sv" ? [
              {
                n: "01",
                title: "Prototyp",
                summary: "Vi sätter upp grunden",
                bullets: [
                  "Claude Code + Supabase eller Microsoft Power Apps Vibe + Dataverse",
                  "Förkonfigurerad AI, datamodell och mock-APIs för er bransch och era processer",
                  "Kostnadsskydd: budget-caps och kostnads-övervakning från dag ett",
                  "Halv dags utbildning för ert team",
                  "Löpande stöd inom både utveckling och verksamhet",
                ],
                tail: "Fast pris: 15 000–25 000 kr",
              },
              {
                n: "02",
                title: "Produktion",
                summary: "Vi tar prototypen till produktion",
                bullets: [
                  "Säkerhetsgranskning av koden — OWASP, auth, secrets management",
                  "Kodgranskning och optimering — prestanda, kvalitet, underhållbarhet",
                  "Integrationer med era befintliga system — ERP, SSO, dataflöden",
                  "Deployment till miljön ni föredrar (Azure, AWS eller annan moln-miljö)",
                  "Dokumentation och överlämning — kod, arkitektur, körinstruktioner",
                ],
                tail: "Från 50 000 kr",
              },
              {
                n: "03",
                title: "Drift",
                summary: "Vi tar driftsansvaret",
                bullets: [
                  "Hosting i er moln-miljö (Azure, AWS eller annan)",
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
                title: "Prototype",
                summary: "We set up the foundation",
                bullets: [
                  "Claude Code + Supabase or Microsoft Power Apps Vibe + Dataverse",
                  "Preconfigured AI, data model and mock APIs for your industry and processes",
                  "Cost guardrails: budget caps and spend monitoring from day one",
                  "Half-day training for your team",
                  "Ongoing support across development and business operations",
                ],
                tail: "Fixed price: 15,000–25,000 SEK",
              },
              {
                n: "02",
                title: "Production",
                summary: "We take the prototype to production",
                bullets: [
                  "Security review of the code — OWASP, auth, secrets management",
                  "Code review and optimization — performance, quality, maintainability",
                  "Integrations with your existing systems — ERP, SSO, data flows",
                  "Deployment to your preferred environment (Azure, AWS or other cloud)",
                  "Documentation and handoff — code, architecture, operating instructions",
                ],
                tail: "From 50,000 SEK",
              },
              {
                n: "03",
                title: "Operations",
                summary: "We take operational accountability",
                bullets: [
                  "Hosting in your cloud environment (Azure, AWS or other)",
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
            <Label>{L("What can be built", "Vad kan byggas")}</Label>
            <H2>{L("Examples your team can prototype.", "Exempel ert team kan prototypa.")}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "Anything below follows the same journey: your team prototypes, we take it to production, we run it. The list is just examples — we'll happily help you find the right use cases for your industry and needs.",
                "Allt nedan följer samma resa: ert team prototypar, vi tar till produktion, vi kör driften. Listan är bara exempel och vi hjälper er gärna hitta use-case utifrån er bransch och behov."
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
              { title: "Kvalitetsavvikelser", desc: "Registrera, klassificera och spåra åtgärder" },
              { title: "Lead-kvalificeringsagent", desc: "Analyserar inbound, kvalificerar och bokar möten" },
              { title: "Leverantörsbedömning", desc: "Risk, prestanda och dokumenthantering" },
              { title: "Research-agent", desc: "Konkurrent- och marknadsintel, summerar och rapporterar" },
              { title: "ROI-kalkylator", desc: "Interaktiv på er webbsida som kvalificerar leads" },
              { title: "Produktkonfigurator", desc: "Kunden bygger sitt offertunderlag själv" },
              { title: "Inköpsförfrågan & anbudsmatris", desc: "RFP-automation och leverantörsjämförelse" },
              { title: "Onboarding-flöde", desc: "Guide nyanställda genom första månaden" },
              { title: "Avtalsöversikt", desc: "AI extraherar villkor, deadlines och parter från PDF" },
              { title: "Field service-app", desc: "Tekniker rapporterar arbete från fält" },
              { title: "Audit & compliance", desc: "Krav, evidens och deadlines på ett ställe" },
              { title: "Kundservice-agent", desc: "Svarar på vanliga frågor, eskalerar komplexa" },
            ] : [
              { title: "Quality deviations", desc: "Log, classify and track corrective actions" },
              { title: "Lead qualification agent", desc: "Analyses inbound, qualifies leads and books meetings" },
              { title: "Supplier assessment", desc: "Risk, performance and document handling" },
              { title: "Research agent", desc: "Competitive and market intel, summarises and reports" },
              { title: "ROI calculator", desc: "Interactive on your website to qualify leads" },
              { title: "Product configurator", desc: "Customers build their own quote basis" },
              { title: "RFP & bid comparison", desc: "Procurement automation and supplier scoring" },
              { title: "Onboarding flow", desc: "Guide new hires through their first month" },
              { title: "Contract overview", desc: "AI extracts terms, deadlines and parties from PDF" },
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
                {L("AI partner for Swedish SME. Stockholm.", "AI-partner för svensk SME. Stockholm.")}
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
            <span style={{ fontSize: 12, color: d }}>{L("AI partner for Swedish SME.", "AI-partner för svensk SME.")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
