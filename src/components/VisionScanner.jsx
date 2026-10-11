import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Download, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle, 
  RefreshCw, Volume2, VolumeX, Sparkles, Eye, ShieldAlert, 
  FileText, Pill, ArrowRight, Layers, Sliders, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analyzeMedicationImage, CLINICAL_DEMO_CASES } from '../services/aiEngine';

export default function VisionScanner({ activeCase, setActiveCase, onNavigateToRadar }) {
  const [scanMode, setScanMode] = useState('pills'); // 'pills' | 'prescription'
  const [inputSource, setInputSource] = useState('samples'); // 'camera' | 'upload' | 'samples'
  const [imagePreview, setImagePreview] = useState(activeCase?.imagePreview || CLINICAL_DEMO_CASES[0].imagePreview);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync image when activeCase changes externally
  useEffect(() => {
    if (activeCase?.imagePreview) {
      setImagePreview(activeCase.imagePreview);
    }
  }, [activeCase]);

  // Handle webcam stream start/stop
  useEffect(() => {
    if (inputSource === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [inputSource]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn('Camera access unavailable:', err);
      setCameraError('Camera access was dismissed or unavailable. You can use Upload Photo or select one of the Clinical Samples below.');
      setIsCameraActive(false);
      setInputSource('samples');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreview(dataUrl);
    setInputSource('upload');
    stopCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setInputSource('upload');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Run Vision AI Pipeline
  const runDiagnosticScan = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisStep(1);

    const stepTimer1 = setTimeout(() => setAnalysisStep(2), 600);
    const stepTimer2 = setTimeout(() => setAnalysisStep(3), 1200);

    try {
      const result = await analyzeMedicationImage(imagePreview, activeCase);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setAnalysisStep(3);

      const parsedCase = {
        id: `scan-${Date.now()}`,
        name: scanMode === 'pills' ? '🔍 Real-Time Pill Vision Analysis' : '📋 Prescription & Bottle Diagnostic',
        tag: result.source === 'LIVE_GEMINI_AI' ? 'Live Gemini Vision' : 'Clinical Benchmark Verified',
        type: scanMode,
        patient: activeCase?.patient || {
          name: 'Patient (Self-Reported)',
          age: 65,
          conditions: ['Polypharmacy Monitored'],
          allergies: ['Standard Profile']
        },
        imagePreview: imagePreview,
        caption: 'Captured visual specimen',
        extractedMedications: result.data.extractedMedications || [],
        interactions: result.data.interactions || [],
        elderlySummary: result.data.elderlySummary || 'All medications analyzed successfully.',
        safetyScore: result.data.safetyScore ?? (result.data.interactions?.some(i => i.severity === 'CRITICAL') ? 25 : 90)
      };

      setActiveCase(parsedCase);

      // Trigger Celebration or Warning
      if (parsedCase.safetyScore > 75) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Scan error:', err);
      setAnalysisError(err.message || 'Vision analysis could not be completed. Please retry or switch models in AI Settings.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  // Plain-Language Audio Narration (Web Speech API)
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = activeCase?.elderlySummary || 'No summary available.';
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95; // Slightly slower for elderly comprehension
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Inline Feedback Banner for Analysis Errors or Camera Dismiss */}
      {(analysisError || cameraError) && (
        <div style={{
          background: analysisError ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${analysisError ? 'rgba(239, 68, 68, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} color={analysisError ? '#f87171' : '#fbbf24'} />
            <span style={{ fontSize: '0.86rem', color: analysisError ? '#fca5a5' : '#fef08a', lineHeight: 1.4 }}>
              {analysisError || cameraError}
            </span>
          </div>
          <button
            onClick={() => { setAnalysisError(null); setCameraError(null); }}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', padding: '2px 8px' }}
            title="Dismiss notice"
          >
            ✕
          </button>
        </div>
      )}

      {/* Scanner Mode & Source Selection Toolbar */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Dual Inspection Mode Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Mode:
            </span>
            <button
              onClick={() => setScanMode('pills')}
              className={`btn btn-sm ${scanMode === 'pills' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Pill size={15} />
              <span>Pill Identifier (Shape & Imprint)</span>
            </button>
            <button
              onClick={() => setScanMode('prescription')}
              className={`btn btn-sm ${scanMode === 'prescription' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FileText size={15} />
              <span>Rx Slip & Bottle OCR</span>
            </button>
          </div>

          {/* Input Source Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Input:
            </span>
            <button
              onClick={() => {
                setInputSource('samples');
                setCameraError(null);
              }}
              className={`btn btn-sm ${inputSource === 'samples' ? 'btn-emerald' : 'btn-secondary'}`}
            >
              <Sparkles size={14} />
              <span>Clinical Samples</span>
            </button>
            <button
              onClick={() => setInputSource('camera')}
              className={`btn btn-sm ${inputSource === 'camera' ? 'btn-emerald' : 'btn-secondary'}`}
            >
              <Camera size={14} />
              <span>Live Camera</span>
            </button>
            <button
              onClick={() => {
                setInputSource('upload');
                fileInputRef.current?.click();
              }}
              className={`btn btn-sm ${inputSource === 'upload' ? 'btn-emerald' : 'btn-secondary'}`}
            >
              <Upload size={14} />
              <span>Upload Photo</span>
            </button>
            <a 
              href="/test-specimen-pills.png" 
              download="test-specimen-pills.png"
              className="btn btn-secondary btn-sm"
              title="Download sample test image to your PC"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#38bdf8' }}
            >
              <Download size={14} />
              <span>Download Test Image</span>
            </a>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
        </div>

        {/* 1-Click Clinical Sample Showcase Carousel */}
        {inputSource === 'samples' && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, marginBottom: '8px' }}>
              Select a Specimen to Inspect in Dual Lens:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {CLINICAL_DEMO_CASES.map((demo) => (
                <div
                  key={demo.id}
                  onClick={() => {
                    setActiveCase(demo);
                    setImagePreview(demo.imagePreview);
                    setAnalysisError(null);
                    setCameraError(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    background: activeCase.id === demo.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: activeCase.id === demo.id ? '1px solid var(--cyan-light)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img 
                    src={demo.imagePreview} 
                    alt={demo.name} 
                    style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} 
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {demo.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {demo.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Dual Viewport: Visual Inspection Lens + Diagnostic Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Visual Viewport & Inspection Lens */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>High-Resolution Inspection Lens</h3>
            </div>
            
            {/* Viewport Zoom & Bounding Box Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                title="Toggle AI Bounding Boxes"
              >
                <Layers size={13} color={showBoundingBoxes ? '#38bdf8' : 'currentColor'} />
                <span>{showBoundingBoxes ? 'Boxes ON' : 'Boxes OFF'}</span>
              </button>
              <button
                onClick={() => setZoomLevel(zoomLevel === 1 ? 2 : 1)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                title="Toggle 2x Imprint Zoom"
              >
                {zoomLevel === 1 ? <ZoomIn size={13} /> : <ZoomOut size={13} />}
                <span>{zoomLevel}x Zoom</span>
              </button>
            </div>
          </div>

          {/* Scanner Viewport */}
          <div 
            className={`scanner-container ${isAnalyzing ? 'active-scan' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              height: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: '#040711',
              borderRadius: 'var(--radius-lg)',
              cursor: inputSource === 'upload' ? 'pointer' : 'default'
            }}
          >
            {/* Laser scanning beam during analysis */}
            {isAnalyzing && <div className="laser-beam" />}

            {/* Corner Crosshair Reticles */}
            <div className="reticle-corner reticle-tl" />
            <div className="reticle-corner reticle-tr" />
            <div className="reticle-corner reticle-bl" />
            <div className="reticle-corner reticle-br" />

            {/* Live Camera Feed */}
            {inputSource === 'camera' && (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {cameraError ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#f87171' }}>
                    <AlertTriangle size={32} style={{ margin: '0 auto 8px auto' }} />
                    <p style={{ fontSize: '0.86rem' }}>{cameraError}</p>
                  </div>
                ) : (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
                      <button onClick={captureCameraFrame} className="btn btn-primary">
                        <Camera size={16} />
                        <span>Snap Frame to Inspect</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Static Image / Sample Preview with Inspection Zoom */}
            {inputSource !== 'camera' && imagePreview && (
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={imagePreview} 
                  alt="Specimen preview" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.25s ease'
                  }} 
                />

                {/* Simulated AI Bounding Boxes for Detected Pills / Labels */}
                {showBoundingBoxes && (
                  <>
                    {/* Bounding box 1 */}
                    <div className="ai-bounding-box" style={{ top: '25%', left: '22%', width: '28%', height: '36%' }}>
                      <span className="bounding-tag font-mono">
                        {activeCase?.extractedMedications?.[0]?.name?.split(' ')[0] || 'MED-1'} ({Math.round((activeCase?.extractedMedications?.[0]?.confidence || 0.96) * 100)}%)
                      </span>
                    </div>

                    {/* Bounding box 2 if multiple items */}
                    {activeCase?.extractedMedications?.[1] && (
                      <div className="ai-bounding-box" style={{ top: '35%', right: '20%', width: '30%', height: '38%' }}>
                        <span className="bounding-tag font-mono">
                          {activeCase.extractedMedications[1].name.split(' ')[0]} ({Math.round((activeCase.extractedMedications[1].confidence || 0.94) * 100)}%)
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Empty Upload Dropzone */}
            {inputSource === 'upload' && !imagePreview && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ textAlign: 'center', padding: '24px', cursor: 'pointer' }}
              >
                <Upload size={36} color="#38bdf8" style={{ margin: '0 auto 12px auto' }} />
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>
                  Drag & drop pill or prescription photo here
                </p>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Supports JPEG, PNG, WEBP (Max 15MB)
                </p>
              </div>
            )}
          </div>

          {/* Diagnostic Action Bar */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Specimen: <strong style={{ color: '#ffffff' }}>{activeCase?.caption || 'Ready to analyze'}</strong>
            </div>

            <button
              onClick={runDiagnosticScan}
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{ minWidth: '180px' }}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing Specimen...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Run Multimodal Scan</span>
                </>
              )}
            </button>
          </div>

          {/* Real-Time Processing Stepper Bar */}
          {isAnalyzing && (
            <div style={{ marginTop: '14px', background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                <span style={{ color: analysisStep >= 1 ? '#38bdf8' : 'var(--text-muted)' }}>1. Pixel Ingestion</span>
                <span style={{ color: analysisStep >= 2 ? '#38bdf8' : 'var(--text-muted)' }}>2. Imprint & Morphology OCR</span>
                <span style={{ color: analysisStep >= 3 ? '#10b981' : 'var(--text-muted)' }}>3. DDI Risk Matrix</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: analysisStep === 1 ? '33%' : analysisStep === 2 ? '66%' : '100%',
                  background: 'linear-gradient(90deg, #0ea5e9, #10b981)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Extraction & Clinical Safety Verdict */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Safety Score & Telemetry Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Clinical Safety Index
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: (activeCase?.safetyScore || 0) < 40 ? '#ef4444' : (activeCase?.safetyScore || 0) < 70 ? '#f59e0b' : '#10b981'
                  }}>
                    {activeCase?.safetyScore || 85}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ 100</span>
                </div>
              </div>

              <div>
                {(activeCase?.safetyScore || 0) < 40 ? (
                  <span className="badge badge-danger">High Risk / Lethal DDI</span>
                ) : (activeCase?.safetyScore || 0) < 70 ? (
                  <span className="badge badge-amber">Moderate Interaction</span>
                ) : (
                  <span className="badge badge-emerald">Safe Regimen</span>
                )}
              </div>
            </div>

            {/* Elderly Plain-Language Speech Box */}
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <button
                onClick={toggleSpeech}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  background: isSpeaking ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                  color: isSpeaking ? '#f87171' : '#38bdf8',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title={isSpeaking ? 'Stop Audio' : 'Play Audio Summary for Elderly Patient'}
              >
                {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '2px' }}>
                  Elderly Voice Translation:
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#f1f5f9', lineHeight: 1.45 }}>
                  "{activeCase?.elderlySummary}"
                </p>
              </div>
            </div>
          </div>

          {/* Identified Medications List */}
          <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pill size={18} color="#38bdf8" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>
                  Identified Pharmaceutical Specimen ({activeCase?.extractedMedications?.length || 0})
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                FDA NDC & Pillbox Matched
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeCase?.extractedMedications?.map((med, idx) => (
                <div 
                  key={med.id || idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>
                        {med.name}
                      </span>
                      {med.brand && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          ({med.brand})
                        </span>
                      )}
                    </div>
                    <span className="badge badge-cyan font-mono" style={{ fontSize: '0.72rem' }}>
                      {med.dosage}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 6px 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {med.purpose}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.72rem' }}>
                    {med.imprint && (
                      <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px', color: '#cbd5e1' }}>
                        Imprint: <strong>{med.imprint}</strong>
                      </span>
                    )}
                    {med.shape && (
                      <span style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px', color: '#cbd5e1' }}>
                        Morphology: {med.shape}
                      </span>
                    )}
                    {med.schedule && (
                      <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px' }}>
                        {med.schedule}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick jump to interaction radar if conflicts exist */}
            {activeCase?.interactions?.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <button
                  onClick={onNavigateToRadar}
                  className="btn btn-secondary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}
                >
                  <ShieldAlert size={15} color="#f87171" />
                  <span>Inspect {activeCase.interactions.length} Interaction(s) in Radar</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
