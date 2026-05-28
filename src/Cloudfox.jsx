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
      .cfx-btn{display:inline-flex;align-items:center;gap:10px;font-family:'Inter',sans-serif;font-weight:500;cursor:pointer;border:none;transition:all .3s ease}
      .cfx-btn-primary{background:var(--ink);color:var(--bg);padding:16px 28px;font-size:15px}
      .cfx-btn-primary:hover{background:var(--accent)}
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
    `;
    document.head.appendChild(s);
  }, []);

  const pad = "clamp(1.5rem, 6vw, 8rem)";

  const useCases = lang === "sv"
    ? [
        {
          num: "01",
          title: "Contract Compliance & Obligation Enforcement",
          text: "Komplexa avtal med indexering, SLA-tröskelvärden och bonusklausuler hanteras manuellt — eller inte alls. Typisk läckage: 8–9% av kontraktvärdet. AI som kontinuerligt övervakar villkor och flaggar avvikelser.",
          competition: "Låg–medel",
        },
        {
          num: "02",
          title: "Intelligent Time Tracking & Billable Hours",
          text: "Manuell timrapportering i konsultbolag = 5–15% ofakturerade timmar. AI kategoriserar arbete automatiskt från kalender, mejl och dokument. Direkt återhämtning av förlorad fakturering.",
          competition: "Låg",
        },
        {
          num: "03",
          title: "Predictive Maintenance & Asset Optimization",
          text: "ERP är reaktivt — fel uppstår, någon rapporterar, någon åtgärdar i efterhand. Prediktiv AI varnar innan haveri. 30–50% mindre driftstopp, mätbart inom ett kvartal.",
          competition: "Medel",
        },
        {
          num: "04",
          title: "Revenue Leakage Detection",
          text: "Mellan ert säljsystem och ekonomisystem läcker typiskt 0,3–1,5% av omsättningen — underbetalningar, missade fakturarader, prisavvikelser. AI som flaggar gapen i realtid.",
          competition: "Medel",
        },
        {
          num: "05",
          title: "Inventory & Supply Chain Anomaly Detection",
          text: "Överlager binder kapital. Slut-i-lager dödar försäljning. Slow-movers äter lagerplats. AI flaggar mönstren ERP missar — innan de blir dyra.",
          competition: "Medel–låg",
        },
        {
          num: "06",
          title: "Automated Invoice Processing & 3-Way Matching",
          text: "Inkomna fakturor matchas manuellt mot order och leverans. AI gör det på sekunder, fångar avvikelser automatiskt, frigör cash flow snabbare.",
          competition: "Medel",
        },
        {
          num: "07",
          title: "Demand Forecasting & S&OP Optimization",
          text: "Statiska Excel-prognoser i volatil marknad = systematisk over- eller under-stock. AI som lär sig av faktisk efterfrågan i realtid och justerar löpande.",
          competition: "Medel",
        },
        {
          num: "08",
          title: "Supplier Risk & Performance Monitoring",
          text: "Leverantörsrisker upptäcks oftast när det redan är ett problem. AI bevakar finansiell hälsa, leveransprestanda och geopolitik — proaktivt, automatiskt.",
          competition: "Låg–medel",
        },
        {
          num: "09",
          title: "Pricing Optimization & Dynamic Pricing",
          text: "Statiska priser missar både uppsida (premium-segment) och nedsida (priskänsliga kunder). AI optimerar per kundsegment, säsong och konkurrenssituation.",
          competition: "Medel",
        },
        {
          num: "10",
          title: "Compliance Monitoring (GDPR, AI Act, branschspecifikt)",
          text: "GDPR, EU AI Act, branschspecifika regelverk — kraven växer fortare än compliance-team. AI som kontinuerligt övervakar policy-efterlevnad och flaggar risker.",
          competition: "Låg",
        },
      ]
    : [
        {
          num: "01",
          title: "Contract Compliance & Obligation Enforcement",
          text: "Complex contracts with indexation, SLA thresholds, and bonus clauses are managed manually — or not at all. Typical leakage: 8–9% of contract value. AI that continuously monitors terms and flags deviations.",
          competition: "Low–medium",
        },
        {
          num: "02",
          title: "Intelligent Time Tracking & Billable Hours",
          text: "Manual time entry in consultancies = 5–15% unbilled hours. AI categorizes work automatically from calendar, email, and documents. Direct recovery of lost billing.",
          competition: "Low",
        },
        {
          num: "03",
          title: "Predictive Maintenance & Asset Optimization",
          text: "ERP is reactive — failures occur, someone reports, someone responds after the fact. Predictive AI warns before failure. 30–50% less downtime, measurable within a quarter.",
          competition: "Medium",
        },
        {
          num: "04",
          title: "Revenue Leakage Detection",
          text: "Between your sales system and finance system, typically 0.3–1.5% of revenue leaks — underpayments, missed line items, pricing discrepancies. AI that flags gaps in real time.",
          competition: "Medium",
        },
        {
          num: "05",
          title: "Inventory & Supply Chain Anomaly Detection",
          text: "Overstock ties up capital. Stockouts kill sales. Slow-movers eat shelf space. AI flags the patterns ERP misses — before they get expensive.",
          competition: "Medium–low",
        },
        {
          num: "06",
          title: "Automated Invoice Processing & 3-Way Matching",
          text: "Incoming invoices matched manually against orders and deliveries. AI does it in seconds, catches discrepancies automatically, frees cash flow faster.",
          competition: "Medium",
        },
        {
          num: "07",
          title: "Demand Forecasting & S&OP Optimization",
          text: "Static Excel forecasts in volatile markets = systematic over- or under-stock. AI that learns from actual demand in real time and adjusts continuously.",
          competition: "Medium",
        },
        {
          num: "08",
          title: "Supplier Risk & Performance Monitoring",
          text: "Supplier risks usually detected when they're already a problem. AI monitors financial health, delivery performance, and geopolitics — proactively, automatically.",
          competition: "Low–medium",
        },
        {
          num: "09",
          title: "Pricing Optimization & Dynamic Pricing",
          text: "Static prices miss both upside (premium segments) and downside (price-sensitive customers). AI optimizes per customer segment, season, and competitive position.",
          competition: "Medium",
        },
        {
          num: "10",
          title: "Compliance Monitoring (GDPR, AI Act, industry-specific)",
          text: "GDPR, EU AI Act, industry-specific regulations — requirements grow faster than compliance teams. AI that continuously monitors policy adherence and flags risks.",
          competition: "Low",
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
            {L("Acceleration through AI", "Acceleration genom AI")}
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
              <>Your systems become intelligent. Your processes learn. Your team gets leverage.</>,
              <>Era system blir intelligenta. Era processer lär sig. Ert team får hävstång.</>
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
              "Cloudfox builds the AI that accelerates the value you've already built — in your systems, your processes, your team. Acceleration, not revolution.",
              "Cloudfox bygger AI:n som accelererar värdet ni redan byggt — i era system, era processer, ert team. Acceleration, inte revolution."
            )}
          </p>
        </R>
        <R delay={0.24}>
          <div style={{ marginTop: 64, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="cfx-btn cfx-btn-primary">
              {L("Schedule a conversation", "Boka samtal")} <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a href="#thesis" className="cfx-btn cfx-btn-ghost">
              {L("Read our thesis", "Läs vår tes")}
            </a>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* THESIS / MANIFESTO */}
      <section id="thesis" style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Our thesis", "Vår tes")}
          </div>
        </R>
        <R delay={0.05}>
          <div style={{ maxWidth: "44em" }}>
            <h2
              className="cfx-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                lineHeight: 1.08,
                marginBottom: 40,
              }}
            >
              {L(
                <>You've built the value. We accelerate it.</>,
                <>Ni har byggt värdet. Vi accelererar det.</>
              )}
            </h2>
          </div>
        </R>
        <R delay={0.1}>
          <div
            style={{
              maxWidth: "40em",
              fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
              lineHeight: 1.7,
              color: "var(--ink-2)",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            <p style={{ marginBottom: 24 }}>
              {L(
                "You've invested in your ERP. You've refined your processes over years. You've built a team that knows your business. That's value — real, accumulated, hard to replicate.",
                "Ni har investerat i ert ERP. Ni har förfinat era processer i flera år. Ni har byggt ett team som kan er affär. Det är värde — verkligt, ackumulerat, svårt att kopiera."
              )}
            </p>
            <p style={{ marginBottom: 24 }}>
              {L(
                "Most AI consultants want to tear it down and start over. Rip-and-replace. Workshops to redesign everything. Strategy decks that propose transformation.",
                "De flesta AI-konsulter vill riva ner och börja om. Rip-and-replace. Workshops som ritar om allt. Strategi-decks som föreslår transformation."
              )}
            </p>
            <p>
              {L(
                "We don't. We engineer AI that compounds the value you've built — in your systems, your processes, your team. Acceleration, not revolution.",
                "Det gör inte vi. Vi bygger AI som förstärker värdet ni byggt — i era system, era processer, ert team. Acceleration, inte revolution."
              )}
            </p>
          </div>
        </R>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* THREE PILLARS */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}`, background: "var(--surface)" }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Three dimensions of accumulated value", "Tre dimensioner av ackumulerat värde")}
          </div>
        </R>
        <R delay={0.05}>
          <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06, maxWidth: "20em", marginBottom: 56 }}>
            {L(
              <>Where the value lives — and how we accelerate it.</>,
              <>Var värdet bor — och hur vi accelererar det.</>
            )}
          </h2>
        </R>
        <div className="grid-3" style={{ gap: "clamp(2rem, 3vw, 3.5rem)" }}>
          <R delay={0.05}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L(<>Systems</>, <>System</>)}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 16 }}>
                {L(
                  <>Your ERP, CRM, finance, integrations. Decades of investment. <strong style={{ color: 'var(--ink)' }}>We don't rip them out. We make them intelligent.</strong></>,
                  <>Era ERP, CRM, ekonomi-system, integrationer. Decennier av investering. <strong style={{ color: 'var(--ink)' }}>Vi river dem inte. Vi gör dem intelligenta.</strong></>
                )}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic' }}>
                {L(
                  "AI that lives on top of your Visma, reads your SharePoint, understands your Dynamics.",
                  "AI som lever ovanpå er Visma, läser er SharePoint, förstår er Dynamics."
                )}
              </p>
            </div>
          </R>
          <R delay={0.1}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L(<>Processes</>, <>Processer</>)}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 16 }}>
                {L(
                  <>Your SOPs, workflows, decision rules. Industry wisdom baked in. <strong style={{ color: 'var(--ink)' }}>We don't redesign them. We make them learn.</strong></>,
                  <>Era SOP:er, workflows, beslutsregler. Branschvisdom inbakad. <strong style={{ color: 'var(--ink)' }}>Vi designar inte om dem. Vi får dem att lära sig.</strong></>
                )}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic' }}>
                {L(
                  "AI that follows your process but optimizes every run and flags exceptions before they become problems.",
                  "AI som följer er process men optimerar varje körning och flaggar undantag innan de blir problem."
                )}
              </p>
            </div>
          </R>
          <R delay={0.15}>
            <div>
              <h3 className="cfx-display" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", lineHeight: 1.2, marginBottom: 20 }}>
                {L(<>Culture</>, <>Kultur</>)}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 16 }}>
                {L(
                  <>Your people, their tacit knowledge, your customer relationships, your brand. <strong style={{ color: 'var(--ink)' }}>We don't replace them. We give them AI leverage.</strong></>,
                  <>Era anställda, deras tysta kunskap, era kundrelationer, varumärket. <strong style={{ color: 'var(--ink)' }}>Vi ersätter dem inte. Vi ger dem AI-leverage.</strong></>
                )}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', fontStyle: 'italic' }}>
                {L(
                  "Sales gets AI that finds leads. CFO gets AI that finds leakage. Humans win — with AI as leverage.",
                  "Säljaren får AI som hittar leads. CFO får AI som hittar läckage. Människan vinner — med AI som hävstång."
                )}
              </p>
            </div>
          </R>
        </div>
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
              {L(<>We sit beside you. Not above you.</>, <>Vi sitter bredvid er. Inte över er.</>)}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  "Not report consultants. Not demo builders. Engineers embedded in your operation, working alongside your process owners, building iteratively.",
                  "Inte rapport-konsulter. Inte demo-byggare. Ingenjörer som sitter med i er verksamhet, jobbar bredvid era processägare, bygger iterativt."
                )}
              </p>
              <p>
                {L(
                  "Bi-weekly checkpoints. Continuous deployment. You see working software in week one, not month four.",
                  "Avstämning varannan vecka. Kontinuerlig produktion. Ni ser fungerande mjukvara vecka ett, inte månad fyra."
                )}
              </p>
            </div>
          </R>
        </div>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* STACK */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("What we build with", "Vad vi bygger med")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06 }}>
              {L(<>We don't build our own platform.</>, <>Vi bygger inte egen plattform.</>)}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  <>We use <strong style={{ color: "var(--ink)" }}>Anthropic Claude</strong> — the most capable AI model for business-critical reasoning — and inherit Anthropic's R&D instead of building our own. <strong style={{ color: "var(--ink)" }}>Microsoft Copilot</strong> as a complement where it fits.</>,
                  <>Vi använder <strong style={{ color: "var(--ink)" }}>Anthropic Claude</strong> — den mest kapabla AI-modellen för affärskritiska resonemang — och ärver Anthropics R&D istället för att bygga egen. <strong style={{ color: "var(--ink)" }}>Microsoft Copilot</strong> som komplement där det passar.</>
                )}
              </p>
              <p>
                {L(
                  "We choose the right tool per problem, not the right vendor per sale.",
                  "Vi väljer rätt verktyg per problem, inte rätt vendor per försäljning."
                )}
              </p>
            </div>
          </R>
        </div>
      </section>

      <div className="cfx-fade-line" style={{ margin: `0 ${pad}` }} />

      {/* USE CASES */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) 0 0 0` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 64 }}>
          <R>
            <div className="cfx-eyebrow" style={{ marginBottom: 32 }}>
              {L("What we build", "Vad vi bygger")}
            </div>
          </R>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06, maxWidth: "20em", marginBottom: 24 }}>
              {L(
                <>Ten cases where ERP stops and AI takes over.</>,
                <>Tio cases där ERP tar slut och AI tar vid.</>
              )}
            </h2>
          </R>
          <R delay={0.1}>
            <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "44em" }}>
              {L(
                "Each is a category we build production AI for — ranked by potential ROI, ERP gap depth, and competitive defensibility. We don't push any single case as flagship. We find which one delivers the most for your specific business — and start there.",
                "Var och en är en kategori vi bygger produktions-AI för — rangordnade efter potentiell ROI, ERP-brist och konkurrenssituation. Vi pushar inte något enskilt case som flaggskepp. Vi hittar vilken som ger mest värde för just er affär — och börjar där."
              )}
            </p>
          </R>
        </div>
        <div style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", margin: `0 ${pad}` }}>
          <div className="cfx-g2">
            {useCases.map((uc, i) => (
              <R key={uc.num} delay={Math.min(i * 0.03, 0.3)}>
                <div className="cfx-usecase">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <div className="cfx-uc-num">{uc.num}</div>
                    <div style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 500 }}>
                      {L("Competition:", "Konkurrens:")} <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{uc.competition}</span>
                    </div>
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
      </section>

      {/* WHO WE WORK WITH */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}`, background: "var(--ink)", color: "var(--bg)" }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48, color: "#D89E7A" }}>
            <span style={{ color: "#D89E7A" }}>{L("Who we work with", "Vilka vi jobbar med")}</span>
          </div>
        </R>
        <R delay={0.05}>
          <h2
            className="cfx-display"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05, maxWidth: "16em", marginBottom: 40 }}
          >
            {L(
              <>CEO-led companies, 150–500 employees, that want acceleration — not slides.</>,
              <>VD-ledda bolag, 150–500 anställda, som vill accelerera — inte få slides.</>
            )}
          </h2>
        </R>
        <R delay={0.12}>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              lineHeight: 1.7,
              color: "rgba(242,237,227,.7)",
              maxWidth: "44em",
            }}
          >
            {L(
              "Established businesses. Real operations. Complex enough that AI creates leverage. Small enough that the CEO is reachable. Big enough that it matters.",
              "Etablerade bolag. Verklig affär. Komplexa nog att AI ger hävstång. Små nog att VD är nåbar. Stora nog att det spelar roll."
            )}
          </p>
        </R>
      </section>

      {/* WHO WE'RE HIRING */}
      <section style={{ padding: `clamp(5rem,9vw,8rem) ${pad}` }}>
        <R>
          <div className="cfx-eyebrow" style={{ marginBottom: 48 }}>
            {L("Who we're looking for", "Vilka vi söker")}
          </div>
        </R>
        <div className="cfx-g2" style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "start" }}>
          <R delay={0.05}>
            <h2 className="cfx-display" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1.06 }}>
              {L(
                <>The sharpest consultants in the Nordics.</>,
                <>De vassaste konsulterna i Norden.</>
              )}
            </h2>
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--ink-2)" }}>
              <p style={{ marginBottom: 20 }}>
                {L(
                  "We hire people who understand that the difference between strategy and delivery is everything. Engineers who sit beside customers. People who actually understand what AI is and isn't.",
                  "Vi hyr människor som förstår att skillnaden mellan strategi och leverans är allt. Ingenjörer som sitter med kunden. Människor som faktiskt fattar vad AI är — och inte är."
                )}
              </p>
              <p style={{ marginBottom: 32 }}>
                {L(
                  "We hire for curiosity, depth, and the impatience to actually build.",
                  "Vi hyr för nyfikenhet, djup, och otåligheten att faktiskt bygga."
                )}
              </p>
              <a href="mailto:pontus.granborg@cloudfox.se?subject=Application" className="cfx-btn cfx-btn-ghost">
                {L("Apply →", "Sök →")}
              </a>
            </div>
          </R>
        </div>
      </section>

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
                {L(<>Let's find the highest-ROI case in your business.</>, <>Låt oss hitta ert case med högst ROI.</>)}
              </h2>
              <p style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "32em" }}>
                {L(
                  "Schedule 30 minutes. We'll walk through which cases would create the most acceleration for you — and what a collaboration would look like.",
                  "Boka 30 min. Vi går igenom vilka cases som ger störst acceleration hos er — och hur ett samarbete skulle se ut."
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
