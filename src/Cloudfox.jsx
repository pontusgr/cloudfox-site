import { useState, useEffect, useRef } from "react";

function useReveal(th = 0.1) {
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
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(18px)", transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${delay}s, transform .5s cubic-bezier(.22,1,.36,1) ${delay}s` }}>{children}</div>;
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

  /* ── DATA ── */

  const phases = lang === "sv" ? [
    { n: "01", title: "Analys", text: "Vi hjälper er identifiera vad som faller utanför affärssystemet och vad det kostar er i tid och friktion varje dag." },
    { n: "02", title: "Första fungerande version", text: "Inom 2–4 veckor levereras en användbar version som valideras i verklig drift — inte i kravmöten." },
    { n: "03", title: "Löpande förbättring och support", text: "Vi hanterar support och underhåll i 12 månader och vidareutvecklar när verksamheten kräver det." },
  ] : [
    { n: "01", title: "Analysis", text: "We help you identify what falls outside your business system and what it costs you in time and friction every day." },
    { n: "02", title: "First working version", text: "Within 2–4 weeks we deliver a usable version validated in real operations — not in requirement meetings." },
    { n: "03", title: "Ongoing improvement & support", text: "We handle support and maintenance for 12 months and continue to develop as your business requires." },
  ];

  const pillars = lang === "sv" ? [
    { title: "Upp till 80% snabbare", text: "AI‑driven utveckling med senior arkitektur minskar leveranstiden kraftigt. Projekt som tar månader kan levereras på veckor." },
    { title: "Rätt lösning", text: "AI skriver koden. Vi förstår verksamheten. Det är skillnaden mellan något som fungerar i demo och något som fungerar i verkligheten." },
    { title: "Betala bara när du är nöjd", text: "Vi levererar i milstolpar. Du godkänner varje steg. Betalar bara när du är nöjd." },
  ] : [
    { title: "Up to 80% faster", text: "AI‑native development with senior architecture dramatically compresses delivery. Months become weeks." },
    { title: "The right solution", text: "AI writes the code. We understand the business. That is the difference between something that works in a demo and something that works in reality." },
    { title: "Pay only when satisfied", text: "We deliver in milestones. You approve each step. Pay only when you are satisfied." },
  ];

  /* Merged: "Engagements" + "What we build" → one strong section */
  const solutions = lang === "sv" ? [
    { title: "Manuella processer", text: "Vi ersätter manuella processer i e-post och Excel med strukturerade digitala flöden — med tydligt ägarskap och automatiska notifieringar.", tag: "Automation" },
    { title: "Affärssystemskompletteringar", text: "Praktiska applikationer runt affärssystemet för det standardsystemet inte täcker — godkännanden, rapportering, inköp, dokumenthantering.", tag: "Integration" },
    { title: "Rapportering och beslutsstöd", text: "Dashboards, automatiska rapporter och beslutsstöd som ger er rätt information vid rätt tidpunkt — utan manuell sammanställning.", tag: "Rapportering" },
  ] : [
    { title: "Manual processes", text: "We replace manual processes in email and Excel with structured digital flows — with clear ownership and automatic notifications.", tag: "Automation" },
    { title: "Business system extensions", text: "Practical applications around the business system for what it doesn't cover — approvals, reporting, procurement, document handling.", tag: "Integration" },
    { title: "Reporting & decision support", text: "Dashboards, automatic reports and decision support that give you the right information at the right time — without manual compilation.", tag: "Reporting" },
  ];

  const quality = lang === "sv" ? [
    {
      icon: "🔍",
      title: "Säkerhetsgranskning",
      text: "Vi tar ansvar för att koden är säker — inte bara att den fungerar. All levererad kod granskas mot OWASP-standarder och kända sårbarheter innan ni driftsätter. Ni ska veta exakt vad ni sätter i produktion.",
    },
    {
      icon: "✅",
      title: "Testtäckning och driftsäkerhet",
      text: "Fungerande kod och testbar kod är inte samma sak. Vi säkerställer att applikationen håller när verksamheten belastar den — med automatiserade tester och validering på riktiga data, inte bara i en demo-miljö.",
    },
    {
      icon: "🏗️",
      title: "Rätt byggd från start",
      text: "AI gör det ni ber om — inte alltid det ni borde be om. Vi designar och validerar strukturen så att systemet är enkelt att förvalta och bygga vidare på.",
    },
  ] : [
    {
      icon: "🔍",
      title: "Security review",
      text: "AI writes code fast — not always securely. We review all delivered code against known security risks and OWASP standards before you go live. You should never have to blindly trust code you can't control.",
    },
    {
      icon: "✅",
      title: "Test coverage & reliability",
      text: "Working code and tested code are not the same thing. We ensure the application holds up under real operational load — with automated tests and validation on real data, not just in a demo environment.",
    },
    {
      icon: "🏗️",
      title: "Built right from the start",
      text: "AI does what you ask — not always what you should ask for. We design and validate the structure so the system is easy to maintain and build on.",
    },
  ];

  const deliverables = lang === "sv" ? [
    { icon: "💻", text: "Ni äger lösningen helt och hållet" },
    { icon: "📄", text: "Teknisk dokumentation och driftsinstruktioner" },
    { icon: "🧪", text: "Automatiserade tester och testmiljö" },
    { icon: "🔒", text: "Säkerhetsgranskningsrapport" },
    { icon: "🚀", text: "Driftsatt lösning i er miljö" },
    { icon: "🤝", text: "12 månaders support efter leverans" },
    { icon: "🔧", text: "Löpande support och underhåll — vi finns kvar när ni behöver oss" },
  ] : [
    { icon: "💻", text: "You own the solution completely" },
    { icon: "📄", text: "Technical documentation and operating instructions" },
    { icon: "🧪", text: "Automated tests and test environment" },
    { icon: "🔒", text: "Security review report" },
    { icon: "🚀", text: "Deployed solution in your environment" },
    { icon: "🤝", text: "12 months of post-delivery support" },
    { icon: "🔧", text: "Ongoing support and maintenance — we're there when you need us" },
  ];

  const faq = lang === "sv" ? [
    {
      q: "Passar det här för oss?",
      a: "Ni passar bra om ni har en operativ process som idag körs i Excel, e-post eller separata system — och vet att den borde vara automatiserad men aldrig fått det att hända. Kanske för att det känts för dyrt, för komplext eller för tidskrävande att upphandla. Vi löser exakt det, utan ett halvårslångt konsultprojekt. Vi arbetar främst med operativa bolag i storleksordningen 50–500 anställda.",
    },
    {
      q: "Vilken teknik använder ni?",
      a: "Vi utvecklar med Claude Code — Anthropics AI-verktyg för professionell mjukvaruutveckling — vilket ger oss den leveranshastighet vi lovar. Koden driftsätts i er befintliga miljö: Azure, AWS, Google Cloud eller on-premise. Vi integrerar mot de system ni redan har — affärssystem som Business Central och SAP, databaser, API:er och interna verktyg. Ni slipper byta plattform eller låsa er till ny infrastruktur. All kod testas med automatiserade tester som körs mot er verkliga datamiljö — inte en isolerad demo — och granskas av senior arkitekt innan leverans.",
    },
    {
      q: "Vem äger lösningen efter leverans?",
      a: "Ni. Lösningen överlämnas fullständigt vid godkänd leverans. Inga licensavgifter, ingen inlåsning, inga dolda beroenden mot oss.",
    },
    {
      q: "Vad händer om vi vill ha ändringar efter leverans?",
      a: "Support och underhåll ingår i 12 månader efter leverans. Vidareutveckling hanteras som nya uppdrag och går snabbt eftersom vi redan känner er miljö och lösning.",
    },
    {
      q: "Hur fungerar betalmodellen i praktiken?",
      a: "Vi levererar i överenskomna milstolpar. Ni testar i er verkliga miljö och godkänner leveransen. Om ni inte är nöjda med slutresultatet betalar ni ingenting — full återbetalning, inga diskussioner. Vi tar den risken för att vi vet att vi levererar.",
    },
  ] : [
    {
      q: "Is this right for us?",
      a: "You're a good fit if you have an operational process currently running in Excel, email or disconnected systems — and know it should be automated but it's never happened. Maybe because it felt too expensive, too complex or too slow to procure. That's exactly what we solve, without a six-month consulting project. We primarily work with operational companies in the 50–500 employee range.",
    },
    {
      q: "What technology do you use?",
      a: "We develop using Claude Code — Anthropic's AI tool for professional software development — which gives us the delivery speed we promise. The code is deployed in your existing environment: Azure, AWS, Google Cloud or on-premise. We integrate with the systems you already have — business systems like Business Central and SAP, databases, APIs and internal tools. No platform migration, no new infrastructure lock-in. All code is tested with automated tests running against your real data environment — not an isolated demo — and reviewed by a senior architect before delivery.",
    },
    {
      q: "Who owns the solution after delivery?",
      a: "You do. The solution is handed over completely at approved delivery. No licence fees, no lock-in, no hidden dependencies on us.",
    },
    {
      q: "What if we want changes after delivery?",
      a: "Support and maintenance is included for 12 months after delivery. Further development is handled as new engagements and moves quickly since we already know your environment and solution.",
    },
    {
      q: "How does the payment model work in practice?",
      a: "We deliver in agreed milestones. You test in your real environment and approve the delivery. If you're not satisfied with the final result, you pay nothing — full refund, no discussion. We take that risk because we know we deliver.",
    },
  ];


  useEffect(() => {
    if (document.getElementById("cf-f3")) return;
    const l = document.createElement("link"); l.id = "cf-f3"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = `
      .cx3{--a:#4F7FFF;--a2:#6B9AFF;--bg:#000;--s:'DM Sans',system-ui,sans-serif;font-family:var(--s);color:#fff}
      .cx3 *{box-sizing:border-box;margin:0}.cx3 a{color:inherit;text-decoration:none}
      .cx3-card{transition:transform .3s ease,border-color .3s ease,background .3s ease}
      .cx3-card:hover{transform:translateY(-3px);border-color:rgba(79,127,255,.35);background:rgba(79,127,255,.03)}
      .cx3-g3{display:grid;grid-template-columns:1fr;gap:0}
      @media(min-width:768px){.cx3-g3{grid-template-columns:repeat(3,1fr)}}
      .cx3-split{display:grid;grid-template-columns:1fr;gap:2rem}
      @media(min-width:900px){.cx3-split{grid-template-columns:2fr 3fr;gap:0;align-items:start}}
      .cx3-btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;border-radius:4px;font-family:var(--s);cursor:pointer;border:none}
      .cx3-btn:hover{filter:brightness(1.1)}
      .cx3-tag{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:3px;background:rgba(79,127,255,.1);color:#6B9AFF}
      @keyframes cx3-line{0%{width:0}100%{width:100%}}
      @media(min-width:768px){.cx3-nav-links{display:flex!important}}
    `;
    document.head.appendChild(s);
  }, []);

  const ac = "#4F7FFF";
  const m = "#9CA3AF";
  const d = "#6B7280";
  const lt = "#D1D5DB";
  const bdr = "1px solid rgba(255,255,255,.1)";
  const pad = "clamp(1.5rem, 6vw, 7rem)";

  const Label = ({ children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 36, height: 2, background: ac }} />
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: ac }}>{children}</span>
    </div>
  );

  const H2 = ({ children }) => (
    <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.05 }}>{children}</h2>
  );

  return (
    <div className="cx3" style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(0,0,0,.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: bdr }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, padding: `0 ${pad}` }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-.04em" }}>
            cloudfox<span style={{ color: ac }}>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {["sv", "en"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 10px", fontSize: 12, fontWeight: lang === l ? 700 : 400, textTransform: "uppercase",
                  background: "none", border: "none", cursor: "pointer", fontFamily: "var(--s)",
                  color: lang === l ? "#fff" : d, borderBottom: lang === l ? `2px solid ${ac}` : "2px solid transparent",
                }}>{l}</button>
              ))}
            </div>
            <a href="#contact"
              className="cx3-btn" style={{ fontSize: 13, padding: "8px 22px", background: ac, color: "#fff" }}>
              {L("Book a call", "Boka ett samtal")}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO with subtle graphic element ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Abstract grid pattern — right side */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "45%", opacity: 0.04, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(79,127,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(79,127,255,.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Gradient fade over grid */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "55%", background: "linear-gradient(90deg, #000 0%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", padding: `clamp(2.5rem, 5vw, 4rem) ${pad} clamp(3rem, 5vw, 4.5rem)` }}>
          <R>
            <Label>{L("Beyond your business system", "Där affärssystemet slutar")}</Label>
          </R>
          <R delay={0.04}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1.05 }}>
              {L("We build what your business system doesn't cover. ", "Vi bygger det affärssystemet inte täcker. ")}
              <span style={{ color: ac }}>{L("In weeks, not months.", "På veckor, inte månader.")}</span>
            </h1>
          </R>
          <R delay={0.08}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.65, color: m, maxWidth: "52em" }}>
              {L(
                "Most companies have processes that fall outside their business system — approval flows via email, deviation reports in Excel or manual purchasing processes. Previously it was too expensive to fix. AI-native development changed that. Now it takes weeks.",
                "De flesta företag har processer som faller utanför affärssystemet — godkännandeflöden via mail, avvikelserapporter i Excel eller manuella inköpsprocesser. Tidigare var det för dyrt att åtgärda. AI-native utveckling har förändrat det. Nu räcker det med veckor."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#contact"
                className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                {L("Book a call", "Boka ett samtal")} <span>→</span>
              </a>
              <a href="#how" className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: "transparent", color: lt, border: "1px solid rgba(255,255,255,.15)" }}>
                {L("How it works", "Så fungerar det")}
              </a>
            </div>
          </R>
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <R delay={0.16}>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {[
              { val: "2–4", label: L("Weeks to working solution", "Veckor till fungerande lösning") },
              { val: "80%", label: L("Faster than traditional consulting", "Snabbare än traditionellt konsultprojekt") },
              { val: "12 mån", label: L("Support & maintenance always included", "Support och underhåll ingår alltid") },
            ].map((s, i) => (
              <div key={i} style={{ padding: `clamp(24px, 3vw, 40px) ${pad}`, borderRight: i < 2 ? bdr : "none" }}>
                <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-.04em", color: ac, lineHeight: 1 }}>{s.val}</div>
                <div style={{ marginTop: 6, fontSize: 14, color: m }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </R>

      {/* ── HOW WE WORK — 3 phases ── */}
      <section id="how" style={{ paddingTop: `clamp(3rem, 5vw, 5rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("How we work", "Hur vi arbetar")}</Label>
            <H2>{L("From gap to working solution in three steps.", "Från gap till fungerande lösning i tre steg.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {phases.map((p, i) => (
              <R key={p.n} delay={i * 0.05}>
                <div className="cx3-card" style={{ padding: `clamp(28px, 3vw, 44px) ${pad}`, borderRight: i < 2 ? bdr : "none", borderColor: "rgba(255,255,255,.1)", height: "100%" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ac }}>{p.n}</span>
                  <h3 style={{ marginTop: 14, fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{p.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: m }}>{p.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER — merged solutions section with tags ── */}
      <section id="solutions" style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Solutions", "Lösningar")}</Label>
            <H2>{L("Three types of gaps we solve.", "Tre typer av gap vi löser.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {solutions.map((s, i) => (
              <R key={s.title} delay={i * 0.05}>
                <div className="cx3-card" style={{ padding: `clamp(28px, 3vw, 44px) ${pad}`, borderRight: i < 2 ? bdr : "none", borderColor: "rgba(255,255,255,.1)", height: "100%", display: "flex", flexDirection: "column" }}>
                  <span className="cx3-tag">{s.tag}</span>
                  <h3 style={{ marginTop: 14, fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{s.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: m, flex: 1 }}>{s.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY & SECURITY ── */}
      <section id="quality" style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Quality & security", "Trygghet")}</Label>
            <H2>{L("Fast delivery that you can trust.", "Snabb leverans som ni kan lita på.")}</H2>
            <p style={{ marginTop: 16, fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight: 1.65, color: m, maxWidth: "52em" }}>
              {L(
                "AI accelerates development — we add what makes a delivery production‑ready. Security review, test coverage and architectural validation are included in every engagement as standard.",
                "AI accelererar utvecklingen — vi kompletterar med det som gör leveransen produktionsklar. Säkerhetsgranskning, testtäckning och arkitekturvalidering ingår i varje uppdrag som standard."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {quality.map((q, i) => (
              <R key={q.title} delay={i * 0.05}>
                <div className="cx3-card" style={{ padding: `clamp(28px, 3vw, 44px) ${pad}`, borderRight: i < 2 ? bdr : "none", borderColor: "rgba(255,255,255,.1)", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{q.icon}</div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{q.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.65, color: m }}>{q.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS MODEL ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R><H2>{L("The business model.", "Affärsmodellen.")}</H2></R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {pillars.map((p, i) => (
              <R key={p.title} delay={i * 0.05}>
                <div className="cx3-card" style={{ padding: `clamp(28px, 3vw, 44px) ${pad}`, borderRight: i < 2 ? bdr : "none", borderColor: "rgba(255,255,255,.1)", height: "100%" }}>
                  <h3 style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{p.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: m }}>{p.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── SENIOR‑LED — split ── */}
      <section>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R><H2>{L("The third partner.", "Det tredje partnerskapet.")}</H2></R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: m }}>
                  {L(
                    "Most SMEs have an IT partner and a business system partner. Nobody owns the gap between them — the processes that fall outside the system and end up in Excel. That is the problem we exist to solve. Every engagement is led by a senior solution architect with 20+ years of business system and operational experience.",
                    "De flesta SME-bolag har en IT-partner och en affärssystemspartner. Ingen äger gapet däremellan — processerna som faller utanför systemet och hamnar i Excel. Det är det problemet vi finns för att lösa. Varje uppdrag leds av en senior lösningsarkitekt med 20+ års erfarenhet av affärssystem och verksamhetsutveckling."
                  )}
                </p>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("What's included", "Vad ingår")}</Label>
                <H2>{L("Everything you need to go live.", "Allt ni behöver för att gå live.")}</H2>
                <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.65, color: m }}>
                  {L(
                    "Every engagement includes full handover — no hidden extras, no dependencies on us after delivery.",
                    "Varje uppdrag inkluderar fullständig överlämning — inga dolda tilläggsavgifter, inga beroenden mot oss efter leverans."
                  )}
                </p>
              </R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              {deliverables.map((d2, i) => (
                <R key={i} delay={i * 0.04}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < deliverables.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ fontSize: 20 }}>{d2.icon}</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: lt }}>{d2.text}</span>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("Who we are", "Vilka vi är")}</Label>
                <H2>{L("Founded by a builder.", "Grundat av en byggare.")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: m }}>
                  {L(
                    "Cloudfox was founded by Pontus Granborg with 20+ years of experience as a solution architect in CRM, cloud, data and business systems. Previously co-founded Email Systems — acquired by Webroot in 2011 — and LAGAochDUKA, one of Sweden's leading e-commerce stores for kitchen and design, acquired in 2017. That experience of building things that actually work in production is what we bring to every engagement.",
                    "Cloudfox grundades av Pontus Granborg med över 20 års erfarenhet som lösningsarkitekt inom CRM, cloud, data och affärssystem. Tidigare med-grundare av Email Systems — förvärvat av Webroot 2011 — och LAGAochDUKA, en av Sveriges ledande e-handlare inom kök och design, förvärvat 2017. Erfarenheten av att bygga saker som faktiskt håller i skarp drift är det vi tar med oss in i varje uppdrag."
                  )}
                </p>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>FAQ</Label>
            <H2>{L("Common questions.", "Vanliga frågor.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          {faq.map((item, i) => (
            <R key={i} delay={i * 0.03}>
              <div style={{ padding: `clamp(20px, 2.5vw, 32px) ${pad}`, borderBottom: i < faq.length - 1 ? bdr : "none" }}>
                <div style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 700, color: "#fff", marginBottom: 10 }}>{item.q}</div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: m, maxWidth: "72ch" }}>{item.a}</p>
              </div>
            </R>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact">
        <div style={{ borderTop: bdr, background: "rgba(79,127,255,.03)" }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(40px, 5vw, 64px) ${pad}`, borderRight: bdr }}>
              <R>
                <H2>{L("Book a call.", "Boka ett samtal.")}</H2>
                <p style={{ marginTop: 14, fontSize: 14, color: d }}>{L("No commitment. 30 minutes.", "Inget åtagande. 30 minuter.")}</p>
              </R>
            </div>
            <div style={{ padding: `clamp(40px, 5vw, 64px) ${pad}` }}>
              <R delay={0.05}>
                {sent ? (
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
                    {L("Thanks! We'll be in touch shortly.", "Tack! Vi hör av oss inom kort.")}
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { key: "name", placeholder: L("Your name", "Ditt namn"), type: "text" },
                      { key: "email", placeholder: L("Your email", "Din e-post"), type: "email" },
                    ].map(({ key, placeholder, type }) => (
                      <input key={key} type={type} placeholder={placeholder} required value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 15, fontFamily: "var(--s)", outline: "none", width: "100%" }} />
                    ))}
                    <textarea placeholder={L("What do you want to improve?", "Vad vill du förbättra?")} required rows={4} value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 15, fontFamily: "var(--s)", outline: "none", width: "100%", resize: "vertical" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      <button type="submit" className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                        {L("Send", "Skicka")} <span>→</span>
                      </button>
                      <a href="mailto:info@cloudfox.se" style={{ fontSize: 13, color: d }}>info@cloudfox.se</a>
                    </div>
                  </form>
                )}
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER — expanded ── */}
      <footer style={{ borderTop: bdr }}>
        <div style={{ padding: `40px ${pad} 24px` }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
            {/* Left: brand */}
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-.04em" }}>
                cloudfox<span style={{ color: ac }}>.</span>
              </div>
              <p style={{ marginTop: 8, fontSize: 13, color: d, maxWidth: "24em", lineHeight: 1.5 }}>
                {L(
                  "We build what your business system doesn't cover. Based in Stockholm.",
                  "Vi bygger det affärssystemet inte täcker. Baserat i Stockholm."
                )}
              </p>
            </div>
            {/* Right: links */}
            <div style={{ display: "flex", gap: 48 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 12 }}>{L("Navigate", "Navigera")}</div>
                {[
                  { label: L("How we work", "Hur vi arbetar"), href: "#how" },
                  { label: L("Solutions", "Lösningar"), href: "#solutions" },
                  { label: L("Quality & security", "Trygghet"), href: "#quality" },
                  { label: "FAQ", href: "#faq" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>{link.label}</a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 12 }}>{L("Connect", "Kontakt")}</div>
                <a href="https://www.linkedin.com/company/cloudfox-group/" target="_blank" rel="noreferrer" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>LinkedIn ↗</a>
                <a href="mailto:info@cloudfox.se" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>info@cloudfox.se</a>
                <span style={{ display: "block", fontSize: 14, color: m }}>Stockholm, Sweden</span>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: d }}>© {new Date().getFullYear()} Cloudfox</span>
            <span style={{ fontSize: 12, color: d }}>{L("We build what your business system doesn't cover.", "Vi bygger det affärssystemet inte täcker.")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
