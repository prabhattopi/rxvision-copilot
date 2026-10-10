import React, { useState } from 'react';
import { Key, Sparkles, ShieldCheck, ExternalLink, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, getStoredModel, setStoredModel, GEMINI_MODELS } from '../services/aiEngine';

export default function ApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [selectedModel, setSelectedModel] = useState(getStoredModel());
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey);
    setStoredModel(selectedModel);
    setStatusMessage({ type: 'success', text: apiKey ? 'API key saved securely in browser storage!' : 'Switched to Clinical Simulation mode.' });
    if (onKeyUpdated) onKeyUpdated();
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    setStatusMessage({ type: 'info', text: 'Key removed. Using Clinical Simulation Demo mode.' });
    if (onKeyUpdated) onKeyUpdated();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
              <Key size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Vision Model Settings</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>Free Tier Multimodal Configuration</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Tier Notice */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.4 }}>
            <strong style={{ color: '#34d399' }}>100% Free & No Credit Card Needed:</strong>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
              Google AI Studio provides free Gemini 2.0 / 1.5 Flash API keys without requiring any payment or credit card details.
            </p>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#38bdf8',
                textDecoration: 'none',
                fontWeight: 600,
                marginTop: '6px'
              }}
            >
              Get free Gemini API Key at Google AI Studio <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Key Input Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#cbd5e1' }}>
            Gemini API Key (Optional)
          </label>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="input-field"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
          />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Leave blank to use the built-in <strong>Clinical Demo Cases</strong> (preloaded realistic scenarios perfect for quick judging & zero latency).
          </p>
        </div>

        {/* Model Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#cbd5e1' }}>
            Model Engine
          </label>
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="input-field"
            style={{ cursor: 'pointer' }}
          >
            {GEMINI_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {statusMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '0.84rem',
            background: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
            color: statusMessage.type === 'success' ? '#34d399' : '#38bdf8',
            border: `1px solid ${statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`
          }}>
            <CheckCircle2 size={16} />
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            type="button" 
            onClick={handleClear}
            className="btn btn-secondary btn-sm"
          >
            Use Demo Mode Only
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleSave}
              className="btn btn-primary btn-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
