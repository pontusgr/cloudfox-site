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
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
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

  const L = (en, sv) => (lang === "sv" ? sv : en);

  useEffect(() => {
    if (document.getElementById("cf-fonts-v2")) return;
    const l = document.createElement("link");
    l.id = "cf-fonts-v2";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&display=swap";
    document.head.appendChild(l);

    const s = document.createElement("style");
    s.id = "cf-styles-v2";
    s.textContent = `
      :root{
        --bg:#F2EDE3;
        --surface:#E8E1D3;
        --ink:#0E0E0C;
        --ink-2:#3A332B;
        --muted:#76706A;
        --line:#CFC4B0;
        --accent:#A04A2A;
        --accent-2:#7A3618;
      }
      .cfx{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}
      .cfx *{box-sizing:border-box;margin:0}
      .cfx a{color:inherit;text-decoration:none}
      .cfx-display{font-family:'Fraunces',Georgia,serif;font-weight:400;letter-spacing:-.025em}
      .cfx-btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-weight:500;cursor:pointer;border:none;transition:background .2s ease, color .2s ease}
      .cfx-btn-primary{background:var(--ink);color:var(--bg);padding:16px 28px;font-size:15px}
      .cfx-btn-primary:hover{background:var(--accent);color:var(--bg)}
      .cfx-btn-ghost{background:transparent;color:var(--ink);padding:14px 0;font-size:14px;border-bottom:1px solid var(--ink)}
      .cfx-btn-ghost:hover{color:var(--accent);border-color:var(--accent)}
      .cfx-eyebrow{display:inline-flex;align-items:center;gap:14px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
      .cfx-eyebrow::before{content:"";display:inline-block;width:32px;height:1px;background:var(--accent)}
      .cfx-input{background:transparent;border:none;border-bottom:1px solid var(--line);padding:14px 0;color:var(--ink);font-family:'Inter',sans-serif;font-size:16px;outline:none;width:100%;transition:border-color .2s}
      .cfx-input::placeholder{color:var(--muted)}
      .cfx-input:focus{border-color:var(--ink)}
      .cfx-g2{display:grid;grid-template-columns:1fr;gap:0}
      @media(min-width:900px){.cfx-g2{grid-template-columns:repeat(2,1fr)}}
      .cfx-g3{display:grid;grid-template-columns:1fr;gap:0}
      @media(min-width:900px){.cfx-g3{grid-template-columns:repeat(3,1fr)}}
      .cfx-usecase{padding:36px 32px;border-top:1px solid var(--line);border-left:1px solid var(--line);transition:background .25s,color .25s}
      .cfx-usecase:hover{background:var(--ink);color:var(--bg)}
      .cfx-usecase:hover .cfx-uc-num{color:var(--accent)}
      .cfx-usecase:hover .cfx-uc-text{color:rgba(242,237,227,.7)}
      .cfx-uc-num{font-family:'Fraunces',serif;font-size:14px;color:var(--accent);letter-spacing:.05em;transition:color .25s}
      .cfx-uc-text{color:var(--muted);transition:color .25s}
      .cfx-lang button{cursor:pointer;border:none;background:none;font-family:'Inter',sans-serif;padding:6px 0;font-size:12px;letter-spacing:.1em;text-transform:uppercase}
      .cfx-fade-line{height:1px;background:linear-gradient(90deg,transparent 0%,var(--line) 20%,var(--line) 80%,transparent 100%)}
      .cfx-spectrum-endpoints{display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:24px}
      .cfx-spectrum-track{position:relative;height:1px;background:var(--line);margin:0 0 56px 0}
      .cfx-spectrum-dot{position:absolute;top:-7px;width:14px;height:14px;border-radius:50%;background:var(--ink)}
      .cfx-spectrum-grid{display:grid;grid-template-columns:1fr;gap:48px}
      @media(min-width:900px){.cfx-spectrum-grid{grid-template-columns:repeat(3,1fr);gap:clamp(2rem,4vw,4rem)}}
      .cfx-spectrum-const{margin-top:80px;padding:48px clamp(1.5rem,4vw,3rem);border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-align:center}
    `;
    document.head.appendChild(s);
  }, []);

  const pad = "clamp(1.5rem, 6vw, 8rem)";

  const useCases = lang === "sv"
    ? [
        {
          num: "01",
          title: "Avtalskontroll — avtal vs fakturerat",
          text: "Rabattstegar, bonusar och prislistor bor i avtalen — men ingen kontrollerar att det som faktureras stämmer mot villkoren. Agenten läser era avtal, diffar mot fakturaraderna och listar avvikelserna i kronor. Diagnosen betalar ofta sig själv.",
        },
        {
          num: "02",
          title: "Leverantörs- & kunddokumentation",
          text: "Certifikat, intyg och specifikationer jagas via mail — och dokumentationspaket till kund byggs för hand. Agenten tar emot, läser, validerar i flera lager och sammanställer kompletta dossierer. Längst kommen av alla — pilot kan starta direkt.",
        },
        {
          num: "03",
          title: "Ofakturerat-detektorn",
          text: "Material hämtat, timmar arbetade, tillägg utförda — men aldrig fakturerade. Agenten korsar inköp och tid mot order och flaggar det som saknas på fakturan. Rent marginalläckage, mätbart från dag ett.",
        },
        {
          num: "04",
          title: "Garantier, skador & reklamationer",
          text: "Garantianspråk, godsskador och reklamationer drivs i mail — och avslås på formalia. Agenten skapar ärendet, bygger komplett underlag och bevakar tills ersättningen kommit.",
        },
        {
          num: "05",
          title: "Offert ur mailkorgen",
          text: "Förfrågningar med ritningar och specar tar dagar att bereda — snabbast med rätt pris vinner. Agenten tolkar förfrågan, bygger kalkylunderlag och föreslår pris ur er historik.",
        },
        {
          num: "06",
          title: "Indexering & prishöjningar",
          text: "Indexklausuler utnyttjas inte, och leverantörernas prisbrev når aldrig era kalkyler — marginalen eroderar tyst åt båda håll. Agenten läser klausuler och prisbrev, räknar och skapar justeringsunderlag.",
        },
        {
          num: "07",
          title: "Löneunderlag → lönesystem",
          text: "Tidrapporter kommer som Excel, foton och sms — och knappas in för hand varje månad. Agenten tolkar alla format, skapar lönerader för kontroll och rimlighetstestar körningen före lönedagen.",
        },
        {
          num: "08",
          title: "Frist- & certifikatbevakning",
          text: "Behörigheter, garantitider, besiktningar och certifikat bor i Excel — och upptäcks utgångna när det kostar. Agenten bygger register ur era dokument, bevakar frister och samlar revisionsbevis.",
        },
        {
          num: "09",
          title: "Beredskap & spårbarhet (CER/NIS2)",
          text: "Nya lagkrav kräver löpande riskbedömningar, leverantörskartläggning och spårbarhet. Agenten bygger flödet i er Microsoft-miljö — rapporteringsklart mot myndighet och kundkrav, istället för konsultrapporter och Excel.",
        },
        {
          num: "10",
          title: "Restorder- & leveransbevakning",
          text: "Försenade leveranser upptäcks av kunden — eller när produktionen står. Agenten läser orderbekräftelser, korsar mot behovsdatum och öppna kundordrar, och driver proaktiv åtgärd.",
        },
      ]
    : [
        {
          num: "01",
          title: "Contract check — agreed vs invoiced",
          text: "Rebate ladders, bonuses, and price lists live in contracts — but no one checks that what is invoiced matches the terms. The agent reads your contracts, diffs against invoice lines, and lists the deviations in money. The Diagnose often pays for itself.",
        },
        {
          num: "02",
          title: "Supplier & customer documentation",
          text: "Certificates, declarations, and specifications are chased by email — and customer documentation packages are built by hand. The agent receives, reads, validates in multiple layers, and assembles complete dossiers. This is where we've come furthest — a pilot can start immediately.",
        },
        {
          num: "03",
          title: "The unbilled detector",
          text: "Materials picked, hours worked, extras performed — but never invoiced. The agent cross-checks purchases and time against orders and flags what is missing from the invoice. Pure margin leakage, measurable from day one.",
        },
        {
          num: "04",
          title: "Warranties, damages & claims",
          text: "Warranty claims, transport damages, and complaints are run in email — and rejected on formalities. The agent creates the case, builds a complete file, and follows it until the money arrives.",
        },
        {
          num: "05",
          title: "Quotes from the inbox",
          text: "Inquiries with drawings and specs take days to prepare — fastest with the right price wins. The agent interprets the request, builds the costing basis, and suggests a price from your history.",
        },
        {
          num: "06",
          title: "Indexation & price increases",
          text: "Index clauses go unused, and supplier price letters never reach your costing — margin erodes silently in both directions. The agent reads clauses and price letters, calculates, and prepares adjustment material.",
        },
        {
          num: "07",
          title: "Payroll input → payroll system",
          text: "Time sheets arrive as Excel, photos, and texts — and are keyed in by hand every month. The agent interprets every format, creates payroll rows for review, and sanity-checks the run before payday.",
        },
        {
          num: "08",
          title: "Deadline & certificate monitoring",
          text: "Licenses, warranty periods, inspections, and certificates live in Excel — discovered expired when it hurts. The agent builds a register from your documents, monitors deadlines, and collects audit evidence.",
        },
        {
          num: "09",
          title: "Preparedness & traceability (CER/NIS2)",
          text: "New regulation requires continuous risk assessments, supplier mapping, and traceability. The agent builds the flow in your Microsoft environment — report-ready for authorities and customer demands, instead of consultant reports and Excel.",
        },
        {
          num: "10",
          title: "Backorder & delivery monitoring",
          text: "Late deliveries are discovered by the customer — or when production stops. The agent reads order confirmations, cross-checks against need dates and open customer orders, and drives proactive action.",
        },
      ];

  return (
    <div className="cfx">
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(242,237,227,.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: `0 ${pad}` }}>
          <div className="cfx-display" style={{ fontSize: "1.4rem", fontWeight: 500, letterSpacing: "-.02em" }}>
            cloudfox<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div className="cfx-lang" style={{ display: "flex", gap: 16 }}>
              {["sv", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    color: lang === l ? "var(--ink)" : "var(--muted)",
                    fontWeight: lang === l ? 600 : 400,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href="#contact" className="cfx-btn cfx-btn-ghost" style={{ fontSize: 13 }}>
              {L("Contact", "Kontakt")}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: `clamp(5rem,10vw,9rem) ${pad} clamp(4rem,7vw,7rem)`, position: "relative" }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 56 }}>
            {L("Your AI partner for mid-sized manufacturers and distributors", "Er AI-partner för medelstora industri- och grossistbolag")}
          </div>
        </R>
        <R delay={0.08}>
          <h1
            className="cfx-display"
            style={{
              fontSize: "clamp(2.4rem, 6.5vw, 5.6rem)",
              fontWeight: 400,
              lineHeight: 1.04,
              maxWidth: "20em",
              marginBottom: 48,
            }}
          >
            {L(
              <>We make AI work in production<span style={{ color: "var(--accent)" }}>.</span></>,
              <>Vi får AI att fungera i produktion<span style={{ color: "var(--accent)" }}>.</span></>
            )}
          </h1>
        </R>
        <R delay={0.16}>
          <p
            style={{
              fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
              lineHeight: 1.55,
              color: "var(--ink-2)",
              maxWidth: "34em",
              fontWeight: 400,
            }}
          >
            {L(
              <><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Our ready-to-run flows</strong> — 80 percent pre-built, the rest is your process — and hands-on work in your reality: your APIs, your systems, your people. Built with Claude Code in your Microsoft environment — <strong style={{ color: "var(--ink)", fontWeight: 600 }}>with application responsibility for the whole.</strong></>,
              <><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Våra startklara flöden</strong> — 80 procent färdigbyggda, resten är er process — och hands-on-arbete i er verklighet: era API:er, era system, era människor. Byggt med Claude Code i er Microsoft-miljö — <strong style={{ color: "var(--ink)", fontWeight: 600 }}>med applikationsansvar för helheten.</strong></>
            )}
          </p>
        </R>
        <R delay={0.24}>
          <div style={{ marginTop: 64, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#0E0E0C",
                color: "#F2EDE3",
                padding: "16px 28px",
                fontSize: 15,
                fontFamily: "'Inter',sans-serif",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background .2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#A04A2A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0E0E0C")}
            >
              {L("Book 30 min", "Boka 30 min")} <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
            </a>
            <a href="#floden" className="cfx-btn cfx-btn-ghost">
              {L("See the ten flows", "Se de tio flödena")}
            </a>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* USE CASES */}
      <section id="floden" style={{ padding: `clamp(5rem,9vw,8rem) 0 0 0` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 64 }}>
          <R>
            <div className="cfx-eyebrow" style={{ marginBottom: 32 }}>
              {L("What we build", "Vad vi bygger")}
            </div>
          </R>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06, maxWidth: "20em", marginBottom: 24 }}>
              {L(
                <>Ten ready-to-run AI flows — your version in production in 2–4 weeks.</>,
                <>Tio startklara AI-flöden — er version i produktion på 2–4 veckor.</>
              )}
            </h2>
          </R>
          <R delay={0.1}>
            <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "44em" }}>
              {L(
                <>Not finished products — but not a blank canvas either. <strong style={{ color: "var(--ink)" }}>The anatomy is already built</strong>: the API connections to your ERP, the reading of contracts and documents, the matching logic. That's why your version costs a fraction — <strong style={{ color: "var(--ink)" }}>fixed scope, fixed price</strong> — and the Diagnose adapts it to your contracts, your systems, and your rules.</>,
                <>Inga färdiga produkter — men ingen tom rityta heller. <strong style={{ color: "var(--ink)" }}>Anatomin är redan byggd</strong>: API-kopplingarna mot affärssystemet, läsningen av avtal och dokument, kontrollogiken. Därför kostar er version en bråkdel — <strong style={{ color: "var(--ink)" }}>fast omfattning, fast pris</strong> — och Diagnosen anpassar den till era avtal, era system och era regler.</>
              )}
            </p>
          </R>
        </div>
        <div style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", margin: `0 ${pad}` }}>
          <div className="cfx-g2">
            {useCases.map((uc, i) => (
              <R key={uc.num} delay={Math.min(i * 0.03, 0.3)}>
                <div className="cfx-usecase">
                  <div style={{ marginBottom: 24 }}>
                    <div className="cfx-uc-num">{uc.num}</div>
                  </div>
                  <h3
                    className="cfx-display"
                    style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}
                  >
                    {uc.title}
                  </h3>
                  <p className="cfx-uc-text" style={{ fontSize: 15, lineHeight: 1.65 }}>{uc.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
        <R delay={0.1}>
          <div style={{ padding: `56px ${pad} 0`, textAlign: "center" }}>
            <a
              href="#contact"
              className="cfx-display"
              style={{ display: "inline-block", fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)", lineHeight: 1.4, color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: 2, transition: "color .2s ease, border-color .2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            >
              {L(
                "Pick the flow that hurts most — book 30 minutes and we'll show you what your version would look like.",
                "Välj flödet som skaver mest — boka 30 min, så visar vi hur er version skulle se ut."
              )}
            </a>
            <p style={{ marginTop: 20, fontSize: "clamp(.95rem, 1.2vw, 1.05rem)", lineHeight: 1.65, color: "var(--ink-2)", maxWidth: "44em", marginLeft: "auto", marginRight: "auto" }}>
              {L(
                <>Flow not on the list? The ten are starting points, not the limit — <strong style={{ color: "var(--ink)" }}>we also build fully unique flows to your process</strong>, with the same pre-built components underneath.</>,
                <>Saknas ert flöde i listan? De tio är startpunkter, inte gränsen — <strong style={{ color: "var(--ink)" }}>vi bygger även helt unika flöden efter er process</strong>, med samma färdigbyggda komponenter i botten.</>
              )}
            </p>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* WHY NOW — FDE model, four hands-on parts */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Why now", "Varför nu")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06 }}>
              {L(
                <>AI isn't rolled out through licenses. It's built on site — inside the business.</>,
                <>AI rullas inte ut via licenser. Det byggs på plats — inne i verksamheten.</>
              )}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  <>Mid-sized manufacturers and distributors are <strong style={{ color: "var(--ink)" }}>stuck in the middle</strong>. The enterprise resources aren't there — no AI team, no transformation budget. Yet operations are too complex for the prototype-only approach that works for smaller companies. Succeeding with AI here takes structure: real integrations, real governance, real production.</>,
                  <>Medelstora industri- och grossistbolag sitter <strong style={{ color: "var(--ink)" }}>fast i mitten</strong>. Enterprise-resurserna finns inte — inget AI-team, ingen transformationsbudget. Samtidigt är verksamheten för komplex för den rena prototyp-vägen som fungerar för mindre bolag. Att lyckas med AI här kräver struktur: riktiga integrationer, riktig governance, riktig produktion.</>
                )}
              </p>
              <p style={{ color: "var(--ink)", fontWeight: 500 }}>
                {L(
                  <><strong style={{ color: "var(--ink)" }}>We bring the model to you</strong> — hands-on in four parts, until AI works in your production.</>,
                  <><strong style={{ color: "var(--ink)" }}>Vi tar modellen till er</strong> — hands-on i fyra delar, tills AI fungerar i er produktion.</>
                )}
              </p>
            </div>
          </R>
        </div>

        {/* FOUR HANDS-ON PARTS */}
        <div className="cfx-g2" style={{ marginTop: "clamp(4rem, 6vw, 5rem)", gap: "clamp(2.5rem, 4vw, 4rem)" }}>
          <R delay={0.1}>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>01 / {L("HANDS-ON STRATEGY", "HANDS-ON-STRATEGI")}</div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L("In your leadership team — not in a report.", "I er ledningsgrupp — inte i en rapport.")}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                {L(
                  "We prioritize the flows, set the KPIs before anything is built, and read the numbers every month. As your part-time Head of AI.",
                  "Vi prioriterar flödena, sätter KPI:erna innan något byggs och läser talen varje månad. Som er Head of AI på deltid."
                )}
              </p>
            </div>
          </R>
          <R delay={0.15}>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>02 / {L("DEVELOPMENT", "UTVECKLING")}</div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L("Built with Claude Code — side by side with you.", "Byggt med Claude Code — sida vid sida med er.")}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                {L(
                  "We start from our ready-to-run flows — 80 percent pre-built — or build fully unique to your process, on your data. Prototype in days, production in weeks. Your people co-build and can keep iterating themselves.",
                  "Vi utgår från de startklara flödena — 80 procent färdigbyggda — eller bygger helt unikt efter er process, på er data. Prototyp inom dagar, produktion inom veckor. Era medarbetare bygger med och kan iterera vidare själva."
                )}
              </p>
            </div>
          </R>
          <R delay={0.2}>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>03 / {L("PRODUCTION", "PRODUKTION")}</div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L("Live operations — with application responsibility.", "Skarp drift — med applikationsansvar.")}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                {L(
                  "Monitoring, logging, cost caps, and continuous improvement in your Microsoft environment. Cloudfox Managed AI — one monthly subscription.",
                  "Övervakning, loggning, kostnadstak och löpande förbättringar i er Microsoft-miljö. Cloudfox Managed AI — ett månadsabonnemang."
                )}
              </p>
            </div>
          </R>
          <R delay={0.25}>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>04 / {L("TRAINING", "UTBILDNING")}</div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L("The capability stays with you.", "Förmågan stannar hos er.")}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                {L(
                  "Leadership, process owners, and superusers develop around every flow — you know more after every build, not less.",
                  "Ledning, processägare och superusers utvecklas runt varje flöde — ni kan mer efter varje bygge, inte mindre."
                )}
              </p>
            </div>
          </R>
        </div>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* HOW WE WORK — Meet you where you are */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}`, background: "var(--surface)" }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("How we work", "Hur vi arbetar")}
          </div>
        </R>
        <R delay={0.05}>
          <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.06, maxWidth: "22em", marginBottom: 40 }}>
            {L(
              <>Three customer realities. One delivery model<span style={{ color: 'var(--accent)' }}>.</span></>,
              <>Tre kundverkligheter. En leveransmodell<span style={{ color: 'var(--accent)' }}>.</span></>
            )}
          </h2>
        </R>
        <R delay={0.1}>
          <p style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "48em", marginBottom: 64 }}>
            {L(
              <>Some clients want us to handle everything — design, build, operations. Others have already started themselves with Power Apps, Claude Code, or Lovable and need us for the last mile — security, integration, production. <strong style={{ color: "var(--ink)" }}>We adapt to where you are.</strong> What we always ensure: that the solution holds up in reality.</>,
              <>Vissa kunder vill att vi sköter allt — design, byggande, drift. Andra har redan börjat själva med Power Apps, Claude Code eller Lovable och behöver oss för sista milen — säkerhet, integration, produktion. <strong style={{ color: "var(--ink)" }}>Vi anpassar oss efter var ni är.</strong> Det vi alltid säkerställer: att lösningen håller i verkligheten.</>
            )}
          </p>
        </R>

        {/* Endpoint labels */}
        <R delay={0.15}>
          <div className="cfx-spectrum-endpoints">
            <span>{L("← Cloudfox builds most", "← Cloudfox bygger mest")}</span>
            <span>{L("You build most →", "Ni bygger mest →")}</span>
          </div>
        </R>

        {/* Spectrum line with 3 anchor markers */}
        <R delay={0.18}>
          <div className="cfx-spectrum-track">
            <div className="cfx-spectrum-dot" style={{ left: "16%" }} />
            <div className="cfx-spectrum-dot" style={{ left: "50%", transform: "translateX(-50%)" }} />
            <div className="cfx-spectrum-dot" style={{ right: "16%" }} />
          </div>
        </R>

        {/* Three anchor points beneath spectrum line */}
        <div className="cfx-spectrum-grid">
          <R delay={0.2}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.15, marginBottom: 10 }}>
                {L(<>Excel team. No code.</>, <>Excel-team. Ingen kod.</>)}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 20 }}>
                {L(
                  "Spreadsheets, manual workflows, tribal knowledge in PDFs.",
                  "Kalkylblad, manuella flöden, tyst kunskap i PDF:er."
                )}
              </p>
              <div style={{ height: 1, width: 32, background: 'var(--accent)', marginBottom: 12 }} />
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500 }}>
                {L(
                  "We build the full solution — design, code, production.",
                  "Vi bygger hela lösningen — design, kod, driftsättning."
                )}
              </p>
            </div>
          </R>
          <R delay={0.24}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.15, marginBottom: 10 }}>
                {L(<>Vibe coders. Prototypes.</>, <>Vibe-kodare. Prototyper.</>)}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 20 }}>
                {L(
                  "Power Apps Vibe, Lovable, Claude.ai, v0.",
                  "Power Apps Vibe, Lovable, Claude.ai, v0."
                )}
              </p>
              <div style={{ height: 1, width: 32, background: 'var(--accent)', marginBottom: 12 }} />
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500 }}>
                {L(
                  "We take your prototype to secure production.",
                  "Vi tar er prototyp till säker produktion."
                )}
              </p>
            </div>
          </R>
          <R delay={0.28}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.15, marginBottom: 10 }}>
                {L(<>Dev team. AI-assisted.</>, <>Utvecklarteam. AI-assisterade.</>)}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 20 }}>
                {L(
                  "In-house engineers with Copilot, Claude Code, Cursor.",
                  "Egna ingenjörer med Copilot, Claude Code, Cursor."
                )}
              </p>
              <div style={{ height: 1, width: 32, background: 'var(--accent)', marginBottom: 12 }} />
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500 }}>
                {L(
                  "We take on the hard problems with you — and run production.",
                  "Vi tar de hårda problemen tillsammans med er — och driftar produktionen."
                )}
              </p>
            </div>
          </R>
        </div>

        {/* ALWAYS FROM CLOUDFOX zone */}
        <R delay={0.32}>
          <div className="cfx-spectrum-const">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.24em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
              {L("Always from Cloudfox", "Alltid från Cloudfox")}
            </div>
            <div className="cfx-display" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
              Cloudfox Managed AI<span style={{ color: 'var(--accent)' }}>.</span>
            </div>
            <div className="cfx-display" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", lineHeight: 1.4, color: 'var(--ink-2)', marginBottom: 16 }}>
              {L(
                <>Security <span style={{ color: 'var(--accent)' }}>·</span> Integration <span style={{ color: 'var(--accent)' }}>·</span> Production <span style={{ color: 'var(--accent)' }}>·</span> Operations</>,
                <>Säkerhet <span style={{ color: 'var(--accent)' }}>·</span> Integration <span style={{ color: 'var(--accent)' }}>·</span> Produktion <span style={{ color: 'var(--accent)' }}>·</span> Drift</>
              )}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', maxWidth: '36em', margin: '0 auto' }}>
              {L(
                "Continuous improvement, not one-off delivery — ongoing optimization of model choice and AI cost, with built-in budget caps and alerts. Every agent gets its own identity in your Entra and is governed like a co-worker, in line with Microsoft's Agent 365 model. One monthly subscription — we carry full application responsibility so you never need to build your own AI team.",
                "Kontinuerlig förbättring, inte engångsleverans — löpande optimering av modellval och AI-kostnad, med inbyggda kostnadstak och larm. Varje agent får egen identitet i er Entra och styrs som en medarbetare, i linje med Microsofts Agent 365-modell. Ett månadsabonnemang — vi bär hela applikationsansvaret så ni aldrig behöver bygga ett eget AI-team."
              )}
            </p>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* HOW WE DELIVER */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("How we deliver", "Hur vi levererar")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06 }}>
              {L(<>Three steps. Built together with you.</>, <>Tre steg. Byggda tillsammans med er.</>)}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  "Not report consultants. Not demo builders. Forward-deployed engineers who move in and build side by side with your people. You work directly with the engineer who builds — no juniors, no middlemen.",
                  "Inte rapport-konsulter. Inte demo-byggare. Forward deployed-ingenjörer som flyttar in och bygger sida vid sida med er personal. Ni arbetar direkt med ingenjören som bygger — inga juniorer, inga mellanhänder."
                )}
              </p>
              <p>
                {L(
                  "Prototype in days. Production in weeks. No PowerPoint phase.",
                  "Prototyp inom dagar. Produktion inom veckor. Ingen PowerPoint-fas."
                )}
              </p>
            </div>
          </R>
        </div>

        {/* THREE-STEP MODEL */}
        <div style={{ marginTop: "clamp(4rem, 7vw, 6rem)" }}>
          <R delay={0.05}>
            <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-.01em", color: "var(--ink)", marginBottom: 48, maxWidth: "30em" }}>
              {L("Four parts — delivered in three steps, from first conversation to portfolio.", "Fyra delar — levererade i tre steg, från första samtal till portfölj.")}
            </p>
          </R>
          <div className="cfx-g3" style={{ gap: "clamp(2.5rem, 4vw, 4rem)" }}>
            <R delay={0.1}>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>01 / {L("DIAGNOSIS", "DIAGNOS")}</div>
                <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                  {L("We find where the leverage is greatest.", "Vi hittar var hävstången är störst.")}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                  {L(
                    "1-2 weeks on site with you — your process owners and system owners at the table, in every decision. We map where AI delivers fastest value in your specific business. From ambition to measurable numbers: the step ends in a concrete first build with a measurable goal — hours saved, leakage stopped, lead times cut. Fixed scope, fixed price — you know exactly what you're saying yes to.",
                    "1-2 veckor på plats hos er — era processägare och systemägare vid bordet, med i varje beslut. Vi kartlägger var AI ger snabbast värde i just er affär. Från ambition till mätbara tal: steget slutar i ett konkret första bygge med ett mätbart mål — timmar sparade, läckage stoppat, kortare ledtider. Fast omfattning, fast pris — ni vet exakt vad ni säger ja till."
                  )}
                </p>
              </div>
            </R>
            <R delay={0.15}>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>02 / {L("BUILD", "BYGG")}</div>
                <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                  {L("We build side by side — so you can iterate yourselves.", "Vi bygger sida vid sida — så ni kan iterera själva.")}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                  {L(
                    <>First flow in production in your Microsoft environment in 2-4 weeks. <strong style={{ color: "var(--ink)" }}>AI-agent-driven development</strong> makes the build visual and iterative — <strong style={{ color: "var(--ink)" }}>your process owners sit in and steer every week</strong>, not at handover. Your own developers can keep iterating with the same tools. And after delivery, we measure the outcome against the goal from the diagnosis.</>,
                    <>Första flödet i produktion i er Microsoft-miljö på 2-4 veckor. Med <strong style={{ color: "var(--ink)" }}>AI-agentdriven utveckling</strong> blir bygget visuellt och iterativt — <strong style={{ color: "var(--ink)" }}>era processägare sitter med och styr varje vecka</strong>, inte vid slutleverans. Era egna utvecklare kan dessutom fortsätta iterera själva med samma verktyg. Och efter leverans mäter vi utfallet mot målet från diagnosen.</>
                  )}
                </p>
              </div>
            </R>
            <R delay={0.2}>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, color: "var(--accent)", letterSpacing: ".05em", marginBottom: 16 }}>03 / {L("SCALE", "SKALA")}</div>
                <h3 className="cfx-display" style={{ fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)", lineHeight: 1.2, marginBottom: 20 }}>
                  {L("The portfolio grows — at your pace.", "Portföljen växer — i er takt.")}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>
                  {L(
                    "One flow at a time. Each one focused. You set the priority — we build where value is next greatest. And after every flow you choose: take over operations yourselves, or let Cloudfox Managed AI carry the application responsibility. No lock-in.",
                    "Ett flöde i taget. Varje flöde fokuserat. Ni styr prioriteringen — vi bygger där värdet är näst störst. Och efter varje flöde väljer ni: ta över driften själva, eller låt Cloudfox Managed AI bära applikationsansvaret. Ingen inlåsning."
                  )}
                </p>
              </div>
            </R>
          </div>
        </div>

      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* HOW WE BUILD */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Technology & ownership", "Teknik & ägande")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06 }}>
              {L(<>The technology — and the ownership.</>, <>Tekniken — och ägandet.</>)}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  <><strong style={{ color: "var(--ink)" }}>What we deliver is ordinary code that you own</strong> — it doesn't need the build tool to run.</>,
                  <><strong style={{ color: "var(--ink)" }}>Det vi levererar är vanlig kod som ni äger</strong> — den behöver inte byggverktyget för att köra.</>
                )}
              </p>
              <p style={{ marginBottom: 20 }}>
                {L(
                  <><strong style={{ color: "var(--ink)" }}>Everything runs in your Microsoft environment</strong> — the agent works in your Azure, you meet it in Teams, reports land in Power BI. The licenses you already pay for, finally put to work. Your security perimeter, your governance, your data. Nothing leaves your control. And your data and IP never train anyone else's models — guaranteed in writing in every delivery, in line with Microsoft's own data commitments.</>,
                  <><strong style={{ color: "var(--ink)" }}>Allt körs i er Microsoft-miljö</strong> — agenten arbetar i er Azure, ni möter den i Teams, rapporterna landar i Power BI. Licenserna ni redan betalar för — äntligen till full nytta. Er säkerhetsperimeter, er governance, er data. Inget lämnar er kontroll. Och er data och er IP tränar aldrig någon annans modeller — avtalsfäst i varje leverans, i linje med Microsofts egna dataåtaganden.</>
                )}
              </p>
              <p style={{ marginBottom: 20 }}>
                {L(
                  <><strong style={{ color: "var(--ink)" }}>The model is swappable.</strong> Microsoft Foundry gives us every leading frontier model directly in your environment, under your governance. We pick the model to fit the task and re-evaluate continuously — models evolve monthly, and your cost and quality should keep up. Steps that touch personal data always run on models in EU regions.</>,
                  <><strong style={{ color: "var(--ink)" }}>Modellen är utbytbar.</strong> Microsoft Foundry ger oss alla ledande frontiermodeller direkt i er miljö, under er governance. Vi väljer modell efter uppgiften och omprövar valet löpande — modellerna utvecklas i månadstakt, och er kostnad och kvalitet ska följa med. Persondatakänsliga steg körs alltid på modeller i EU-region.</>
                )}
              </p>
            </div>
          </R>
        </div>

        <R delay={0.2}>
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 80px", alignItems: "start" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24 }}>
                  {L("The build engine", "Byggmotorn")}
                </div>
                <span className="cfx-display" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", color: "var(--ink-2)" }}>Claude Code</span>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24 }}>
                  {L("The platforms we deliver on", "Plattformarna vi levererar på")}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "baseline" }}>
                  {["Microsoft Foundry", "Copilot Studio", "Agent 365", "Power BI", "Microsoft 365"].map((p) => (
                    <span key={p} className="cfx-display" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", color: "var(--ink-2)" }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
              {L(
                "Integrates with the ERP you already run — Business Central, Dynamics 365 F&O, Monitor, SAP, and more.",
                "Integrerar med affärssystemet ni redan kör — Business Central, Dynamics 365 F&O, Monitor, SAP med flera."
              )}
            </p>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: `clamp(5rem,9vw,8rem) ${pad}`, background: "var(--surface)" }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Get in touch", "Kontakt")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <div>
              <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06, marginBottom: 32 }}>
                {L(<>Let's find your first flow.</>, <>Låt oss hitta ert första flöde.</>)}
              </h2>
              <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "32em" }}>
                {L(
                  "Schedule 30 minutes. We'll walk through which flows fit your business — and the path to production: a fixed-price Diagnose.",
                  "Boka 30 min. Vi går igenom vilka flöden som passar er verksamhet — och vägen till produktion: en Diagnos till fast pris."
                )}
              </p>
              <div style={{ marginTop: 48, fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>
                <div style={{ color: "var(--ink)", marginBottom: 4 }}>Pontus Granborg</div>
                <div>VD, Cloudfox</div>
                <div>pontus.granborg@cloudfox.se</div>
                <div>+46 70 090 17 06</div>
              </div>
            </div>
          </R>
          <R delay={0.12}>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <input
                  className="cfx-input"
                  required
                  placeholder={L("Name", "Namn")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="cfx-input"
                  required
                  type="email"
                  placeholder={L("Email", "E-post")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  className="cfx-input"
                  required
                  rows={4}
                  placeholder={L("How can we help?", "Hur kan vi hjälpa?")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ resize: "vertical", minHeight: 100 }}
                />
                <button type="submit" className="cfx-btn cfx-btn-primary" style={{ alignSelf: "flex-start" }}>
                  {L("Send →", "Skicka →")}
                </button>
              </form>
            ) : (
              <div style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)", lineHeight: 1.6, color: "var(--ink)" }}>
                <div style={{ marginBottom: 12, color: "var(--accent)", fontWeight: 600 }}>
                  {L("Message received.", "Mottaget.")}
                </div>
                {L("We'll be in touch within 24 hours.", "Vi hör av oss inom 24 timmar.")}
              </div>
            )}
          </R>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `48px ${pad}`, borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div className="cfx-display" style={{ fontSize: "1.2rem", fontWeight: 500 }}>
            cloudfox<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".05em" }}>
            © 2026 Cloudfox AB · Stockholm
          </div>
        </div>
      </footer>
    </div>
  );
}
