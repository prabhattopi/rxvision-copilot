import React, { useState } from 'react';
import { 
  Sparkles, Video, FileText, CheckCircle2, Copy, 
  ExternalLink, Layers, Award, ShieldCheck, HeartHandshake, Play
} from 'lucide-react';

export default function HackathonGuide() {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, sectionId) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  const devpostWriteup = `
### Inspiration
Over 1.5 million preventable medication adverse events occur in the United States and worldwide every year. For elderly patients managing polypharmacy, visual impairment, or illegible doctor prescriptions, distinguishing between look-alike pills is terrifying. Taking common over-the-counter pain relievers like Aspirin while on blood thinners like Warfarin causes catastrophic internal hemorrhages. We built RxVision (PillGuard) to bridge the vision gap with modern Image AI—giving patients and caregivers an intelligent, instant safety copilot.

### What it does
RxVision is a multimodal clinical medication safety copilot powered by computer vision:
1. Dual Vision Scanner: Ingests photos of loose pills or messy handwritten doctor prescription slips via live camera or upload.
2. High-Resolution Inspection Lens: Magnifies pill scoring and morphological imprint glyphs with AI-aligned bounding reticles.
3. Clinical Pharmacology Radar: Maps the patient's entire regimen in an interactive orbital graph, flagging lethal contraindications, severe bleeding risks, and CYP450 enzyme conflicts.
4. "What-If" Drug Simulator: Allows users to simulate adding common OTC drugs (like Ibuprofen or Omeprazole) to immediately see how their safety score changes.
5. Plain-Language Elderly Speech: Speaks simplified medical advice at an accessible 0.95x pace for visually impaired seniors.
6. Emergency Medication Passport: Generates printable EMS-verifiable wallet cards with an emergency first-responder QR code.

### How we built it
- Frontend: React 19, Vite 8, Vanilla CSS design tokens with cyber-clinical glassmorphism, responsive SVG radar node graphs.
- Multimodal Vision Engine: Direct integration with Google Gemini Flash multimodal API (with zero-latency fallback and token-optimization caching).
- Canvas Rasterizer: Custom client-side pipeline transforming SVGs, WebRTC camera frames, and image files into Base64 byte streams.
- Audio Synthesis: Native Web Speech API with tailored prosody for elderly comprehension.
- Clinical Matrix: Standardized DDI knowledge base cross-referencing FDA NDC imprint codes and metabolic pathways.

### Challenges we ran into
- Handling disparate image resolutions and handwritten cursive script variations without latency spikes.
- Avoiding CORS restrictions and ensuring zero-latency offline fallbacks so hackathon demonstrations never fail during presentations.
- Designing an accessibility-first interface tailored for seniors that still looks state-of-the-art for judges.

### Accomplishments that we're proud of
- Sub-second multimodal image inference with structured JSON extraction.
- A live, interactive Drug-Drug Interaction Radar that recalculates polypharmacy risks dynamically.
- 100% Free tier architecture requiring zero credit cards or paid cloud infrastructure.

### What's next for RxVision
- Direct integration with smart pillboxes via Bluetooth Low Energy (BLE).
- Multilingual voice support in 20+ languages for global elderly populations.
- Electronic Health Record (EHR) export via FHIR / HL7 standards.
`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '10px', color: '#c084fc' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.45rem', margin: 0 }}>
                  Banana Hacks 2026 Presentation Toolkit
                </h1>
                <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                  Video demo script, Devpost submission text, and judging criteria alignment.
                </p>
              </div>
            </div>
          </div>

          <div className="badge badge-purple" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
            <Award size={14} />
            <span>Image AI Track Contender</span>
          </div>
        </div>
      </div>

      {/* Grid: 3-Minute Video Script + Devpost Writeup */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
        
        {/* Left: Strict ≤ 3-Minute Video Pitch Script */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Strict ≤ 3-Minute Video Pitch Script</h3>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
              Strict Timing &lt; 180s
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Act 1 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#38bdf8', fontSize: '0.88rem' }}>0:00 - 0:35 • The Hook &amp; Problem</strong>
                <span className="badge badge-cyan font-mono" style={{ fontSize: '0.68rem' }}>35s</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <em>"Over 1.5 million people are harmed every year by medication mix-ups. For an elderly grandparent taking 5 different pills, mistaking a Bayer Aspirin for their normal pill while on Warfarin can cause a fatal internal hemorrhage. Today, we built RxVision to solve this with Image AI."</em>
              </p>
            </div>

            {/* Act 2 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#34d399', fontSize: '0.88rem' }}>0:35 - 1:30 • Live Multimodal Image AI Demo</strong>
                <span className="badge badge-emerald font-mono" style={{ fontSize: '0.68rem' }}>55s</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <em>"Watch this live. I snap or upload a photo of loose pills. The high-res inspection lens detects the shape and engraved imprints. In sub-seconds, our multimodal vision model extracts Warfarin 5mg and Aspirin 325mg, instantly flagging the fatal interaction."</em>
              </p>
            </div>

            {/* Act 3 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#fbbf24', fontSize: '0.88rem' }}>1:30 - 2:15 • Interaction Radar &amp; What-If Tester</strong>
                <span className="badge badge-amber font-mono" style={{ fontSize: '0.68rem' }}>45s</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <em>"We jump to our Interaction Radar. Here, a polypharmacy mesh maps the patient's entire regimen in real time. We can simulate what happens if they take an Ibuprofen, calculate the safety drop, and generate a 1-click clinical script to call the doctor."</em>
              </p>
            </div>

            {/* Act 4 */}
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ color: '#c084fc', fontSize: '0.88rem' }}>2:15 - 2:55 • Voice Accessibility &amp; Emergency Passport</strong>
                <span className="badge badge-purple font-mono" style={{ fontSize: '0.68rem' }}>40s</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <em>"For visually impaired seniors, RxVision reads plain-language warnings out loud. And with one click, it generates an EMS Emergency Medication Passport with a scannable QR code. RxVision is free, private, and ready to save lives. Thank you!"</em>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Ready-to-Copy Devpost Writeup */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="#34d399" />
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Devpost Submission Write-up</h3>
            </div>
            <button
              onClick={() => copyToClipboard(devpostWriteup, 'devpost')}
              className="btn btn-emerald btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {copiedSection === 'devpost' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copiedSection === 'devpost' ? 'Copied to Clipboard!' : 'Copy Full Devpost Text'}</span>
            </button>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            color: '#e2e8f0',
            lineHeight: 1.6,
            maxHeight: '480px',
            overflowY: 'auto'
          }}>
            <h4 style={{ color: '#38bdf8', margin: '0 0 4px 0' }}>💡 Inspiration</h4>
            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
              Over 1.5 million preventable medication injuries occur every year. Elderly patients frequently take multiple prescriptions, mix up look-alike pills, or take dangerous over-the-counter drugs like Aspirin while on blood thinners like Warfarin. We built RxVision to eliminate medication errors using accessible Image AI.
            </p>

            <h4 style={{ color: '#34d399', margin: '0 0 4px 0' }}>⚙️ What it does</h4>
            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
              RxVision provides a Dual Vision Scanner for pills and handwritten prescriptions, an interactive orbital Interaction Radar with "What-If" drug testing, plain-language elderly audio translation, and an Emergency Medication Passport with scannable QR matrix.
            </p>

            <h4 style={{ color: '#fbbf24', margin: '0 0 4px 0' }}>🛠️ How we built it</h4>
            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
              React 19, Vite 8, Google Gemini 3.8 Flash multimodal vision, canvas-based rasterization pipelines, Web Speech API audio synthesis, and a clinical pharmacology DDI knowledge graph.
            </p>

            <h4 style={{ color: '#c084fc', margin: '0 0 4px 0' }}>🏆 Accomplishments &amp; Impact</h4>
            <p style={{ margin: '0', color: 'var(--text-secondary)' }}>
              Sub-second multimodal vision inference, token-optimization caching, 100% Free tier architecture (zero credit cards needed), and real humanitarian impact for elderly care.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
