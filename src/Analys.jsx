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

export default function Analys() {
  const [lang, setLang] = useState("sv");
  const [form, setForm] = useState({ name: "", company: "", email: "", systems: "" });
  const [sent, setSent] = useState(false);

  const L = (en, sv) => lang === "sv" ? sv : en;

  const ac = "#4F7FFF";
  const m = "#9CA3AF";
  const d = "#6B7280";
  const lt = "#E5E7EB";
  const bdr = "1px solid rgba(255,255,255,.08)";
  const pad = "clamp(20px, 5vw, 72px)";

  useEffect(() => {
    if (document.getElementById("cf-f3")) return;
    const l = document.createElement("link"); l.id = "cf-f3"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap";
    document.head.appendChild(l);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xjgayrzr", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...form, subject: "Build vs. Buy-analys" }),
    });
    setSent(true);
  };

  const steps = lang === "sv" ? [
    {
      n: "01",
      title: "Discovery — 30 minuter",
      items: [
        "Övergripande bild av era system och kostnader",
        "Var läggs tid manuellt som borde vara automatiserat?",
        "Vi bedömer om det finns ett tydligt case att gå vidare med",
        "Vid behov bokar vi ett fördjupningsmöte på 60 minuter för att kartlägga processer i detalj",
      ],
    },
    {
      n: "02",
      title: "Analys — ni gör ingenting",
      items: [
        "Vi sammanställer era faktiska licens- och driftkostnader",
        "Vi räknar på den dolda kostnaden för manuellt arbete",
        "Vi identifierar var ett eget system ger bättre passform",
        "Vi beräknar break-even — när betalar investeringen tillbaka sig?",
      ],
    },
    {
      n: "03",
      title: "Presentation — 30 minuter",
      items: [
        "Era egna siffror — konkret och visuellt",
        "Rekommendation: bygg, behåll eller byt",
        "Prioriterat åtgärdsförslag om det finns ett tydligt fall",
        "Ni beslutar — utan press, utan åtagande",
      ],
    },
  ] : [
    {
      n: "01",
      title: "Discovery — 30 minutes",
      items: [
        "An overview of your systems and costs",
        "Where is time spent manually that should be automated?",
        "We assess whether there is a clear case to proceed with",
        "If needed, we schedule a 60-minute follow-up to map processes in detail",
      ],
    },
    {
      n: "02",
      title: "Analysis — you do nothing",
      items: [
        "We compile your actual licence and operating costs",
        "We calculate the hidden cost of manual work",
        "We identify where a custom solution gives better fit",
        "We calculate break-even — when does the investment pay back?",
      ],
    },
    {
      n: "03",
      title: "Presentation — 30 minutes",
      items: [
        "Your own numbers — concrete and visual",
        "Recommendation: build, keep or replace",
        "Prioritised action proposal if there is a clear case",
        "You decide — no pressure, no commitment",
      ],
    },
  ];

  return (
    <div className="cx3" style={{ background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#fff" }}>
      <style>{`
        .cx3{--a:#4F7FFF;--bg:#000;--s:'DM Sans',system-ui,sans-serif;font-family:var(--s);color:#fff}
        *{box-sizing:border-box;margin:0;padding:0}
        .cx3-btn{display:inline-flex;align-items:center;gap:6px;border-radius:4px;font-family:var(--s);cursor:pointer;text-decoration:none;border:none;transition:opacity .15s}
        .cx3-btn:hover{opacity:.85}
        input,textarea{font-family:'DM Sans',system-ui,sans-serif}
        input::placeholder,textarea::placeholder{color:#6B7280}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(0,0,0,.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: bdr }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, padding: `0 ${pad}` }}>
          <a href="/" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-.04em", color: "#fff", textDecoration: "none" }}>
            cloudfox<span style={{ color: ac }}>.</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {["sv", "en"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 10px", fontSize: 12, fontWeight: lang === l ? 700 : 400, textTransform: "uppercase",
                  background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', system-ui",
                  color: lang === l ? "#fff" : d, borderBottom: lang === l ? `2px solid ${ac}` : "2px solid transparent",
                }}>{l}</button>
              ))}
            </div>
            <a href="/#contact" className="cx3-btn" style={{ fontSize: 13, padding: "8px 22px", background: ac, color: "#fff" }}>
              {L("Book a call", "Boka ett samtal")}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: `clamp(3rem, 6vw, 5rem) ${pad} clamp(2rem, 4vw, 3rem)` }}>
        <R>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: ac, marginBottom: 20 }}>
            {L("Free offer · Strategic advisory", "Kostnadsfritt erbjudande · Strategisk rådgivning")}
          </div>
        </R>
        <R delay={0.04}>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.05, maxWidth: "16ch" }}>
            {L("Build vs. Buy", "Build vs. Buy")}<span style={{ color: ac }}>.</span><br />
            {L("Analysis.", "Analys.")}
          </h1>
        </R>
        <R delay={0.08}>
          <p style={{ marginTop: 28, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.65, color: m, maxWidth: "52ch" }}>
            {L(
              "A structured analysis that shows what your current systems actually cost — and whether building is the smarter decision. Worth 15 000–20 000 SEK. At no cost to you.",
              "Ett strukturerat underlag som visar vad era nuvarande system faktiskt kostar — och om det är smartare att bygga. Värt 15 000–20 000 kr. Utan kostnad för er."
            )}
          </p>
        </R>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(3rem, 5vw, 4rem) ${pad}`, marginBottom: 0 }}>
          <R>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: d, marginBottom: 32 }}>
              {L("What the analysis includes", "Vad analysen innehåller")}
            </div>
          </R>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0, borderTop: bdr }}>
            {steps.map((step, i) => (
              <R key={step.n} delay={i * 0.05}>
                <div style={{ padding: "clamp(28px, 3vw, 40px) clamp(20px, 3vw, 40px)", borderRight: i < 2 ? bdr : "none", borderBottom: bdr }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: ac, marginBottom: 12 }}>{step.n}</div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 20 }}>{step.title}</h3>
                  {step.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <span style={{ color: ac, fontWeight: 700, fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: 14, lineHeight: 1.6, color: m }}>{item}</span>
                    </div>
                  ))}
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET OUT */}
      <section style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(3rem, 5vw, 4rem) ${pad}` }}>
          <R>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: d, marginBottom: 24 }}>
              {L("You receive", "Ni får")}
            </div>
          </R>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {(lang === "sv" ? [
              "Sammanställning av era faktiska system- och licenskostnader",
              "Beräkning av dold kostnad för manuellt arbete",
              "Break-even-kalkyl: bygg vs. fortsätt hyra",
              "Konkret rekommendation — bygg, behåll eller byt",
            ] : [
              "Summary of your actual system and licence costs",
              "Calculation of hidden cost from manual work",
              "Break-even model: build vs. continue renting",
              "Concrete recommendation — build, keep or replace",
            ]).map((item, i) => (
              <R key={i} delay={i * 0.04}>
                <div style={{ padding: "20px 24px", border: "1px solid rgba(79,127,255,.2)", borderRadius: 6, background: "rgba(79,127,255,.03)" }}>
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: lt }}>{item}</span>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATION */}
      <section style={{ borderTop: bdr }}>
        <div style={{ padding: `clamp(2rem, 4vw, 3rem) ${pad}` }}>
          <R>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: m, maxWidth: "60ch" }}>
              {L(
                "The analysis is offered to operational companies with at least one business system or SaaS subscription. Depending on the size and complexity of your organisation, the analysis covers either the whole business or a specific operational area — we agree on the scope in the first meeting. We require a genuine interest in evaluating the situation — not a commitment to proceed.",
                "Analysen riktar sig till operativa bolag med minst ett affärssystem eller SaaS-abonnemang. Beroende på organisationens storlek och komplexitet täcker analysen antingen hela verksamheten eller ett specifikt verksamhetsområde — vi kommer överens om scope i det första mötet. Vi förutsätter ett genuint intresse av att utvärdera situationen — inte ett åtagande att gå vidare."
              )}
            </p>
          </R>
        </div>
      </section>

      {/* FORM */}
      <section id="request" style={{ borderTop: bdr, background: "rgba(79,127,255,.03)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: `clamp(40px, 5vw, 64px) ${pad}`, borderRight: bdr }}>
            <R>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.05 }}>
                {L("Request an analysis.", "Begär en analys.")}
              </h2>
              <p style={{ marginTop: 16, fontSize: 14, color: d, lineHeight: 1.65 }}>
                {L(
                  "Fill in your details and we will contact you within one business day to confirm and book the discovery meeting.",
                  "Fyll i era uppgifter så kontaktar vi er inom en arbetsdag för att bekräfta och boka discovery-mötet."
                )}
              </p>
              <p style={{ marginTop: 12, fontSize: 14, color: d }}>
                {L("Or contact Pontus Granborg directly — ", "Eller kontakta Pontus Granborg direkt — ")}
                <a href="tel:+46700901706" style={{ color: ac }}>070-090 17 06</a>
              </p>
            </R>
          </div>
          <div style={{ padding: `clamp(40px, 5vw, 64px) ${pad}` }}>
            <R delay={0.05}>
              {sent ? (
                <p style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>
                  {L("Thanks — we'll be in touch within one business day.", "Tack — vi hör av oss inom en arbetsdag.")}
                </p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { key: "name", placeholder: L("Your name", "Ditt namn"), type: "text" },
                    { key: "company", placeholder: L("Company", "Bolag"), type: "text" },
                    { key: "email", placeholder: L("Your email", "Din e-post"), type: "email" },
                  ].map(({ key, placeholder, type }) => (
                    <input key={key} type={type} placeholder={placeholder} required value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 15, outline: "none", width: "100%" }} />
                  ))}
                  <textarea
                    placeholder={L("Which systems do you pay licence fees for today?", "Vilka system betalar ni licens för idag?")}
                    required rows={4} value={form.systems}
                    onChange={e => setForm(f => ({ ...f, systems: e.target.value }))}
                    style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 15, outline: "none", width: "100%", resize: "vertical" }} />
                  <button type="submit" className="cx3-btn" style={{ padding: "14px 28px", fontSize: 15, background: ac, color: "#fff", alignSelf: "flex-start" }}>
                    {L("Submit request →", "Skicka förfrågan →")}
                  </button>
                </form>
              )}
            </R>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: bdr }}>
        <div style={{ padding: `24px ${pad}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-.04em", color: "#fff", textDecoration: "none" }}>
            cloudfox<span style={{ color: ac }}>.</span>
          </a>
          <span style={{ fontSize: 12, color: d }}>© {new Date().getFullYear()} Cloudfox · Stockholm</span>
        </div>
      </footer>
    </div>
  );
}
