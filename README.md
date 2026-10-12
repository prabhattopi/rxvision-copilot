# 💊 RxVision / PillGuard — Multimodal Medication Safety Copilot

> **AI-Powered Visual Pharmacology & Clinical Interaction Radar**  
> *Built for Banana Hacks 2026 — Image AI Track (Oct 9–12, 2026)*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)
![Google Gemini](https://img.shields.io/badge/Gemini_Flash-Multimodal_Vision-4285f4.svg)
![Free Tier](https://img.shields.io/badge/Free_Tier-100%25_No_Credit_Card-10b981.svg)

---

## 🌟 The Problem
Over **1.5 million preventable adverse drug events** occur annually. For elderly patients managing complex polypharmacy, visual impairment, or illegible doctor handwriting, identifying loose pills and understanding dangerous drug-drug interactions (DDIs) is terrifying. Co-administering common OTC pain relievers (like Aspirin or NSAIDs) with blood thinners (like Warfarin) causes catastrophic internal hemorrhages.

**RxVision (PillGuard)** solves this with state-of-the-art multimodal Image AI: bridging visual inspection, clinical pharmacology, dynamic DDI risk modeling, and elderly accessibility into a unified safety copilot.

---

## ⚡ Core Features

### 1. 🔍 Multimodal Dual Vision Scanner
- **Dual Intake Modes:** Inspect loose pills/capsules (morphology, scored lines, imprint codes) or doctor handwritten prescription slips / bottle labels.
- **Input Sources:** Live WebRTC camera stream (with snapshot capture), direct drag-and-drop file upload, or preloaded high-res clinical specimens.
- **High-Resolution Inspection Lens:** 2x magnification with AI reticle bounding boxes pinpointing pharmaceutical imprints and pill markings.
- **Clean Slate on Upload:** Every new camera snapshot or upload resets cleanly, awaiting diagnostic scan.

### 2. 🌐 Cross-Drug Interaction Radar & "What-If" Simulator
- **Orbital DDI Node Mesh:** Visualizes the patient’s active pharmacological regimen in a dynamic, color-coded orbital graph.
- **Lethal Contraindication Engine:** Flags critical interactions (e.g. Warfarin + Aspirin bleeding risks, Clonidine vs. Clonazepam LASA mix-ups).
- **"What-If" Drug Simulator:** Test adding common OTC medications (Ibuprofen, Omeprazole, Tylenol, etc.) before taking them to simulate real-time safety score impacts.
- **SBAR Physician Script Generator:** 1-click clinical script generator for patients and caregivers to read when calling their doctor or pharmacist.

### 3. 🔊 Prominent Elderly Plain-Language Voice Translation
- **Senior Accessibility First:** Translates complex pharmacological warnings into simplified 6th-grade language.
- **Native Web Speech Synthesis:** Paced at an accessible 0.95x rate with audio start/stop controls for visually impaired patients.

### 4. 🪪 Emergency Medication Passport
- **EMS / First-Responder Verified:** Printable medical wallet card formatted for paramedics and emergency rooms (`@media print` clean layout).
- **Dynamic First-Responder QR Code:** Instantly scannable by paramedics to retrieve patient blood type, allergies, conditions, and active meds during an emergency.
- **Customizable Patient Profile:** Edit patient vitals, emergency contacts, and attending physician details with instant local sync.

---

## 🧠 100% Free Tier Architecture

RxVision is built strictly on **zero-cost, free-tier accessible technology** requiring **no credit card**:
- **Primary AI Engine:** Google AI Studio **`gemini-3.8-flash`** multimodal vision API (with auto-fallback to `gemini-1.5-flash`).
- **Zero-Latency Fallback:** Built-in clinical pharmacology benchmark matrix ensures 100% uptime during presentations, even without an API key or when offline.
- **Client-Side Token Optimization:** In-memory analysis caching prevents redundant API calls and conserves free tier quota.
- **Offscreen Canvas Rasterizer:** Transforms WebRTC frames, SVGs, and files into Base64 raster byte streams directly in the browser.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your computer.

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/rxvision-copilot.git
cd rxvision-copilot

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Optional: Configure Live Google Gemini Vision
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/) (No credit card required).
2. In the app, click **AI Settings** in the top-right corner.
3. Paste your key and select **Gemini 3.8 Flash**.
4. Alternatively, add it to your `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

---

## 🛠️ Tech Stack
- **Framework:** React 19, Vite 8
- **Styling:** Custom Vanilla CSS Design System (Cyber-Clinical Glassmorphism, HSL color tokens)
- **Icons & Animation:** Lucide Icons, Canvas Confetti
- **Vision Inference:** Google Gemini Flash Multimodal API
- **Audio:** Web Speech API (`SpeechSynthesis`)
- **Camera:** WebRTC MediaDevices API

---

## 🏆 Hackathon Alignment (Banana Hacks 2026)
- **Track:** Image AI Track
- **Novelty:** Unifies computer vision with interactive clinical pharmacology and senior-friendly voice translation.
- **Impact:** Solves a real-world, life-or-death problem affecting millions of polypharmacy patients and seniors worldwide.

---

## 📄 License
MIT License. Created for Banana Hacks 2026.
