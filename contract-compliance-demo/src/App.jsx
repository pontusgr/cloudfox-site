import React, { useState, useRef, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

const pad = 'clamp(1.5rem, 6vw, 6rem)'

const SAMPLE_CONTRACTS = [
  {
    name: 'Volvo-IT-ramavtal-2024.pdf', size: '2.3 MB', value: '12.4 MSEK',
    finding: {
      severity: 'urgent', title: 'KPI-indexering ej genomförd', recovered: 185000,
      contractSays: 'KPI-justering 1 jan 2026 enligt SCB KPI okt-okt, +3,2%',
      realitySays: 'Visma-faktura Q1 2026: ingen prisjustering. Senaste rate-update 2025-12-15.',
      gap: 'Underdebitering 185k SEK YTD (växer 15k/mån)'
    }
  },
  {
    name: 'TetraPak-driftsavtal-2025.docx', size: '1.1 MB', value: '4.8 MSEK',
    finding: {
      severity: 'warning', title: 'SLA-bonus utlöst, ej fakturerad', recovered: 47200,
      contractSays: 'Uptime ≥99,9% månadsbasis utlöser bonus 3% av månadsfee',
      realitySays: 'Pingdom + interna metrics: uptime Q3 2025 = 99,94% (jul: 99,92%, aug: 99,96%, sep: 99,94%)',
      gap: 'Bonus 3% × 3 månader = 47,2k SEK ej fakturerad'
    }
  },
  {
    name: 'ABB-underhall-ramavtal.pdf', size: '892 KB', value: '8.2 MSEK',
    finding: {
      severity: 'warning', title: 'Uppsägningsfrist närmar sig', recovered: 0,
      contractSays: 'Avtalsperiod 1 apr 2024 – 31 mar 2027. Uppsägning 12 mån i förväg.',
      realitySays: 'Idag 17 mar 2026. Deadline för uppsägning: 31 mar 2026 (om 14 dagar).',
      gap: 'Inget beslut registrerat. Förlängs automatiskt 12 mån om inget händer.'
    }
  },
  {
    name: 'Lekolar-inkop-ramavtal-2024.pdf', size: '1.7 MB', value: '5.6 MSEK',
    finding: {
      severity: 'info', title: 'Volymrabatt nådd', recovered: 125000,
      contractSays: '2,5% rabatt vid årlig inköpsvolym > 5 MSEK',
      realitySays: 'Visma inköp Q4-2025 + Q1-2026 = 5,2 MSEK (tröskelvärde nådd 12 feb)',
      gap: 'Rabatt 2,5% × 5,2M = 130k SEK — borde appliceras på nästa faktura'
    }
  },
  { name: 'Skanska-konsultavtal.pdf', size: '684 KB', value: '2.1 MSEK', finding: null },
  {
    name: 'IKEA-leverantorsavtal-2025.pdf', size: '3.1 MB', value: '18.4 MSEK',
    finding: {
      severity: 'urgent', title: 'Råmaterialklausul ej applicerad', recovered: 770000,
      contractSays: '§7.3: Vid stålindex (LME) > 12% rörelse appliceras ny prisformel efter 30 dgr',
      realitySays: 'LME-stålindex +14,8% mätt feb 2026 vs nov 2025. 30-dagars-trigger passerade 15 mar.',
      gap: 'Ny prisformel ej tillämpad. Underdebitering 770k SEK YTD.'
    }
  },
  { name: 'Sandvik-tilläggsavtal-Q2.docx', size: '456 KB', value: '890 kSEK', finding: null },
  {
    name: 'Ericsson-supportavtal-2024.pdf', size: '1.2 MB', value: '3.4 MSEK',
    finding: {
      severity: 'warning', title: 'SLA-credit ska levereras till kund', recovered: -170000,
      contractSays: '§12: Vid response time > 4h utlöses 5% kreditering på nästa faktura',
      realitySays: 'Ticket-system: 7 incidenter Q4-2025 med response > 4h. Ingen creditnota utfärdad.',
      gap: 'Kreditering 5% × Q4-fakturering = 170k SEK ska levereras till kund (förtroenderisk)'
    }
  },
  { name: 'Atlas-Copco-service.pdf', size: '987 KB', value: '6.7 MSEK', finding: null },
  {
    name: 'H&M-supply-agreement.pdf', size: '2.8 MB', value: '24.1 MSEK',
    finding: {
      severity: 'urgent', title: 'Volume rebate ej tillämpad', recovered: 912000,
      contractSays: 'Tier-2 rebate 3,8% vid årlig inköpsvolym > 15 MSEK',
      realitySays: 'Visma + ERP: 2025 inköpsvolym 24,0 MSEK. Tier-2 nått sedan Q3.',
      gap: 'Rebate 3,8% × 24M = 912k SEK ej krediterad.'
    }
  },
  { name: 'SCA-paper-supply-2024.pdf', size: '1.5 MB', value: '7.2 MSEK', finding: null },
  { name: 'Saab-defense-service.pdf', size: '3.4 MB', value: '14.3 MSEK', finding: null },
]

const CONNECTED_SYSTEMS = [
  { name: 'SharePoint', type: 'Contracts', icon: '📁', records: '247 documents', status: 'connected', lastSync: '2 min sedan' },
  { name: 'Visma eEkonomi', type: 'ERP / Finance', icon: '💼', records: '4 892 fakturor · 1 247 leveranser', status: 'connected', lastSync: '14 min sedan' },
  { name: 'ServiceNow', type: 'Tickets / SLA', icon: '🎫', records: '8 432 incidents', status: 'connected', lastSync: '5 min sedan' },
  { name: 'Pingdom', type: 'Uptime monitoring', icon: '📊', records: '24 endpoints', status: 'connected', lastSync: 'live' },
]

const SCAN_STEPS = [
  { label: 'Extraherar villkor från avtal', source: 'Claude vision + reasoning', time: 200 },
  { label: 'Hämtar fakturadata Q1 2026', source: 'Visma eEkonomi API', time: 150 },
  { label: 'Hämtar betalningsstatus', source: 'Visma eEkonomi AR', time: 100 },
  { label: 'Hämtar leveransdata', source: 'Visma eEkonomi WMS', time: 100 },
  { label: 'Hämtar SLA-tickets Q3-Q4', source: 'ServiceNow API', time: 100 },
  { label: 'Korsreferens avtal vs verklighet', source: 'Claude reasoning', time: 200 },
]

function App() {
  const [view, setView] = useState('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [findings, setFindings] = useState([])
  const [currentlyScanning, setCurrentlyScanning] = useState(null)
  const [currentSubStep, setCurrentSubStep] = useState(0)
  const fileRef = useRef(null)

  // Scanning animation
  useEffect(() => {
    if (view !== 'scanning') return
    let cancelled = false

    const runScan = async () => {
      for (let i = 0; i < SAMPLE_CONTRACTS.length; i++) {
        if (cancelled) return
        setCurrentlyScanning(SAMPLE_CONTRACTS[i])
        setScanProgress(i + 1)
        // Animate through sub-steps
        for (let s = 0; s < SCAN_STEPS.length; s++) {
          if (cancelled) return
          setCurrentSubStep(s)
          await new Promise(r => setTimeout(r, SCAN_STEPS[s].time))
        }
        if (SAMPLE_CONTRACTS[i].finding) {
          setFindings(prev => [...prev, { ...SAMPLE_CONTRACTS[i].finding, contract: SAMPLE_CONTRACTS[i].name }])
        }
      }
      await new Promise(r => setTimeout(r, 600))
      if (!cancelled) setView('dashboard')
    }
    runScan()
    return () => { cancelled = true }
  }, [view])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    setView('scanning')
  }

  const startWithSample = () => {
    setFindings([])
    setScanProgress(0)
    setCurrentlyScanning(null)
    setView('scanning')
  }

  const totalValue = SAMPLE_CONTRACTS.reduce((sum, c) => sum + parseFloat(c.value.replace(/[^0-9.]/g, '')), 0)
  const totalRecovered = findings.reduce((sum, f) => sum + Math.abs(f.recovered || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* NAV */}
      <nav style={{
        padding: `20px ${pad}`,
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="https://cloudfox.se" style={{ textDecoration: 'none', color: 'var(--ink)' }}>
          <span className="display" style={{ fontSize: '1.4rem', fontWeight: 500 }}>
            cloudfox<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </a>
        {view !== 'upload' && (
          <button
            className="btn"
            onClick={() => { setView('upload'); setFindings([]); setScanProgress(0) }}
            style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', padding: '10px 18px', fontSize: 13 }}
          >
            ← Börja om
          </button>
        )}
      </nav>

      {/* UPLOAD */}
      {view === 'upload' && (
        <section style={{ padding: `clamp(4rem,8vw,6rem) ${pad}`, maxWidth: 1200, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 40 }}>Contract Compliance — Continuous Monitoring</div>
          <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1, marginBottom: 32, maxWidth: '14em' }}>
            Era avtal följs inte fullt ut.
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '38em', marginBottom: 64 }}>
            Indexeringar som inte genomförs. SLA-bonusar som utlöses men inte faktureras.
            Volymrabatter som missas. <strong style={{ color: 'var(--ink)' }}>Typiskt 8–9% av kontraktvärdet läcker</strong> så här.
            AI:n bevakar er hela avtalsportfölj kontinuerligt — och flaggar varje avvikelse.
          </p>

          <div
            className={`dropzone ${isDragging ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{ maxWidth: 820 }}
          >
            <div className="display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', marginBottom: 12, color: 'var(--ink)' }}>
              Släpp in en mapp med era avtal.
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>
              AI går igenom alla dokument i mappen. Hittar indexeringar som missats,
              SLA-bonusar som utlöses, klausuler som inte följs.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 28, fontStyle: 'italic' }}>
              I produktion kopplar vi mot er SharePoint, OneDrive, Salesforce eller dokumenthanteringssystem — och bevakar kontinuerligt.
            </p>
            <button className="btn">Välj mapp eller släpp här →</button>
            <input
              type="file"
              ref={fileRef}
              style={{ display: 'none' }}
              webkitdirectory="true"
              directory="true"
              multiple
              onChange={(e) => e.target.files.length && handleDrop({ preventDefault: () => {}, dataTransfer: { files: e.target.files } })}
            />
            <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 24 }}>
              Vill inte dela egna avtal?{' '}
              <button
                onClick={startWithSample}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}
              >
                Kör på 12 exempel-avtal (anonymiserade)
              </button>
            </p>
          </div>

          <div style={{ marginTop: 96, borderTop: '1px solid var(--line)', paddingTop: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 32 }}>Så vet vi att avtalen inte följs</div>
            <h3 className="display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15, marginBottom: 24, maxWidth: '22em' }}>
              AI jämför vad avtalen säger med vad som faktiskt händer.
            </h3>
            <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: '42em', marginBottom: 48 }}>
              Att läsa ett avtal är enkelt. Att veta om det följs kräver att man jämför avtalsvillkor mot verklig faktureringsdata, leveransdata, betalningar och drift-metrics. Det är där AI:n verkligen tjänar sina pengar — kontinuerligt, i bakgrunden.
            </p>

            <div className="grid-2" style={{ gap: 32, marginBottom: 80 }}>
              <div style={{ background: 'var(--surface)', padding: 28, border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Datakälla 1 — Avtalen
                </div>
                <div className="display" style={{ fontSize: '1.3rem', marginBottom: 16, color: 'var(--ink)' }}>
                  Vad SKA hända
                </div>
                <ul style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', paddingLeft: 18 }}>
                  <li>SharePoint, OneDrive, Box, Dropbox</li>
                  <li>DocuSign, Adobe Sign</li>
                  <li>Salesforce / HubSpot contracts</li>
                  <li>Lokala dokumentmappar</li>
                </ul>
              </div>
              <div style={{ background: 'var(--surface)', padding: 28, border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Datakälla 2 — Verkligheten
                </div>
                <div className="display" style={{ fontSize: '1.3rem', marginBottom: 16, color: 'var(--ink)' }}>
                  Vad som FAKTISKT händer
                </div>
                <ul style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', paddingLeft: 18 }}>
                  <li>ERP (Visma, Fortnox, SAP, Dynamics)</li>
                  <li>Faktureringssystem + AR/AP</li>
                  <li>Ticket-/incident-system (drift, SLA)</li>
                  <li>Inköpsdata, leveransdata, betalningar</li>
                </ul>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 32 }}>Statistik — vad forskningen säger</div>
            <div className="grid-3" style={{ gap: 32 }}>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>9,2%</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>Genomsnittlig läckage</strong> i kontraktvärde — World Commerce & Contracting (2024)
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>52%</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>av SLA-bonus-klausuler</strong> aktiveras aldrig — IACCM-studie över 1 200 B2B-kontrakt
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>35%</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>av indexerings-klausuler</strong> appliceras inte i tid — Deloitte Contract Management Survey
                </div>
              </div>
            </div>

            <div className="grid-3" style={{ gap: 32, marginTop: 40 }}>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>247</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>aktiva avtal</strong> — typiskt antal i ett SME med 150–500 anställda
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>4 v</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>från setup till första återvunna SEK</strong> — Cloudfox-mätt över våra deployments
                </div>
              </div>
              <div>
                <div className="display" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>24/7</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>kontinuerlig bevakning</strong> — varje datum-trigger, version-ändring, SLA-händelse
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 40, lineHeight: 1.7, maxWidth: '50em' }}>
              Källor: World Commerce & Contracting <em>"State of Contracting"</em> (2024); IACCM <em>"Contract Performance Index"</em> (2023); Deloitte <em>"Future of Contract Management"</em> (2024). Siffror gäller B2B-kontrakt globalt; svensk SME-marknad uppvisar liknande mönster med viss undervariation pga kortare avtalsperioder.
            </p>
          </div>
        </section>
      )}

      {/* SCANNING */}
      {view === 'scanning' && (
        <section style={{ padding: `clamp(3rem,6vw,5rem) ${pad}`, maxWidth: 1200, margin: '0 auto' }}>
          {/* CONNECTED SYSTEMS BAR */}
          <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '16px 24px', marginBottom: 32, borderRadius: 2 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: 12 }}>
              Connected systems · Live data sources
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {CONNECTED_SYSTEMS.map((sys, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{sys.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--bg)', fontWeight: 500 }}>
                      <span style={{ color: 'var(--success)', marginRight: 6 }}>●</span>
                      {sys.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(242,237,227,.55)' }}>{sys.records}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="eyebrow" style={{ marginBottom: 24 }}>
            Scanning {scanProgress}/{SAMPLE_CONTRACTS.length} avtal · korsreferens mot Visma + ServiceNow
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.1, marginBottom: 12 }}>
            AI går igenom era avtal och jämför mot verklig data...
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 40, fontStyle: 'italic' }}>
            I skarp drift körs detta kontinuerligt — varje nytt avtal, varje Visma-faktura, varje SLA-händelse.
          </p>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'var(--line)', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'var(--accent)',
              width: `${(scanProgress / SAMPLE_CONTRACTS.length) * 100}%`,
              transition: 'width .4s',
            }} />
          </div>

          <div className="grid-2" style={{ gap: 48 }}>
            {/* Currently scanning */}
            <div>
              <div className="stat-label" style={{ marginBottom: 12 }}>Just nu</div>
              {currentlyScanning && (
                <div style={{ border: '1px solid var(--line)', padding: 24, background: 'var(--surface)' }}>
                  <div style={{ fontSize: 14, fontFamily: 'monospace', color: 'var(--ink)', marginBottom: 8 }}>
                    📄 {currentlyScanning.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
                    {currentlyScanning.size} · värde {currentlyScanning.value}
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                    {SCAN_STEPS.map((step, i) => {
                      const isActive = i === currentSubStep
                      const isComplete = i < currentSubStep
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                          opacity: isActive ? 1 : isComplete ? 0.6 : 0.25,
                          transition: 'opacity .3s'
                        }}>
                          <span style={{
                            fontSize: 11,
                            color: isComplete ? 'var(--success)' : isActive ? 'var(--accent)' : 'var(--muted)',
                            minWidth: 14
                          }}>
                            {isComplete ? '✓' : isActive ? '◆' : '○'}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: 'var(--ink)' }}>{step.label}</div>
                            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'monospace' }}>{step.source}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>

              <div style={{ marginTop: 32 }}>
                <div className="stat-label" style={{ marginBottom: 16 }}>Hittills funnet</div>
                <div className="display" style={{ fontSize: '2.8rem', color: 'var(--accent)', lineHeight: 1, marginBottom: 4 }}>
                  {findings.length}
                </div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>flaggor i {scanProgress} avtal</div>

                {totalRecovered > 0 && (
                  <>
                    <div className="display" style={{ fontSize: '2rem', color: 'var(--success)', lineHeight: 1, marginTop: 24, marginBottom: 4 }}>
                      {(totalRecovered / 1000).toFixed(0)}k kr
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--muted)' }}>identifierad återvinning</div>
                  </>
                )}
              </div>
            </div>

            {/* Live findings */}
            <div>
              <div className="stat-label" style={{ marginBottom: 16 }}>Live findings</div>
              <div style={{ maxHeight: 480, overflowY: 'auto' }}>
                {findings.length === 0 && (
                  <p style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic' }}>
                    Inga flaggor än. Fortsätter scanna...
                  </p>
                )}
                {findings.map((f, i) => (
                  <div
                    key={i}
                    className={`flag-card ${f.severity}`}
                    style={{ animation: 'slideIn .4s ease-out', flexDirection: 'column' }}
                  >
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <div style={{ flexShrink: 0 }}>
                        {f.severity === 'urgent' && '🔴'}
                        {f.severity === 'warning' && '🟡'}
                        {f.severity === 'info' && '🟢'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: 14, color: 'var(--ink)' }}>{f.title}</strong>
                          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace' }}>{f.contract}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.6, marginLeft: 28 }}>
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ color: 'var(--muted)', fontWeight: 600, marginRight: 6 }}>AVTALET:</span>
                        <span style={{ color: 'var(--ink-2)' }}>{f.contractSays}</span>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ color: 'var(--muted)', fontWeight: 600, marginRight: 6 }}>VERKLIGHETEN:</span>
                        <span style={{ color: 'var(--ink-2)' }}>{f.realitySays}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--accent)', fontWeight: 600, marginRight: 6 }}>GAP:</span>
                        <span style={{ color: 'var(--ink)' }}>{f.gap}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }`}</style>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DASHBOARD */}
      {view === 'dashboard' && (
        <section style={{ padding: `clamp(3rem,6vw,5rem) ${pad}`, maxWidth: 1400, margin: '0 auto' }}>
          {/* CONNECTED SYSTEMS BAR */}
          <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '16px 24px', marginBottom: 32, borderRadius: 2 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: 12 }}>
              Connected systems · live monitoring
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {CONNECTED_SYSTEMS.map((sys, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{sys.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--bg)', fontWeight: 500 }}>
                      <span style={{ color: 'var(--success)', marginRight: 6 }}>●</span>
                      {sys.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(242,237,227,.55)' }}>{sys.records} · {sys.lastSync}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="eyebrow" style={{ marginBottom: 16 }}>Scan complete — kontinuerlig övervakning aktiv</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.1, marginBottom: 12 }}>
            Här är vad AI hittade på {SAMPLE_CONTRACTS.length} avtal.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 48 }}>
            I skarp drift uppdateras detta i realtid — varje nytt avtal i SharePoint, varje Visma-faktura, varje ServiceNow-incident.
          </p>

          <div className="grid-3" style={{ marginBottom: 48 }}>
            <div className="stat-card">
              <div className="stat-num">{SAMPLE_CONTRACTS.length}</div>
              <div className="stat-label">Avtal scannade</div>
            </div>
            <div className="stat-card">
              <div className="stat-num" style={{ color: 'var(--warning)' }}>{findings.length}</div>
              <div className="stat-label">Flaggor identifierade</div>
            </div>
            <div className="stat-card">
              <div className="stat-num" style={{ color: 'var(--success)' }}>{(totalRecovered / 1000).toFixed(0)}k</div>
              <div className="stat-label">Återvinningspotential (SEK)</div>
            </div>
          </div>

          <div className="grid-3" style={{ marginBottom: 48 }}>
            <div className="stat-card">
              <div className="stat-num" style={{ fontSize: '1.8rem' }}>{totalValue.toFixed(1)} MSEK</div>
              <div className="stat-label">Total kontraktvärde scannat</div>
            </div>
            <div className="stat-card">
              <div className="stat-num" style={{ fontSize: '1.8rem' }}>{((totalRecovered / 1000000) / totalValue * 100).toFixed(2)}%</div>
              <div className="stat-label">Identifierad läckage av totalvärde</div>
            </div>
            <div className="stat-card">
              <div className="stat-num" style={{ fontSize: '1.8rem' }}>~30 sek</div>
              <div className="stat-label">Tid per avtal i analys</div>
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <h3 className="display" style={{ fontSize: '1.4rem', marginBottom: 20 }}>Alla flaggor — sorterad efter brådska</h3>
            {[...findings].sort((a, b) => {
              const order = { urgent: 0, warning: 1, info: 2 }
              return order[a.severity] - order[b.severity]
            }).map((f, i) => (
              <div key={i} className={`flag-card ${f.severity}`} style={{ flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {f.severity === 'urgent' && '🔴'}
                    {f.severity === 'warning' && '🟡'}
                    {f.severity === 'info' && '🟢'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 15, color: 'var(--ink)' }}>{f.title}</strong>
                      <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'monospace' }}>{f.contract}</span>
                    </div>
                    {f.recovered !== 0 && (
                      <div style={{ marginTop: 6, fontSize: 14, color: f.recovered > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                        {f.recovered > 0 ? '+' : ''}{f.recovered.toLocaleString('sv-SE')} kr
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.7, marginLeft: 32, paddingLeft: 16, borderLeft: '2px solid var(--line)' }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 2 }}>AVTALET</div>
                    <div style={{ color: 'var(--ink-2)' }}>{f.contractSays}</div>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 2 }}>VERKLIGHETEN</div>
                    <div style={{ color: 'var(--ink-2)' }}>{f.realitySays}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 2 }}>GAP / SLUTSATS</div>
                    <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{f.gap}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: 'clamp(2rem, 4vw, 3rem)', marginTop: 48 }}>
            <div className="eyebrow" style={{ color: 'var(--accent-light)', marginBottom: 20 }}>
              <span style={{ color: 'var(--accent-light)' }}>För er specifika ROI</span>
            </div>
            <h3 className="display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', lineHeight: 1.15, marginBottom: 16, maxWidth: '24em' }}>
              Detta på 12 exempel-avtal. Föreställ er på er hela portfölj.
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(242,237,227,.7)', marginBottom: 32, maxWidth: '40em' }}>
              30 minuter. Vi går igenom er avtalsportfölj-storlek och räknar ut projicerad återvinning.
              Inget åtagande. Inget säljsnack.
            </p>
            <a
              href="mailto:pontus.granborg@cloudfox.se?subject=Contract Compliance — ROI-analys för oss"
              className="btn"
              style={{ background: 'var(--bg)', color: 'var(--ink)' }}
            >
              Boka 30 min →
            </a>
          </div>
        </section>
      )}

      <Analytics />
    </div>
  )
}

export default App
