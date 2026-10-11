import React, { useState } from 'react';
import Header from './components/Header';
import ApiKeyModal from './components/ApiKeyModal';
import VisionScanner from './components/VisionScanner';
import { CLINICAL_DEMO_CASES } from './services/aiEngine';
import { Activity, ShieldAlert, FileText, Sparkles, AlertTriangle, ArrowRight, Camera, Pill, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(CLINICAL_DEMO_CASES[0]);
  const [keyUpdateTick, setKeyUpdateTick] = useState(0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        {/* Banner Alert for Emergency DDI Status */}
        {activeCase?.interactions?.[0]?.severity === 'CRITICAL' && (
          <div style={{
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.18) 0%, rgba(185, 28, 28, 0.08) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.25)', borderRadius: '10px', color: '#f87171' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-danger">Lethal Contraindication Detected</span>
                  <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Safety Score: {activeCase.safetyScore}/100</span>
                </div>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.88rem', color: '#fee2e2' }}>
                  <strong>{activeCase.interactions[0].pair}:</strong> {activeCase.interactions[0].risk}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('radar')}
              className="btn btn-danger btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Inspect Conflict</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Tab 1: Scanner View */}
        {activeTab === 'scanner' && (
          <VisionScanner 
            activeCase={activeCase} 
            setActiveCase={setActiveCase} 
            onNavigateToRadar={() => setActiveTab('radar')} 
          />
        )}

        {/* Tab 2: Radar Placeholder for Phase 4 */}
        {activeTab === 'radar' && (
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
            <ShieldAlert size={48} color="#f87171" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Cross-Drug Interaction Radar</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 20px auto' }}>
              Deep clinical pharmacological interaction matrices, severe bleed warnings, and contraindication graphs will be expanded in the upcoming phases.
            </p>
            <div style={{ display: 'inline-block', padding: '12px 20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <span style={{ color: '#fca5a5', fontWeight: 600 }}>Active Danger: {activeCase.interactions[0]?.pair}</span>
            </div>
          </div>
        )}

        {/* Tab 3: Passport Placeholder */}
        {activeTab === 'passport' && (
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
            <FileText size={48} color="#34d399" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Emergency Medication Passport</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 20px auto' }}>
              One-click printable and QR-scannable medical emergency card for first responders and family caregivers.
            </p>
          </div>
        )}

        {/* Tab 4: Hackathon Guide */}
        {activeTab === 'guide' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <Sparkles size={26} color="#c084fc" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Banana Hacks 2026 Presentation Story</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ color: '#38bdf8', marginBottom: '8px' }}>🎯 The Problem (First 30 seconds of video)</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Over 1.5 million preventable medication injuries occur every year. Elderly patients frequently take multiple prescriptions, mix up look-alike pills, or take dangerous over-the-counter drugs like Aspirin while on blood thinners like Warfarin.
                </p>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ color: '#34d399', marginBottom: '8px' }}>⚡ Image AI Pipeline (Next 60 seconds)</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  RxVision ingests photos of loose pills or messy handwritten doctor slips. Using multimodal vision models, it extracts drug names, strengths, and imprint identifiers, cross-referencing them against lethal interaction databases in real time.
                </p>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ color: '#c084fc', marginBottom: '8px' }}>🏆 Why It Wins</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Combines high-utility social impact, multimodal vision AI, zero-cost Google AI Studio free tier, zero latency, and an intuitive accessibility-first UI with plain-language summaries.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        background: 'rgba(7, 11, 20, 0.9)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>RxVision / PillGuard • Built for <strong>Banana Hacks 2026</strong> (Image AI Track)</span>
          <span>Google Gemini Multimodal Vision • Privacy & Patient Safety First</span>
        </div>
      </footer>

      {/* Settings Modal */}
      <ApiKeyModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onKeyUpdated={() => setKeyUpdateTick((t) => t + 1)}
      />
    </div>
  );
}
