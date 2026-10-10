import React from 'react';
import { Pill, Activity, ShieldAlert, FileText, Settings, Sparkles, Award } from 'lucide-react';
import { getStoredApiKey, getStoredModel } from '../services/aiEngine';

export default function Header({ activeTab, setActiveTab, onOpenSettings }) {
  const apiKey = getStoredApiKey();
  const currentModel = getStoredModel();

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(14, 165, 233, 0.1) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#38bdf8',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)'
          }}>
            <Pill size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Rx<span style={{ color: 'var(--cyan-light)' }}>Vision</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                PillGuard Copilot
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span className={`pulse-beacon ${apiKey ? 'online' : 'online'}`} />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                {apiKey ? `Live Multimodal (${currentModel.includes('2.0') ? 'Gemini 2.0' : 'Gemini 1.5'})` : 'Clinical Vision Engine (Zero-Latency Ready)'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '4px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('scanner')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'scanner' ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)' : 'transparent',
              color: activeTab === 'scanner' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: activeTab === 'scanner' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.86rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Activity size={16} color={activeTab === 'scanner' ? '#38bdf8' : 'currentColor'} />
            <span>Dual Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'radar' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)' : 'transparent',
              color: activeTab === 'radar' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: activeTab === 'radar' ? '1px solid rgba(248, 113, 113, 0.5)' : '1px solid transparent',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.86rem',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldAlert size={16} color={activeTab === 'radar' ? '#f87171' : 'currentColor'} />
            <span>Interaction Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'passport' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%)' : 'transparent',
              color: activeTab === 'passport' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: activeTab === 'passport' ? '1px solid rgba(52, 211, 153, 0.5)' : '1px solid transparent',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.86rem',
              transition: 'all 0.15s ease'
            }}
          >
            <FileText size={16} color={activeTab === 'passport' ? '#34d399' : 'currentColor'} />
            <span>Safety Passport</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'guide' ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(126, 34, 206, 0.15) 100%)' : 'transparent',
              color: activeTab === 'guide' ? '#ffffff' : 'var(--text-secondary)',
              borderBottom: activeTab === 'guide' ? '1px solid rgba(192, 132, 252, 0.5)' : '1px solid transparent',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.86rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Sparkles size={16} color={activeTab === 'guide' ? '#c084fc' : 'currentColor'} />
            <span>Hackathon Guide</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="badge badge-emerald" style={{ display: 'none', md: 'flex' }}>
            <Award size={14} />
            <span>Banana Hacks 2026</span>
          </div>

          <button
            onClick={onOpenSettings}
            className="btn btn-secondary btn-sm"
            title="Configure Gemini API Key / Model"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Settings size={15} />
            <span>AI Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
