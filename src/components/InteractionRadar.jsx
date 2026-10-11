import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, AlertTriangle, CheckCircle2, Plus, Trash2, 
  RefreshCw, Info, ArrowRight, Zap, Activity, Filter, Sparkles, PhoneCall
} from 'lucide-react';
import { COMMON_TEST_DRUGS, calculateRegimenInteractions } from '../services/ddiMatrix';

export default function InteractionRadar({ activeCase, setActiveCase, onNavigateToScanner }) {
  const [selectedSeverity, setSelectedSeverity] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE'
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulatedDrugs, setSimulatedDrugs] = useState([]);
  const [customDrugName, setCustomDrugName] = useState('');
  const [customDosage, setCustomDosage] = useState('');
  const [showCallScript, setShowCallScript] = useState(false);

  // Combine scanned meds from activeCase with simulated test meds
  const currentMedications = useMemo(() => {
    const baseMeds = activeCase?.extractedMedications || [];
    return [...baseMeds, ...simulatedDrugs];
  }, [activeCase, simulatedDrugs]);

  // Recalculate dynamic interactions across all current medications
  const { interactions, safetyScore } = useMemo(() => {
    if (simulatedDrugs.length === 0 && activeCase?.interactions?.length > 0) {
      // Use validated activeCase interactions by default if no simulated additions
      return {
        interactions: activeCase.interactions,
        safetyScore: activeCase.safetyScore ?? 85
      };
    }
    return calculateRegimenInteractions(currentMedications);
  }, [activeCase, simulatedDrugs, currentMedications]);

  // Filtered interactions list
  const filteredInteractions = useMemo(() => {
    if (selectedSeverity === 'ALL') return interactions;
    return interactions.filter(i => i.severity === selectedSeverity);
  }, [interactions, selectedSeverity]);

  // Add medication from quick-pick list
  const handleAddQuickDrug = (drug) => {
    if (currentMedications.some(m => m.name.toLowerCase() === drug.name.toLowerCase())) {
      alert(`${drug.name} is already in the regimen.`);
      return;
    }
    const newDrug = {
      id: `sim-${Date.now()}`,
      name: drug.name,
      brand: drug.brand,
      dosage: drug.dosage,
      purpose: drug.purpose,
      isSimulated: true
    };
    setSimulatedDrugs([...simulatedDrugs, newDrug]);
  };

  // Add custom typed drug
  const handleAddCustomDrug = (e) => {
    e.preventDefault();
    if (!customDrugName.trim()) return;
    const newDrug = {
      id: `custom-${Date.now()}`,
      name: customDrugName.trim(),
      dosage: customDosage.trim() || 'Standard Dose',
      purpose: 'Simulated Clinical Test',
      isSimulated: true
    };
    setSimulatedDrugs([...simulatedDrugs, newDrug]);
    setCustomDrugName('');
    setCustomDosage('');
  };

  // Remove a simulated drug
  const handleRemoveSimulated = (id) => {
    setSimulatedDrugs(simulatedDrugs.filter(d => d.id !== id));
  };

  // Clear all simulated additions
  const handleResetToScan = () => {
    setSimulatedDrugs([]);
    setSelectedNode(null);
  };

  // SVG Radar Geometry Calculations
  const centerX = 250;
  const centerY = 250;
  const radius = 160;

  const nodePositions = useMemo(() => {
    const total = currentMedications.length || 1;
    return currentMedications.map((med, index) => {
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      return {
        id: med.id || `med-${index}`,
        med,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        angle
      };
    });
  }, [currentMedications]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Telemetry & Scenario Context Header */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '10px', color: '#f87171' }}>
                <Activity size={22} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.45rem', margin: 0 }}>
                  Clinical Pharmacology &amp; Interaction Radar
                </h1>
                <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                  Real-time CYP enzyme mapping, pharmacokinetic conflicts, and polypharmacy risk simulation.
                </p>
              </div>
            </div>
          </div>

          {/* Patient Profile Chip & Safety Dial */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                Patient Subject
              </span>
              <strong style={{ color: '#ffffff' }}>
                {activeCase?.patient?.name || 'Eleanor Vance'} ({activeCase?.patient?.age || 78}y)
              </strong>
            </div>

            <div style={{
              background: safetyScore < 40 ? 'rgba(239, 68, 68, 0.12)' : safetyScore < 70 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: `1px solid ${safetyScore < 40 ? 'rgba(239, 68, 68, 0.35)' : safetyScore < 70 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(16, 185, 129, 0.35)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Safety Index
              </span>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                color: safetyScore < 40 ? '#ef4444' : safetyScore < 70 ? '#f59e0b' : '#10b981'
              }}>
                {safetyScore}/100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Radar Node Visualizer + Deep Mechanism Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Interactive Radar Canvas */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Polypharmacy Connection Mesh</h3>
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {currentMedications.length} Active Specimen Nodes
            </span>
          </div>

          {/* SVG Orbital Radar Visualizer */}
          <div style={{
            background: '#040712',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: '440px'
          }}>
            <svg viewBox="0 0 500 500" width="100%" height="100%" style={{ maxWidth: '440px', maxHeight: '440px' }}>
              <defs>
                {/* Glowing Radar Radial Gradients */}
                <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(6, 182, 212, 0.2)"/>
                  <stop offset="70%" stop-color="rgba(6, 182, 212, 0.05)"/>
                  <stop offset="100%" stop-color="transparent"/>
                </radialGradient>
                <filter id="glowCritical" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ef4444" flood-opacity="0.8"/>
                </filter>
                <filter id="glowSafe" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#10b981" flood-opacity="0.6"/>
                </filter>
              </defs>

              {/* Concentric Radar Rings */}
              <circle cx={centerX} cy={centerY} r={radius * 1.25} fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
              <circle cx={centerX} cy={centerY} r={radius} fill="url(#radarSweep)" stroke="rgba(6, 182, 212, 0.25)" stroke-width="1.5" stroke-dasharray="4 4" />
              <circle cx={centerX} cy={centerY} r={radius * 0.65} fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
              <circle cx={centerX} cy={centerY} r={radius * 0.3} fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

              {/* Radar Crosshairs */}
              <line x1={centerX - radius * 1.2} y1={centerY} x2={centerX + radius * 1.2} y2={centerY} stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
              <line x1={centerX} y1={centerY - radius * 1.2} x2={centerX} y2={centerY + radius * 1.2} stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

              {/* Conflict Connection Arcs between medications */}
              {interactions.map((interaction, idx) => {
                const nodeA = nodePositions.find(n => interaction.pair.toLowerCase().includes(n.med.name.toLowerCase()));
                const nodeB = nodePositions.find(n => n !== nodeA && interaction.pair.toLowerCase().includes(n.med.name.toLowerCase()));

                if (!nodeA || !nodeB) return null;

                const isCritical = interaction.severity === 'CRITICAL';
                const isHigh = interaction.severity === 'HIGH';
                const strokeColor = isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#10b981';

                return (
                  <g key={`arc-${idx}`}>
                    {/* Glowing background stroke */}
                    <line 
                      x1={nodeA.x} 
                      y1={nodeA.y} 
                      x2={nodeB.x} 
                      y2={nodeB.y} 
                      stroke={strokeColor} 
                      stroke-width={isCritical ? '4' : '2.5'} 
                      stroke-dasharray={isCritical ? 'none' : '6 4'}
                      opacity={isCritical ? '0.9' : '0.6'}
                      filter={isCritical ? 'url(#glowCritical)' : 'none'}
                    />
                    {/* Warning beacon in the middle of the conflict path */}
                    <circle 
                      cx={(nodeA.x + nodeB.x) / 2} 
                      cy={(nodeA.y + nodeB.y) / 2} 
                      r={isCritical ? '8' : '5'} 
                      fill={strokeColor}
                    />
                  </g>
                );
              })}

              {/* Central Patient Core Node */}
              <circle cx={centerX} cy={centerY} r="32" fill="#0f172a" stroke="var(--cyan-light)" stroke-width="2.5" />
              <text x={centerX} y={centerY - 2} font-family="sans-serif" font-size="10" font-weight="bold" fill="#38bdf8" text-anchor="middle">
                PATIENT
              </text>
              <text x={centerX} y={centerY + 12} font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">
                CORE
              </text>

              {/* Peripheral Medication Nodes */}
              {nodePositions.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const hasCriticalConflict = interactions.some(i => i.severity === 'CRITICAL' && i.pair.toLowerCase().includes(node.med.name.toLowerCase()));

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node.med)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Node Outer Ring */}
                    <circle 
                      r="24" 
                      fill="#0d1424" 
                      stroke={hasCriticalConflict ? '#ef4444' : isSelected ? '#38bdf8' : '#334155'} 
                      stroke-width={hasCriticalConflict ? '2.5' : '1.8'}
                      filter={hasCriticalConflict ? 'url(#glowCritical)' : 'none'}
                    />
                    {/* Inner icon / label */}
                    <text 
                      y="4" 
                      font-family="sans-serif" 
                      font-size="8.5" 
                      font-weight="bold" 
                      fill="#ffffff" 
                      text-anchor="middle"
                    >
                      {node.med.name.substring(0, 5)}..
                    </text>
                    {/* Full Name Below Node */}
                    <text 
                      y="38" 
                      font-family="sans-serif" 
                      font-size="9.5" 
                      font-weight="600" 
                      fill={hasCriticalConflict ? '#fca5a5' : '#cbd5e1'} 
                      text-anchor="middle"
                    >
                      {node.med.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Radar Legend in Corner */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(7, 11, 20, 0.85)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '3px', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ color: '#f87171' }}>Lethal / Critical DDI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '3px', background: '#f59e0b', display: 'inline-block' }} />
                <span style={{ color: '#fbbf24' }}>High / Moderate Risk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '3px', background: '#10b981', display: 'inline-block' }} />
                <span style={{ color: '#34d399' }}>Complimentary / Safe</span>
              </div>
            </div>
          </div>

          {/* Interactive "What-If" Drug Simulator Controls */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                🧪 "What-If" Simulation: Add a Drug to Test Conflict
              </span>
              {simulatedDrugs.length > 0 && (
                <button 
                  onClick={handleResetToScan}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.74rem', padding: '3px 8px' }}
                >
                  <RefreshCw size={12} />
                  <span>Reset to Specimen</span>
                </button>
              )}
            </div>

            {/* Quick Pick Medication Chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {COMMON_TEST_DRUGS.slice(0, 5).map((drug) => (
                <button
                  key={drug.name}
                  onClick={() => handleAddQuickDrug(drug)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.76rem', padding: '4px 10px', borderRadius: '999px' }}
                >
                  <Plus size={12} color="#38bdf8" />
                  <span>{drug.name} ({drug.dosage})</span>
                </button>
              ))}
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleAddCustomDrug} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                placeholder="Type any other drug (e.g. Ibuprofen)..."
                value={customDrugName}
                onChange={(e) => setCustomDrugName(e.target.value)}
                className="input-field"
                style={{ padding: '8px 12px', fontSize: '0.82rem' }}
              />
              <input 
                type="text"
                placeholder="Dosage (e.g. 400mg)"
                value={customDosage}
                onChange={(e) => setCustomDosage(e.target.value)}
                className="input-field"
                style={{ width: '130px', padding: '8px 12px', fontSize: '0.82rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                <Plus size={14} />
                <span>Simulate</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Deep Pharmacological Breakdown & Clinical Action Protocols */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Severity Filter Tabs */}
          <div className="glass-panel" style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Filter Severity:
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['ALL', 'CRITICAL', 'HIGH', 'LOW'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSeverity(lvl)}
                    className="btn btn-sm"
                    style={{
                      background: selectedSeverity === lvl ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                      color: selectedSeverity === lvl ? '#ffffff' : 'var(--text-secondary)',
                      border: selectedSeverity === lvl ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                      padding: '4px 10px',
                      fontSize: '0.75rem'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conflict Mechanism Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            {filteredInteractions.length === 0 ? (
              <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.1rem', margin: '0 0 6px 0' }}>No Intersecting Conflicts in this Tier</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  All medications in the current specimen pass pharmacokinetic safety checks for the selected filter.
                </p>
              </div>
            ) : (
              filteredInteractions.map((item, idx) => {
                const isCrit = item.severity === 'CRITICAL';
                return (
                  <div 
                    key={item.id || idx}
                    className="glass-panel" 
                    style={{
                      padding: '20px',
                      borderLeft: `4px solid ${isCrit ? '#ef4444' : item.severity === 'HIGH' ? '#f59e0b' : '#10b981'}`,
                      background: isCrit ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge ${isCrit ? 'badge-danger' : item.severity === 'HIGH' ? 'badge-amber' : 'badge-emerald'}`}>
                          {item.severity} SEVERITY
                        </span>
                        <h4 style={{ fontSize: '0.98rem', margin: 0, color: '#ffffff' }}>
                          {item.pair}
                        </h4>
                      </div>
                    </div>

                    {/* Pharmacological Mechanism */}
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                        Pharmacological Mechanism:
                      </span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        {item.mechanism}
                      </p>
                    </div>

                    {/* Clinical Adverse Risk */}
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '10px',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 700, textTransform: 'uppercase' }}>
                        Patient Safety Hazard:
                      </span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#fecaca', lineHeight: 1.4 }}>
                        {item.risk}
                      </p>
                    </div>

                    {/* Action Recommendation */}
                    <div style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 12px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                        Pharmacist / MD Action Protocol:
                      </span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#f0f9ff', lineHeight: 1.4 }}>
                        {item.action}
                      </p>
                    </div>

                    {/* Safe Clinical Alternative */}
                    {item.alternative && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#34d399', marginTop: '6px' }}>
                        <Sparkles size={14} />
                        <span><strong>Recommended Alternative:</strong> {item.alternative}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Physician / Caregiver Escalation Script Trigger */}
          <div className="glass-panel" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.05) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={20} color="#38bdf8" />
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block' }}>
                    Need to call the Attending Physician or Pharmacy?
                  </strong>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Generate structured medical phrasing to report this conflict accurately.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCallScript(!showCallScript)}
                className="btn btn-secondary btn-sm"
              >
                {showCallScript ? 'Hide Script' : 'Generate MD Call Script'}
              </button>
            </div>

            {showCallScript && (
              <div style={{
                marginTop: '14px',
                padding: '14px',
                background: '#090e1c',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '0.82rem',
                color: '#e2e8f0',
                lineHeight: 1.5
              }}>
                <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
                  📞 Suggested Script for Patient or Family Caregiver:
                </div>
                <p style={{ margin: 0, fontStyle: 'italic' }}>
                  "Hello, I am calling regarding {activeCase?.patient?.name || 'the patient'}. Through digital medication verification, we identified an active co-administration of <strong>{interactions[0]?.pair || 'prescribed medications'}</strong>. Due to the high risk of {interactions[0]?.risk || 'severe drug-drug interactions'}, we are requesting immediate physician review to adjust the regimen or substitute with an alternative prior to the next scheduled dose."
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
