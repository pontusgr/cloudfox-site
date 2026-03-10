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
    { n: "01", title: "Analys", text: "Vi kartlägger arbetsflödet, identifierar friktion och visar exakt var mjukvara, automation eller AI skapar snabbast operativ förbättring." },
    { n: "02", title: "Första fungerande version", text: "Inom 2–4 veckor levereras en användbar version som valideras i verklig drift — inte i kravmöten." },
    { n: "03", title: "Iteration och skalning", text: "Vi itererar snabbt baserat på feedback, integrerar med befintliga system och skalar utifrån mätbart affärsvärde." },
  ] : [
    { n: "01", title: "Analysis", text: "We map the workflow, identify friction and show exactly where software, automation or AI creates the fastest operational improvement." },
    { n: "02", title: "First working version", text: "Within 2–4 weeks we deliver a usable version validated in real operations — not in requirement meetings." },
    { n: "03", title: "Iteration & scale", text: "We iterate quickly based on feedback, integrate with existing systems and scale based on measurable business value." },
  ];

  const pillars = lang === "sv" ? [
    { title: "Upp till 80% snabbare", text: "AI‑driven utveckling med senior arkitektur minskar leveranstiden kraftigt. Projekt som tar månader kan levereras på veckor." },
    { title: "Bättre lösningar", text: "AI accelererar implementationen men erfarna arkitekter designar lösningen. Bättre arbetsflöden, renare arkitektur, rätt anpassning." },
    { title: "Betala bara när du är nöjd", text: "Vi levererar i milstolpar. Nöjd vid godkänd leverans = du betalar. Inte nöjd = vi itererar tills du är det. Möjligt för att AI‑native utveckling gör iteration radikalt billigare — en strukturell fördel som traditionella konsulter inte kan matcha." },
  ] : [
    { title: "Up to 80% faster", text: "AI‑native development with senior architecture dramatically compresses delivery. Months become weeks." },
    { title: "Better solutions", text: "AI accelerates implementation but experienced architects design the solution. Better workflows, cleaner architecture, right fit." },
    { title: "Pay only when satisfied", text: "We deliver in milestones. Satisfied at sign-off = you pay. Not satisfied = we iterate until you are. Possible because AI‑native development makes iteration radically cheaper — a structural advantage traditional consultants can't match." },
  ];

  /* Merged: "Engagements" + "What we build" → one strong section */
  const solutions = lang === "sv" ? [
    { title: "Workflow‑automation", text: "Ersätta manuella processer i e‑post, Excel och fristående system med strukturerade digitala arbetsflöden och tydligare ägarskap.", tag: "Automation" },
    { title: "ERP‑kompletteringar", text: "Praktiska applikationer runt ERP‑miljön för det standardsystemet inte täcker — godkännanden, rapportering, inköp, dokumenthantering.", tag: "Integration" },
    { title: "AI‑stödda verksamhetsflöden", text: "AI för dokumenthantering, klassificering, beslutsstöd och snabbare interna processer — där det ger praktiskt värde.", tag: "AI" },
  ] : [
    { title: "Workflow automation", text: "Replace manual processes in email, spreadsheets and disconnected systems with structured digital workflows and clearer ownership.", tag: "Automation" },
    { title: "ERP extensions", text: "Practical applications around the ERP for what the standard system doesn't cover — approvals, reporting, procurement, document handling.", tag: "Integration" },
    { title: "AI‑powered workflows", text: "AI for document processing, classification, decision support and faster internal processes — where it creates practical value.", tag: "AI" },
  ];

  const benefits = lang === "sv" ? [
    "Upp till 80% snabbare leverans jämfört med traditionella konsultprojekt",
    "Högre kvalitet genom senior arkitektstyrning i varje steg",
    "Noll risk — du betalar bara när du är nöjd med resultatet",
    "Fungerande första version inom veckor, inte månader",
  ] : [
    "Up to 80% faster delivery compared to traditional consulting",
    "Higher quality through senior architect oversight at every step",
    "Zero risk — you only pay when you're satisfied with the result",
    "Working first version in weeks, not months",
  ];

  /* Social proof */
  const proofPoints = lang === "sv" ? [
    { val: "20+", label: "års erfarenhet av ERP och verksamhetssystem" },
    { val: "100+", label: "levererade applikationer via traditionell utveckling och Power Platform" },
    { val: "80%", label: "snabbare leverans med AI‑accelererad metod" },
  ] : [
    { val: "20+", label: "years of ERP and operations experience" },
    { val: "100+", label: "applications delivered via traditional development and Power Platform" },
    { val: "80%", label: "faster delivery with AI‑accelerated methods" },
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
              {L("Get started", "Kom igång")}
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
            <Label>{L("AI‑accelerated delivery", "AI‑accelererad leverans")}</Label>
          </R>
          <R delay={0.04}>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1.05 }}>
              {L("Build operational software up to 80% faster ", "Bygg verksamhets\u00ADapplikationer upp till 80% snabbare ")}
              <span style={{ color: ac }}>{L("without risk.", "utan risk.")}</span>
            </h1>
          </R>
          <R delay={0.08}>
            <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.65, color: m, maxWidth: "52em" }}>
              {L(
                "We help companies replace slow consulting projects with faster delivery of internal tools, automation and operational software. You pay only when satisfied — made possible by AI‑native development that makes iteration radically cheaper.",
                "Vi hjälper företag ersätta långsamma konsultprojekt med snabbare leverans av interna applikationer, automation och verksamhetsstöd. Du betalar bara när du är nöjd — möjligt tack vare AI‑native utveckling som gör iteration radikalt billigare."
              )}
            </p>
          </R>
          <R delay={0.12}>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#contact"
                className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff" }}>
                {L("Free workflow analysis", "Gratis workflow\u2011analys")} <span>→</span>
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
              { val: "80%", label: L("Faster delivery", "Snabbare leverans") },
              { val: "2–4", label: L("Weeks to first version", "Veckor till första version") },
              { val: "0 kr", label: L("If you're not satisfied", "Om du inte är nöjd") },
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
            <H2>{L("From idea to production in three steps.", "Från idé till produktion i tre steg.")}</H2>
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
            <H2>{L("What we build and deliver.", "Vad vi bygger och levererar.")}</H2>
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

      {/* ── WHY CLOUDFOX — benefits split ── */}
      <section style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ borderTop: bdr }}>
          <div className="cx3-split">
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}`, borderRight: bdr }}>
              <R><H2>{L("Why companies switch to this model.", "Varför företag byter till den här modellen.")}</H2></R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              {benefits.map((b, i) => (
                <R key={b} delay={i * 0.03}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderBottom: i < benefits.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ color: ac, fontWeight: 800, fontSize: 18, lineHeight: 1.4 }}>›</span>
                    <span style={{ fontSize: 16, lineHeight: 1.55, color: lt }}>{b}</span>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD — social proof ── */}
      <section id="track-record" style={{ paddingTop: `clamp(4rem, 6vw, 6rem)` }}>
        <div style={{ padding: `0 ${pad}`, marginBottom: 40 }}>
          <R>
            <Label>{L("Track record", "Meriter")}</Label>
            <H2>{L("Experience that delivers.", "Erfarenhet som levererar.")}</H2>
          </R>
        </div>
        <div style={{ borderTop: bdr, borderBottom: bdr }}>
          <div className="cx3-g3">
            {proofPoints.map((p, i) => (
              <R key={i} delay={i * 0.05}>
                <div style={{ padding: `clamp(28px, 3vw, 48px) ${pad}`, borderRight: i < 2 ? bdr : "none" }}>
                  <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-.04em", color: ac, lineHeight: 1 }}>{p.val}</div>
                  <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.5, color: m }}>{p.label}</div>
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
              <R><H2>{L("Senior‑led delivery.", "Seniorledd leverans.")}</H2></R>
            </div>
            <div style={{ padding: `clamp(28px, 4vw, 48px) ${pad}` }}>
              <R delay={0.05}>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: m }}>
                  {L(
                    "Cloudfox is led by Pontus Granborg, a solution architect with 20+ years in ERP, operational software and business automation. Every engagement is personally led — no junior handoffs, no outsourced delivery.",
                    "Cloudfox leds av Pontus Granborg, lösningsarkitekt med 20+ års erfarenhet av ERP, verksamhetsapplikationer och automation. Varje uppdrag leds personligen — inga junioröverlämnanden, ingen outsourcad leverans."
                  )}
                </p>
                <a href="https://www.linkedin.com/in/pontusgranborg/" target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 24, fontSize: 15, fontWeight: 700, color: ac }}>
                  {L("View profile on LinkedIn", "Se profil på LinkedIn")} <span>↗</span>
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
                <H2>{L("Free workflow analysis.", "Gratis workflow\u2011analys.")}</H2>
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
                  "AI‑accelerated delivery of operational software. Based in Stockholm.",
                  "AI‑accelererad leverans av verksamhetsapplikationer. Baserat i Stockholm."
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
                  { label: L("Track record", "Meriter"), href: "#track-record" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>{link.label}</a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: d, marginBottom: 12 }}>{L("Connect", "Kontakt")}</div>
                <a href="https://www.linkedin.com/in/pontusgranborg/" target="_blank" rel="noreferrer" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>LinkedIn ↗</a>
                <a href="mailto:info@cloudfox.se" style={{ display: "block", fontSize: 14, color: m, marginBottom: 8 }}>info@cloudfox.se</a>
                <span style={{ display: "block", fontSize: 14, color: m }}>Stockholm, Sweden</span>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: d }}>© {new Date().getFullYear()} Cloudfox</span>
            <span style={{ fontSize: 12, color: d }}>{L("Built with AI‑accelerated methods", "Byggd med AI‑accelererade metoder")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
