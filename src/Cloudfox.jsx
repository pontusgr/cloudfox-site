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
    { n: "01", title: "Strategisk analys", text: "Vi kartlägger vilka system ni hyr idag, vad de faktiskt kostar och var ett eget system ger bättre passform och lägre långsiktig kostnad." },
    { n: "02", title: "Leverans du äger", text: "Inom 2–4 veckor levereras en fungerande lösning — testad i er verkliga miljö, granskad av senior arkitekt och överlämnad med full äganderätt." },
    { n: "03", title: "Partner på lång sikt", text: "Vi finns kvar efter leverans. Support, underhåll och vidareutveckling — med en partner som redan känner er verksamhet." },
  ] : [
    { n: "01", title: "Strategic assessment", text: "We map which systems you rent today, what they actually cost and where owning a custom solution gives better fit and lower long-term cost." },
    { n: "02", title: "Delivery you own", text: "Within 2–4 weeks we deliver a working solution — tested in your real environment, reviewed by a senior architect and handed over with full ownership." },
    { n: "03", title: "Long-term partner", text: "We stay after delivery. Support, maintenance and further development — with a partner who already knows your business." },
  ];

  const solutions = lang === "sv" ? [
    { title: "Ersätt det ni hyr", text: "SaaS-abonnemang och ERP-moduler som kostar mer än de levererar. Bygg skräddarsydda system för hur ni faktiskt arbetar — som ni äger fullt ut.", tag: "Äganderätt" },
    { title: "Automatisera det manuella", text: "Processer som körs i e-post och Excel idag. Strukturera, automatisera och integrera — snabbt och utan att störa befintlig drift.", tag: "Automation" },
    { title: "Sluta leta i tre system", text: "Data som sitter i tre system och ingen samlad bild. Bygg den koppling eller det gränssnitt som ger er kontroll över hela flödet.", tag: "Integration" },
  ] : [
    { title: "Replace what you rent", text: "SaaS subscriptions and ERP modules that cost more than they deliver. Build custom systems for how you actually work — that you own outright.", tag: "Ownership" },
    { title: "Automate the manual", text: "Processes running in email and Excel today. Structure, automate and integrate — quickly and without disrupting existing operations.", tag: "Automation" },
    { title: "Stop searching three systems", text: "Data sitting in three systems with no unified view. Build the connection or interface that gives you control over the entire flow.", tag: "Integration" },
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
              {L("Book a strategic conversation", "Boka ett strategiskt samtal")}
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
            <Label>{L("Strategic advisory · AI‑native development", "Strategisk rådgivning · AI‑native utveckling")}</Label>
          </R>
          <R delay={0.04}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1.05 }}>
              {L("The cost of building custom software ", "Kostnaden för att bygga skräddarsydd mjukvara ")}
              <span style={{ color: ac }}>{L("has dropped over 80%.", "har sjunkit med över 80%.")}</span>
            </h1>
          </R>
          <R delay={0.08}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.65, color: m, maxWidth: "52em" }}>
              {L(
                "We help organisations understand what that means — and act on it. The build vs. buy equation has permanently shifted. A system built around how your business actually works outperforms a configured platform every time — and now it's within reach.",
                "Vi hjälper organisationer förstå vad det innebär — och agera på det. Build vs. buy-ekvationen har förändrats permanent. Ett system byggt kring hur er verksamhet faktiskt fungerar överträffar en konfigurerad plattform varje gång — och är nu inom räckhåll."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#contact"
                className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                {L("Book a strategic conversation", "Boka ett strategiskt samtal")} <span>→</span>
              </a>
              <a href="#how" className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: "transparent", color: lt, border: "1px solid rgba(255,255,255,.15)" }}>
                {L("How it works", "Så fungerar det")}
              </a>
            </div>
          </R>
        </div>
      </section>


      {/* ── THE SHIFT ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("The shift", "Skiftet")}</Label>
            <H2>{L("The build vs. buy equation has changed.", "Build vs. buy-ekvationen har förändrats.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: d, marginBottom: 20 }}>{L("Before", "Tidigare")}</div>
                {(lang === "sv" ? [
                  "Skräddarsydd mjukvara tog 6–12 månader",
                  "Kostnaden var för hög för de flesta bolag",
                  "Ni köpte en plattform och konfigurerade den",
                  "Ni levde med bristerna och fyllde gapen manuellt",
                  "Leverantören ägde er data och er process",
                ] : [
                  "Custom software took 6–12 months to deliver",
                  "The cost was prohibitive for most companies",
                  "You bought a platform and configured it to fit",
                  "You lived with the gaps and filled them manually",
                  "The vendor owned your data and your process",
                ]).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 16, lineHeight: 1.5 }}>✕</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: m }}>{item}</span>
                  </div>
                ))}
              </R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: ac, marginBottom: 20 }}>{L("Now", "Nu")}</div>
                {(lang === "sv" ? [
                  "AI-native utveckling levererar på 2–4 veckor",
                  "Kostnaden har sjunkit med över 80%",
                  "Ni bygger exakt det ni behöver — inget mer",
                  "Ni äger lösningen fullt ut, utan licensavgifter",
                  "Ni äger er data, er process och er konkurrensfördel",
                ] : [
                  "AI-native development delivers in 2–4 weeks",
                  "The cost has dropped by over 80%",
                  "You build exactly what you need — nothing more",
                  "You own the solution outright, no licence fees",
                  "You own your data, your process and your competitive advantage",
                ]).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ color: "#22C55E", fontWeight: 700, fontSize: 16, lineHeight: 1.5 }}>✓</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: lt }}>{item}</span>
                  </div>
                ))}
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER — merged solutions section with tags ── */}
      <section id="solutions" style={{ paddingTop: `clamp(6rem, 8vw, 9rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Solutions", "Lösningar")}</Label>
            <H2>{L("What is now possible to build.", "Vad som nu är möjligt att bygga.")}</H2>
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

      {/* ── HOW WE WORK — 3 phases ── */}
      <section id="how" style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("How we work", "Hur vi arbetar")}</Label>
            <H2>{L("From decision to ownership in three steps.", "Från beslut till äganderätt i tre steg.")}</H2>
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




      {/* ── WHO WE ARE ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("The team", "Teamet")}</Label>
                <H2>{L("Senior ERP specialists and developers.", "Seniora ERP-specialister och utvecklare.")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: m }}>
                  {L(
                    "Built to build it right. Founded by senior ERP specialists and developers — each with 10–25+ years of experience from real implementations. No junior hand-offs, no delegated responsibility.",
                    "Grundat för att bygga rätt. Ett team av seniora ERP-specialister och utvecklare — med 10–25+ års erfarenhet från verkliga implementationer. Inga junioröverlämnanden, inget delegerat ansvar."
                  )}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: m, marginTop: 16 }}>
                  {L("Want to know more? Contact ", "Vill du veta mer? Kontakta ")}
                  <span style={{ color: "#fff" }}>Pontus Granborg</span>
                  {" — "}
                  <a href="tel:+46700901706" style={{ color: ac }}>070-090 17 06</a>
                  {L(" · ", " · ")}
                  <a href="https://www.linkedin.com/in/pontusgranborg" target="_blank" rel="noopener noreferrer" style={{ color: ac }}>LinkedIn</a>
                </p>
              </R>
            </div>
          </div>
        </div>
      </section>


      {/* ── BUILD VS BUY ANALYSIS ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("Free offer", "Kostnadsfritt erbjudande")}</Label>
                <H2>{L("Build vs. Buy analysis.", "Build vs. Buy-analys.")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: m }}>
                  {L(
                    "We map what your current systems actually cost — licences, manual work and hidden gaps — and show you where owning a custom solution gives better fit at lower long-term cost. A structured analysis worth 15 000–20 000 SEK. At no cost to you.",
                    "Vi kartlägger vad era nuvarande system faktiskt kostar — licenser, manuellt arbete och dolda brister — och visar var ett eget system ger bättre passform till lägre långsiktig kostnad. Ett strukturerat underlag värt 15 000–20 000 kr. Utan kostnad för er."
                  )}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: d, marginTop: 14 }}>
                  {L("The analysis is offered to companies with at least one business system or SaaS subscription and a genuine interest in evaluating their options.", "Analysen riktar sig till bolag med minst ett affärssystem eller SaaS-abonnemang och ett genuint intresse av att utvärdera sin situation.")}
                </p>
                <a href="/analys" className="cx3-btn" style={{ display: "inline-block", marginTop: 24, padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                  {L("Learn more →", "Läs mer →")}
                </a>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact">
        <div style={{ borderTop: bdr, background: "rgba(79,127,255,.03)" }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(40px, 5vw, 64px) ${pad}`, borderRight: bdr }}>
              <R>
                <H2>{L("Book a strategic conversation.", "Boka ett strategiskt samtal.")}</H2>
                <p style={{ marginTop: 14, fontSize: 14, color: d }}>{L("No commitment. 30 minutes. We look at your specific situation.", "Inget åtagande. 30 minuter. Vi tittar på er specifika situation.")}</p>
                <p style={{ marginTop: 10, fontSize: 14, color: d }}>{L("Not satisfied with the result — full refund, no discussion.", "Inte nöjd med resultatet — full återbetalning, inga diskussioner.")}</p>
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
                    <textarea placeholder={L("What systems are you currently renting that could be replaced?", "Vilka system hyr ni idag som skulle kunna ersättas?")} required rows={4} value={form.message}
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
                  "Strategic advisory and AI-native delivery. Based in Stockholm.",
                  "Strategisk rådgivning och AI-native leverans. Baserat i Stockholm."
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
            <span style={{ fontSize: 12, color: d }}>{L("Strategic advisory and AI-native delivery.", "Strategisk rådgivning och AI-native leverans.")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
