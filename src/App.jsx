import React, { useState } from 'react';
import Header from './components/Header';
import ApiKeyModal from './components/ApiKeyModal';
import VisionScanner from './components/VisionScanner';
import InteractionRadar from './components/InteractionRadar';
import SafetyPassport from './components/SafetyPassport';
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

        {/* Tab 2: Interaction Radar & DDI Matrix */}
        {activeTab === 'radar' && (
          <InteractionRadar 
            activeCase={activeCase} 
            setActiveCase={setActiveCase} 
            onNavigateToScanner={() => setActiveTab('scanner')} 
          />
        )}

        {/* Tab 3: Safety Passport */}
        {activeTab === 'passport' && (
          <SafetyPassport 
            activeCase={activeCase} 
            setActiveCase={setActiveCase} 
          />
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
