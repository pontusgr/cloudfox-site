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
  const [openCase, setOpenCase] = useState(null);

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
      .cfx{--a:#1D4ED8;--bg:#06090F;--s:'Inter',system-ui,sans-serif;font-family:var(--s);color:#F1F5F9;background:var(--bg)}
      .cfx *{box-sizing:border-box;margin:0}.cfx a{color:inherit;text-decoration:none}
      .cfx-card{transition:border-color .25s,background .25s}
      .cfx-card:hover{border-color:rgba(29,110,250,.25)!important;background:rgba(29,110,250,.02)!important}
      .cfx-g3{display:grid;grid-template-columns:1fr}
      @media(min-width:768px){.cfx-g3{grid-template-columns:repeat(3,1fr)}}
      .cfx-split{display:grid;grid-template-columns:1fr}
      @media(min-width:900px){.cfx-split{grid-template-columns:5fr 7fr;align-items:start}}
      .cfx-btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;border-radius:3px;font-family:var(--s);cursor:pointer;border:none;letter-spacing:-.01em;transition:filter .2s}
      .cfx-btn:hover{filter:brightness(1.1)}
      .cfx-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:2px;background:rgba(29,110,250,.1);color:#93C5FD}
      .cfx-input{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;color:#F1F5F9;font-size:15px;font-family:var(--s);outline:none;width:100%;transition:border-color .2s}
      .cfx-input:focus{border-color:rgba(29,110,250,.5)}
      .cfx-input::placeholder{color:#475569}
      .cfx-expand{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.22,1,.36,1)}
      .cfx-expand.open{max-height:600px}
    `;
    document.head.appendChild(s);
  }, []);

  const ac = "#1D4ED8";
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

  const cases = lang === "sv" ? [
    {
      id: "order",
      tag: "Område 1",
      title: "Orderhantering och kundkommunikation",
      summary: "Orderbekräftelser, statusuppdateringar, avvikelser och leveransbesked hanteras manuellt av säljare och kundtjänst. Varje dag. För varje order. Vi automatiserar flödet från inkommande order till bekräftad leverans.",
      problem: "En säljare lägger 30–60 minuter per dag på att bekräfta ordrar, svara på statusfrågor och kommunicera avvikelser manuellt. Multiplicerat med 10 säljare och 250 arbetsdagar är det 25 000 manuella arbetstimmar per år — för administrativt arbete som inte skapar värde.",
      delivery: "AI-agent som hanterar orderbekräftelser, statusuppdateringar och avvikelsekommunikation automatiskt. Integrerar med befintligt affärssystem. Implementerat och i drift inom 2–4 veckor.",
    },
    {
      id: "spend",
      tag: "Område 2",
      title: "Kostnads- och spend-analys",
      summary: "De flesta SME vet vad de köper men inte varför de betalar det priset. Inköpsdata ligger spridd i affärssystem, Excel och e-post. Ingen har en samlad bild. Vi bygger AI-verktyg som ger ledningen faktisk synlighet över kostnader och leverantörsprestanda.",
      problem: "Utan strukturerad spend-analys fattas inköpsbeslut på magkänsla och historiska relationer. Prisjämförelser görs manuellt eller inte alls. Dubbelarbete och suboptimala leverantörsavtal är inbyggt i verksamheten — men osynligt.",
      delivery: "AI-driven spend-dashboard som aggregerar inköpsdata från befintliga system, identifierar avvikelser, rankar leverantörer och flaggar besparingsmöjligheter. Beslutsunderlag i realtid istället för månadsrapporter.",
    },
    {
      id: "process",
      tag: "Område 3",
      title: "Processdokumentation och intern rapportering",
      summary: "Interna rapporter, statusuppdateringar och processdokumentation skapas manuellt av medarbetare som har bättre saker att göra. Vi automatiserar det som är repetitivt och standardiserat så att teamet kan fokusera på det som kräver mänsklig bedömning.",
      problem: "En mellanchef lägger i genomsnitt 4–6 timmar per vecka på att sammanställa statusrapporter, skriva mötesunderlag och dokumentera processer. Det är 200–300 timmar per år per person — tid som försvinner i administration istället för ledarskap.",
      delivery: "AI-verktyg som automatiserar rapportgenerering, sammanfattar data från befintliga system och producerar strukturerad dokumentation. Rätt format, rätt mottagare, rätt tidpunkt — utan manuell hantering.",
    },
  ] : [
    {
      id: "order",
      tag: "Area 1",
      title: "Order management and customer communication",
      summary: "Order confirmations, status updates, deviations and delivery notices are handled manually by sales and customer service. Every day. For every order. We automate the flow from incoming order to confirmed delivery.",
      problem: "A sales rep spends 30–60 minutes per day manually confirming orders, answering status questions and communicating deviations. Multiplied by 10 sales reps and 250 working days that is 25,000 manual working hours per year — for administrative work that creates no value.",
      delivery: "AI agent that handles order confirmations, status updates and deviation communication automatically. Integrates with existing business systems. Implemented and live within 2–4 weeks.",
    },
    {
      id: "spend",
      tag: "Area 2",
      title: "Cost and spend analysis",
      summary: "Most SMEs know what they buy but not why they pay that price. Purchase data sits scattered across business systems, Excel and email. Nobody has a complete picture. We build AI tools that give management actual visibility over costs and supplier performance.",
      problem: "Without structured spend analysis, purchasing decisions are made on gut feeling and historical relationships. Price comparisons are done manually or not at all. Duplicate work and suboptimal supplier contracts are built into the business — but invisible.",
      delivery: "AI-driven spend dashboard that aggregates purchasing data from existing systems, identifies deviations, ranks suppliers and flags savings opportunities. Decision support in real time instead of monthly reports.",
    },
    {
      id: "process",
      tag: "Area 3",
      title: "Process documentation and internal reporting",
      summary: "Internal reports, status updates and process documentation are created manually by employees who have better things to do. We automate what is repetitive and standardised so the team can focus on what requires human judgement.",
      problem: "A middle manager spends on average 4–6 hours per week compiling status reports, writing meeting materials and documenting processes. That is 200–300 hours per year per person — time lost in administration instead of leadership.",
      delivery: "AI tools that automate report generation, summarise data from existing systems and produce structured documentation. Right format, right recipient, right time — without manual handling.",
    },
  ];

  const reasons = lang === "sv" ? [
    { title: "Claude Code", text: "Vi bygger med det mest kapabla AI-verktyget som finns. Claude Code möjliggör skräddarsydda applikationer och automationer som löser era specifika problem — inte generiska lösningar som passar alla och ingen." },
    { title: "Kodgranskning som standard", text: "Varje lösning granskas av erfarna kodutvecklare innan leverans. AI bygger snabbt — experterna säkerställer att det som levereras faktiskt håller. Ni betalar inte för felsökning efter implementering." },
    { title: "Sektorsdjup", text: "Vi förstår verksamheten, inte bara tekniken. En AI-generalist kan bygga ett automationsverktyg. Att bygga rätt automation för er specifika verksamhet kräver att vi förstår hur er bransch faktiskt fungerar." },
    { title: "Global leveransmodell", text: "Bevisad leveransmodell med ett högkompetent AI/kod-team med global räckvidd. Det ger oss en kostnadsbas och leveranskapacitet som svenska konkurrenter inte kan matcha." },
    { title: "Levererat på veckor", text: "Fungerande AI i er faktiska miljö inom 2–4 veckor från första möte. Inte månader av kravspecifikation och projektplanering." },
    { title: "Ni äger lösningen", text: "Inga plattformsberoenden, inga löpande licensavgifter för grundfunktionen. Ni äger koden och logiken. Vi finns kvar som partner för uppgraderingar och expansion." },
  ] : [
    { title: "Claude Code", text: "We build with the most capable AI tool available. Claude Code enables custom applications and automations that solve your specific problems — not generic solutions that fit everyone and no one." },
    { title: "Code review as standard", text: "Every solution is reviewed by experienced developers before delivery. AI builds fast — the experts ensure what is delivered actually holds. You do not pay for debugging after implementation." },
    { title: "Sector depth", text: "We understand the business, not just the technology. An AI generalist can build an automation tool. Building the right automation for your specific business requires understanding how your industry actually works." },
    { title: "Global delivery model", text: "Proven delivery model with a highly competent AI/code team with global reach. That gives us a cost base and delivery capacity that Swedish competitors cannot match." },
    { title: "Delivered in weeks", text: "Working AI in your actual environment within 2–4 weeks from the first meeting. Not months of requirements specification and project planning." },
    { title: "You own the solution", text: "No platform dependencies, no ongoing licence fees for core functionality. You own the code and logic. We remain as a partner for upgrades and expansion." },
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
              {L("Book a review", "Boka genomgång")}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", padding: `clamp(4rem,7vw,6rem) ${pad} clamp(3rem,5vw,5rem)` }}>
        <div style={{ position: "absolute", top: "5%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,110,250,.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 28, height: 2, background: ac }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: ac }}>
                {L("AI & Automation for SME", "AI & Automation för SME")}
              </span>
            </div>
          </R>
          <R delay={0.05}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1.03, maxWidth: "18em" }}>
              {L(
                <>Enterprise-level AI<br />for companies that<br /><span style={{ color: ac }}>don't have a hundred engineers.</span></>,
                <>AI på enterprise-nivå<br />för företag som inte<br /><span style={{ color: ac }}>har hundra ingenjörer.</span></>
              )}
            </h1>
          </R>
          <R delay={0.1}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7, color: m, maxWidth: "46em" }}>
              {L(
                "Palantir builds data platforms for governments and Fortune 500 companies. SMEs have the same data, the same complexity, the same need to make better decisions faster — but no access to the tools. Cloudfox changes that.",
                "Palantir bygger dataplattformar för regeringar och Fortune 500. SME har samma data, samma komplexitet, samma behov av att fatta bättre beslut snabbare — men noll tillgång till verktygen. Cloudfox ändrar på det."
              )}
            </p>
          </R>
          <R delay={0.14}>
            <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#cases" className="cfx-btn" style={{ padding: "15px 30px", fontSize: 15, background: ac, color: "#fff" }}>
                {L("See what we automate", "Se vad vi automatiserar")} <span style={{ fontSize: 18 }}>→</span>
              </a>
              <a href="#contact" className="cfx-btn" style={{ padding: "15px 28px", fontSize: 15, background: "transparent", color: lt, border: "1px solid rgba(255,255,255,.12)" }}>
                {L("Book a free review", "Boka kostnadsfri genomgång")}
              </a>
            </div>
          </R>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: `clamp(3rem,5vw,5rem) ${pad} clamp(2rem,3vw,3rem)`, borderTop: bdr }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, borderTop: bdr, borderLeft: bdr }}>
          {(lang === "sv" ? [
            { num: "80%", label: "snabbare applikationsutveckling med Claude Code" },
            { num: "2–4 v", label: "från första möte till fungerande AI i er miljö" },
            { num: "50–500", label: "anställda — vår primära målmarknad" },
            { num: "3", label: "pelare: AI-verktyg, kodexperter, sektorsdjup" },
          ] : [
            { num: "80%", label: "faster application development with Claude Code" },
            { num: "2–4 w", label: "from first meeting to working AI in your environment" },
            { num: "50–500", label: "employees — our primary target market" },
            { num: "3", label: "pillars: AI tools, code experts, sector depth" },
          ]).map((s, i) => (
            <div key={i} style={{ padding: "clamp(24px,3vw,36px)", borderRight: bdr, borderBottom: bdr }}>
              <div style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-.05em", color: ac }}>{s.num}</div>
              <div style={{ marginTop: 6, fontSize: 13, color: d }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(4rem,6vw,6rem) ${pad} clamp(2rem,3vw,3rem)` }}>
          <R>
            <Label>{L("What we automate", "Vad vi automatiserar")}</Label>
            <H2>{L("Three areas where AI creates immediate ROI for SME.", "Tre områden där AI skapar omedelbar ROI för SME.")}</H2>
          </R>
        </div>

        {cases.map((c) => (
          <div key={c.id} style={{ borderTop: bdr }}>
            <div
              onClick={() => setOpenCase(openCase === c.id ? null : c.id)}
              style={{ padding: `clamp(28px,3vw,40px) ${pad}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, transition: "background .2s", background: openCase === c.id ? "rgba(29,110,250,.025)" : "transparent" }}
            >
              <div style={{ flex: 1 }}>
                <span className="cfx-tag" style={{ marginBottom: 12, display: "inline-block" }}>{c.tag}</span>
                <h3 style={{ fontSize: "clamp(1.3rem,2.5vw,2rem)", fontWeight: 700, letterSpacing: "-.03em" }}>{c.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, color: m, lineHeight: 1.65, maxWidth: "56em" }}>{c.summary}</p>
              </div>
              <div style={{ fontSize: 24, color: d, flexShrink: 0, marginTop: 4, transform: openCase === c.id ? "rotate(45deg)" : "none", transition: "transform .3s" }}>+</div>
            </div>

            <div className={`cfx-expand${openCase === c.id ? " open" : ""}`}>
              <div style={{ padding: `0 ${pad} clamp(32px,4vw,48px)` }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                  <div style={{ padding: "24px", background: "rgba(255,255,255,.02)", border: bdr, borderRadius: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#EF4444", marginBottom: 12 }}>{L("The problem today", "Problemet idag")}</div>
                    <p style={{ fontSize: 14, color: m, lineHeight: 1.7 }}>{c.problem}</p>
                  </div>
                  <div style={{ padding: "24px", background: "rgba(255,255,255,.02)", border: bdr, borderRadius: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "#22C55E", marginBottom: 12 }}>{L("What we deliver", "Vad vi levererar")}</div>
                    <p style={{ fontSize: 14, color: m, lineHeight: 1.7 }}>{c.delivery}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* WHY CLOUDFOX */}
      <section id="why" style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Why Cloudfox", "Varför Cloudfox")}</Label>
            <H2>{L(<>Three things no single competitor<br />can offer at the same time.</>, <>Tre saker ingen enskild konkurrent<br />kan erbjuda samtidigt.</>)}</H2>
            <p style={{ marginTop: 16, fontSize: 16, color: m, lineHeight: 1.7, maxWidth: "50em" }}>
              {L(
                "A pure AI agency lacks security and domain knowledge. A traditional consultancy lacks AI capability. A niche expert lacks delivery capacity. Cloudfox combines all three.",
                "En ren AI-byrå saknar säkerhet och domänkunskap. Ett traditionellt konsultbolag saknar AI-kompetens. En nischexpert saknar leveranskapacitet. Cloudfox kombinerar alla tre."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderTop: bdr }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {reasons.map((r, i) => (
              <R key={r.title} delay={(i % 3) * 0.05}>
                <div className="cfx-card" style={{ padding: `clamp(28px,3vw,40px) ${pad}`, borderBottom: bdr, border: bdr, borderTop: "none", borderLeft: "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ac, marginBottom: 16 }} />
                  <h3 style={{ fontSize: "clamp(1rem,1.6vw,1.15rem)", fontWeight: 700, letterSpacing: "-.02em" }}>{r.title}</h3>
                  <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, color: m }}>{r.text}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how" style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("How we work", "Hur vi arbetar")}</Label>
            <H2>{L("Start small. Prove value. Expand.", "Starta smått. Bevisa värde. Expandera.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cfx-g3">
            {(lang === "sv" ? [
              { n: "01", title: "Kostnadsfri genomgång", text: "Vi identifierar ett konkret problem där AI skapar mätbar ROI — snabbt. Inget åtagande. Inga timmar som tickar. Vi berättar ärligt var det är värt att börja." },
              { n: "02", title: "Leverans på 2–4 veckor", text: "Vi löser det avgränsade problemet. Fungerande AI i er faktiska miljö med era egna system och processer. Ni ser resultatet innan ni beslutar om nästa steg." },
              { n: "03", title: "Systematisk expansion", text: "Varje leverans bygger förtroende och datapunkter för nästa. Vi driver löpande ROI-beräkningar som visar vad nästa automation är värd — och vad ert befintliga system kostar jämfört med ett AI-alternativ." },
            ] : [
              { n: "01", title: "Free review", text: "We identify a concrete problem where AI creates measurable ROI — fast. No commitment. No billable hours ticking. We tell you honestly where it is worth starting." },
              { n: "02", title: "Delivery in 2–4 weeks", text: "We solve the defined problem. Working AI in your actual environment with your own systems and processes. You see the result before deciding on the next step." },
              { n: "03", title: "Systematic expansion", text: "Each delivery builds trust and data points for the next. We continuously run ROI calculations showing what the next automation is worth — and what your existing system costs compared to an AI alternative." },
            ]).map((p, i) => (
              <R key={p.n} delay={i * 0.06}>
                <div className="cfx-card" style={{ padding: `clamp(32px,3vw,48px) ${pad}`, borderRight: i < 2 ? bdr : "none", height: "100%", border: "1px solid transparent", borderTop: "none", borderBottom: "none", borderLeft: "none" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: ac, letterSpacing: ".08em" }}>{p.n}</span>
                  <h3 style={{ marginTop: 14, fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700, letterSpacing: "-.03em" }}>{p.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.65, color: m }}>{p.text}</p>
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
                <H2>{L("Senior expertise from day one.", "Senior kompetens från dag ett.")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(36px,4vw,56px) ${pad}` }}>
              <R delay={0.06}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: m }}>
                  {L(
                    "Founded by Pontus Granborg — senior solution architect with deep experience in industrial operations, ERP systems and AI-native development. Backed by a highly competent AI and code team with global reach. Every engagement is senior-led from assessment to delivery. No handoffs. No delegated responsibility.",
                    "Grundat av Pontus Granborg — senior lösningsarkitekt med djup erfarenhet av industriell verksamhet, ERP-system och AI-native utveckling. Backat av ett högkompetent AI- och kodteam med global räckvidd. Varje uppdrag leds av senior kompetens från kartläggning till leverans. Inga överlämnanden. Inget delegerat ansvar."
                  )}
                </p>
                <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
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
                    "We identify one concrete process where AI creates measurable value — fast. No commitment. No sales pitch. Just an honest assessment of where it is worth starting.",
                    "Vi identifierar en konkret process där AI skapar mätbart värde — snabbt. Inget åtagande. Ingen säljpitch. Bara en ärlig bedömning av var det är värt att börja."
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
                        "Briefly describe your business — what processes take the most time today?",
                        "Beskriv kort er verksamhet — vilka processer tar mest tid idag?"
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
                {L("AI & automation partner for SME. Stockholm, Sweden.", "AI & automation-partner för SME. Stockholm, Sverige.")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 48 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 14 }}>{L("Navigate", "Navigera")}</div>
                {[
                  { label: L("What we automate", "Vad vi automatiserar"), href: "#cases" },
                  { label: L("Why Cloudfox", "Varför Cloudfox"), href: "#why" },
                  { label: L("How we work", "Hur vi arbetar"), href: "#how" },
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
            <span style={{ fontSize: 12, color: d }}>{L("AI & automation for SME.", "AI & automation för SME.")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
