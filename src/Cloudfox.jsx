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

  const cases = lang === "sv" ? [
    {
      id: "supplier",
      tag: "",
      title: "Leverantörskvalifikation och inköpsintelligens",
      summary: "SME som köper från utländska leverantörer — i Asien, Vietnam eller Östeuropa — har sällan struktur för att bedöma, godkänna och följa upp dem systematiskt. Besluten fattas på magkänsla och gamla relationer. Vi bygger AI-system som ger inköp faktiskt beslutsunderlag.",
      problem: "Utan strukturerad leverantörsbedömning riskerar ni kvalitetsproblem, leveransförseningar och compliance-brister som dyker upp för sent. Inköpare hanterar avvikelser reaktivt — e-post, Excel och telefonsamtal — istället för att ha realtidsdata om varje leverantörs prestanda.",
      delivery: "AI-system för leverantörskvalifikation som samlar och analyserar leveransdata, kvalitetsdokumentation och avvikelshistorik. Automatiserade godkännandeflöden, riskflaggning och leverantörsrankning — anpassat för er specifika inköpsstruktur och era marknader.",
    },
    {
      id: "production",
      tag: "",
      title: "Produktionsplanering och kapacitetsutnyttjande",
      summary: "Tillverkande SME planerar produktion i Excel och affärssystem byggda för redovisning — inte för operationell optimering. Resultatet är underutnyttjad kapacitet, onödiga omställningar och leveransförseningar som kunde ha undvikits. Vi bygger AI-system som ger produktionsledningen faktisk kontroll.",
      problem: "Produktionsplaneraren har tre system öppna, ett kalkylblad som ingen annan förstår och tio år av tyst kunskap i huvudet. När hen är sjuk stannar planeringen. Ordrar prioriteras fel, maskiner ställs om i fel sekvens och ledtidsestimat till kund baseras på magkänsla. Det är inte ett personproblem — det är ett informationsproblem. Rätt data finns i systemen. Den är bara aldrig aggregerad och analyserad i realtid.",
      delivery: "AI-system som integrerar orderdata, maskinkapacitet, materialtillgång och historiska cykeltider för att optimera produktionssekvens och beläggning. Visar i realtid var flaskhalsarna uppstår, vilka ordrar som riskerar försening och vad konsekvensen är av att prioritera om. Planeraren fattar bättre beslut — snabbare. Systemet ersätter inte kompetensen, det förstärker den.",
    },
    {
      id: "conversion",
      tag: "",
      title: "Öka konvertering med interaktiva AI-verktyg",
      summary: "Prisjämförelser, ROI-kalkylatorer, produktkonfiguratorer — verktyg som tidigare kostade hundratusentals kronor och månaders utvecklingstid. Vi bygger dem på dagar. Resultatet är en webbplats som aktivt säljer istället för att passivt informera.",
      problem: "De flesta SME-webbplatser är digitala broschyrer med ett kontaktformulär. Besökaren lämnar utan att ha förstått värdet, utan att ha räknat på sin situation och utan en anledning att höra av sig. Det är inte ett trafikproblem — det är ett konverteringsproblem. Rätt verktyg på rätt ställe gör hela skillnaden.",
      delivery: "AI-byggda interaktiva verktyg direkt på er webbplats — produktkonfiguratorer, prisjämförelser, ROI-kalkylatorer, avancerade kontaktformulär. Besökaren matar in sin situation och får ett konkret svar. Ni får en kvalificerad lead med reell köpintention. Verktyg som tidigare krävde en stor webbbyrå och ett halvår — levererade på dagar.",
    },
  ] : [
    {
      id: "supplier",
      tag: "",
      title: "Supplier qualification and procurement intelligence",
      summary: "SMEs buying from foreign suppliers — in Asia, Vietnam or Eastern Europe — rarely have structure to systematically assess, approve and follow up on them. Decisions are made on gut feeling and old relationships. We build AI systems that give procurement actual decision support.",
      problem: "Without structured supplier assessment you risk quality issues, delivery delays and compliance failures that surface too late. Buyers handle deviations reactively — email, Excel and phone calls — instead of having real-time data on each supplier's performance.",
      delivery: "AI system for supplier qualification that collects and analyses delivery data, quality documentation and deviation history. Automated approval flows, risk flagging and supplier ranking — tailored to your specific procurement structure and markets.",
    },
    {
      id: "production",
      tag: "",
      title: "Production planning and capacity utilisation",
      summary: "Manufacturing SMEs plan production in Excel and business systems built for accounting — not operational optimisation. The result is underutilised capacity, unnecessary changeovers and delivery delays that could have been avoided. We build AI systems that give production management actual control.",
      problem: "The production planner has three systems open, a spreadsheet nobody else understands and ten years of tacit knowledge in their head. When they are off sick, planning stops. Orders are prioritised wrong, machines are changed over in the wrong sequence and lead time estimates to customers are based on gut feeling. This is not a people problem — it is an information problem. The right data exists in the systems. It has just never been aggregated and analysed in real time.",
      delivery: "AI system that integrates order data, machine capacity, material availability and historical cycle times to optimise production sequencing and utilisation. Shows in real time where bottlenecks emerge, which orders are at risk of delay and what the consequence is of reprioritising. The planner makes better decisions — faster. The system does not replace the competence, it amplifies it.",
    },
    {
      id: "conversion",
      tag: "",
      title: "Increase conversion with interactive AI tools",
      summary: "Price comparisons, ROI calculators, product configurators — tools that used to cost hundreds of thousands and months of development time. We build them in days. The result is a website that actively sells instead of passively informing.",
      problem: "Most SME websites are digital brochures with a contact form. The visitor leaves without having understood the value, without having calculated their own situation, and without a reason to reach out. This is not a traffic problem — it is a conversion problem. The right tool in the right place makes all the difference.",
      delivery: "AI-built interactive tools directly on your website — product configurators, price comparisons, ROI calculators, advanced contact forms. The visitor inputs their situation and gets a concrete answer. You get a qualified lead with real purchase intent. Tools that previously required a large agency and six months — delivered in days.",
    },
  ];

  const reasons = lang === "sv" ? [
    {
      title: "Claude Code",
      text: "Vi bygger med det mest kapabla AI-verktyget som finns. Claude Code möjliggör skräddarsydda applikationer och automationer som löser era specifika problem — snabbare och mer flexibelt än vad traditionell mjukvaruutveckling tillåter. Ingen plattformslåsning. Ni äger koden.",
    },
    {
      title: "Manuell kodgranskning och övervakning",
      text: "Varje lösning granskas manuellt av erfarna kodutvecklare innan leverans — och övervakas löpande efter driftsättning. AI bygger snabbt. Våra experter säkerställer att det som levereras faktiskt håller, är säkert och fungerar i er miljö. Ni betalar inte för felsökning i efterhand.",
    },
    {
      title: "Tillgång till domänexperter",
      text: "Vi kompletterar AI-leveransen med experter inom utvalda branscher och processer — supply chain, industriell tillverkning och mer. Det är skillnaden mellan en lösning som tekniskt fungerar och en som löser rätt problem. En generalist kan bygga ett automation-verktyg. Vi bygger rätt automation.",
    },
  ] : [
    {
      title: "Claude Code",
      text: "We build with the most capable AI tool available. Claude Code enables custom applications and automations that solve your specific problems — faster and more flexibly than traditional software development allows. No platform lock-in. You own the code.",
    },
    {
      title: "Manual code review and monitoring",
      text: "Every solution is manually reviewed by experienced developers before delivery — and monitored continuously after deployment. AI builds fast. Our experts ensure what is delivered actually holds, is secure and works in your environment. You do not pay for debugging after the fact.",
    },
    {
      title: "Access to domain experts",
      text: "We complement AI delivery with experts in selected industries and processes — supply chain, industrial manufacturing and more. That is the difference between a solution that technically works and one that solves the right problem. A generalist can build an automation tool. We build the right automation.",
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
              {L("Book a review", "Boka genomgång")}
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
                {L("AI & Automation for SME", "AI & Automation för SME")}
              </span>
            </div>
          </R>
          <R delay={0.05}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1.03, maxWidth: "18em" }}>
              {L(
                <>AI at enterprise level for SME<br />without access to <span style={{ color: ac }}>AI budgets and AI experts.</span></>,
                <>AI på enterprise-nivå för SME<br />utan tillgång till <span style={{ color: ac }}>AI-budgetar och AI-experter.</span></>
              )}
            </h1>
          </R>
          <R delay={0.1}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.7, color: m, maxWidth: "46em" }}>
              {L(
                "SMEs know the opportunities with AI are enormous. But they don't have large AI budgets, they don't have internal AI experts — and their IT and business system partners often have too much to lose to embrace what modern AI makes possible.",
                "SME vet att möjligheterna med AI är stora. Men de har ingen stor AI-budget, de har inte tillgång till interna AI-experter — och deras IT- och affärssystemspartner har ofta för mycket att förlora på att anpassa sig till vad modernt AI möjliggör."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <p style={{ marginTop: 16, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 600, color: lt }}>
              {L("That is why we created Cloudfox.", "Därför har vi skapat Cloudfox.")}
            </p>
          </R>
          <R delay={0.16}>
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
      <section style={{ borderTop: bdr, borderBottom: bdr }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            { value: "80%", label: L("faster development with Claude Code", "snabbare utveckling med Claude Code") },
            { value: "2–4 v", label: L("from problem to working AI", "från problem till fungerande AI") },
            { value: L("Measurable ROI", "Mätbar ROI"), label: L("we start with what the problem costs you today", "vi börjar med vad problemet kostar er idag") },
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
                "We combine the most capable AI tools, manual code review, and deep domain expertise — in every engagement.",
                "Vi kombinerar de mest kapabla AI-verktygen, manuell kodgranskning och djup domänexpertis — i varje uppdrag."
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
              style={{ padding: `clamp(28px,3vw,40px) ${pad}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, transition: "background .2s", background: openCase === c.id ? "rgba(79,127,255,.025)" : "transparent" }}
            >
              <div style={{ flex: 1 }}>
                {c.tag && <span className="cfx-tag" style={{ marginBottom: 12, display: "inline-block" }}>{c.tag}</span>}
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
                    "Founded by Pontus Granborg — senior solution architect with deep experience in industrial operations, ERP systems and AI-native development. Every engagement is senior-led and backed by a highly competent global delivery team. You always know who is accountable.",
                    "Grundat av Pontus Granborg — senior lösningsarkitekt med djup erfarenhet av industriell verksamhet, ERP-system och AI-native utveckling. Varje uppdrag är seniorlett och backat av ett högkompetent globalt leveransteam. Ni vet alltid vem som ansvarar."
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

      {/* JOIN AS EXPERT */}
      <section style={{ paddingTop: "clamp(5rem,7vw,8rem)" }}>
        <div style={{ borderTop: bdr }}>
          <div className="cfx-split">
            <div style={{ padding: `clamp(36px,4vw,56px) ${pad}`, borderRight: bdr }}>
              <R>
                <Label>{L("For experts", "För experter")}</Label>
                <H2>{L("Are you an expert in your industry?", "Är du expert inom din bransch?")}</H2>
              </R>
            </div>
            <div style={{ padding: `clamp(36px,4vw,56px) ${pad}` }}>
              <R delay={0.06}>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: m }}>
                  {L(
                    "Cloudfox builds a network of domain experts who complement our AI delivery. If you have deep knowledge in a specific industry, process, or market — and want to apply that expertise in AI-driven projects — we want to hear from you.",
                    "Cloudfox bygger ett nätverk av domänexperter som kompletterar vår AI-leverans. Om du har djup kunskap inom en specifik bransch, process eller marknad — och vill tillämpa den kunskapen i AI-drivna projekt — vill vi gärna höra av dig."
                  )}
                </p>
                <div style={{ marginTop: 28 }}>
                  <a href="mailto:info@cloudfox.se?subject=Expert network" style={{ fontSize: 15, color: ac, fontWeight: 600 }}>
                    {L("Get in touch →", "Hör av dig →")}
                  </a>
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
