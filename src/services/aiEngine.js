// aiEngine.js — Multimodal Image AI Engine for RxVision
// Supports:
// 1. Live Google Gemini Flash API (100% Free at Google AI Studio - No Credit Card Needed)
// 2. Realistic Clinical Demo Cases (Works instantly out of the box with zero setup)

export const GEMINI_MODELS = [
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Fastest Multimodal)', isDefault: true },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Standard Free)', isDefault: false },
];

export const getStoredApiKey = () => {
  return localStorage.getItem('rxvision_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const setStoredApiKey = (key) => {
  if (key) {
    localStorage.setItem('rxvision_gemini_key', key.trim());
  } else {
    localStorage.removeItem('rxvision_gemini_key');
  }
};

export const getStoredModel = () => {
  return localStorage.getItem('rxvision_gemini_model') || 'gemini-2.0-flash-exp';
};

export const setStoredModel = (modelId) => {
  localStorage.setItem('rxvision_gemini_model', modelId);
};

// Realistic Clinical Scenarios for Live Hackathon Presentations
export const CLINICAL_DEMO_CASES = [
  {
    id: 'case-lethal-interaction',
    name: '🔴 Case 1: High-Risk Elderly Mix-up (Warfarin + Aspirin)',
    tag: 'Lethal DDI Warning',
    type: 'pills',
    patient: {
      name: 'Eleanor Vance',
      age: 78,
      conditions: ['Atrial Fibrillation', 'Hypertension'],
      allergies: ['Penicillin']
    },
    imagePreview: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    caption: 'Two bottles and loose pills found on bedside counter',
    extractedMedications: [
      {
        id: 'med-1',
        name: 'Warfarin Sodium',
        brand: 'Coumadin',
        dosage: '5mg',
        schedule: 'Once daily at evening',
        imprint: 'COUMADIN 5',
        shape: 'Round, Peach/Peach-Pink, Scored',
        confidence: 0.98,
        purpose: 'Blood thinner for stroke prevention in AFib'
      },
      {
        id: 'med-2',
        name: 'Aspirin (Acetylsalicylic Acid)',
        brand: 'Bayer / Generic',
        dosage: '325mg',
        schedule: 'Take 1 tablet PRN for headache',
        imprint: 'BAYER',
        shape: 'Round, White',
        confidence: 0.95,
        purpose: 'Self-administered OTC pain reliever'
      }
    ],
    interactions: [
      {
        id: 'ddi-1',
        severity: 'CRITICAL',
        pair: 'Warfarin (5mg) + Aspirin (325mg)',
        mechanism: 'Dual antiplatelet & anticoagulant synergy drastically impairs hemostasis.',
        risk: 'Life-threatening internal hemorrhage, GI bleed, or intracranial bleeding.',
        action: 'DO NOT ADMINISTER ASPIRIN. Notify attending physician immediately. Use non-NSAID alternatives (e.g. prescribed Acetaminophen within safe liver limits) only under MD guidance.'
      }
    ],
    elderlySummary: '⚠️ STOP! Do NOT take these two medicines together. Warfarin and Aspirin both make your blood very thin. Taking both can cause dangerous internal bleeding. Call your doctor immediately.',
    safetyScore: 18 // out of 100
  },
  {
    id: 'case-handwritten-rx',
    name: '🟡 Case 2: Illegible Handwritten Prescription Deciphered',
    tag: 'Handwritten Rx & Dosage',
    type: 'prescription',
    patient: {
      name: 'Robert Miller',
      age: 54,
      conditions: ['Type 2 Diabetes', 'Hyperlipidemia'],
      allergies: ['Sulfa drugs']
    },
    imagePreview: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    caption: 'Doctor prescription slip with difficult cursive handwriting',
    extractedMedications: [
      {
        id: 'med-3',
        name: 'Metformin Hydrochloride',
        brand: 'Glucophage',
        dosage: '850mg',
        schedule: '1 tablet twice daily with meals (BID)',
        imprint: 'N/A (Prescription script)',
        shape: 'White oval tablet',
        confidence: 0.94,
        purpose: 'Glycemic control for Type 2 Diabetes'
      },
      {
        id: 'med-4',
        name: 'Atorvastatin Calcium',
        brand: 'Lipitor',
        dosage: '20mg',
        schedule: '1 tablet daily at bedtime',
        imprint: 'N/A (Prescription script)',
        shape: 'White elliptical tablet',
        confidence: 0.92,
        purpose: 'Cholesterol & cardiovascular risk reduction'
      }
    ],
    interactions: [
      {
        id: 'ddi-2',
        severity: 'LOW',
        pair: 'Metformin + Atorvastatin',
        mechanism: 'Standard guideline combination for diabetic dyslipidemia.',
        risk: 'No significant pharmacokinetic antagonism.',
        action: 'Safe to take according to schedule. Take Metformin with meals to minimize gastrointestinal discomfort.'
      }
    ],
    elderlySummary: '✅ Prescription verified! Metformin is for blood sugar (take twice daily with breakfast and dinner). Atorvastatin is for cholesterol (take once at night before bed).',
    safetyScore: 92
  },
  {
    id: 'case-lookalike-pill',
    name: '🟠 Case 3: Look-Alike / Sound-Alike Pill Confusion',
    tag: 'LASA Error Detection',
    type: 'pills',
    patient: {
      name: 'Harold Green',
      age: 69,
      conditions: ['Hypertension', 'Insomnia'],
      allergies: ['None known']
    },
    imagePreview: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80',
    caption: 'Unmarked pill organizer box with identical round white pills',
    extractedMedications: [
      {
        id: 'med-5',
        name: 'Clonidine Hydrochloride',
        brand: 'Catapres',
        dosage: '0.1mg',
        imprint: '0.1 / BOEHRINGER',
        shape: 'Small round white tablet',
        confidence: 0.96,
        purpose: 'Central alpha-2 agonist for severe hypertension'
      },
      {
        id: 'med-6',
        name: 'Klonopin (Clonazepam)',
        brand: 'Klonopin',
        dosage: '0.5mg',
        imprint: 'ROCHE / 0.5',
        shape: 'Round pale tablet',
        confidence: 0.89,
        purpose: 'Benzodiazepine for anxiety/seizures (Suspected Patient Mix-up)'
      }
    ],
    interactions: [
      {
        id: 'ddi-3',
        severity: 'HIGH',
        pair: 'Clonidine vs Clonazepam Mix-up Risk',
        mechanism: 'Look-Alike / Sound-Alike (LASA) medication hazard.',
        risk: 'Severe CNS depression, extreme bradycardia, accidental overdose or rapid rebound hypertensive crisis if wrong pill taken.',
        action: 'VERIFY BOTTLE LABELS. Do not mix loose in same pillbox slot. Confirm imprint marks before ingestion.'
      }
    ],
    elderlySummary: '⚠️ Caution! These two pills look almost identical and have similar names (Clonidine and Clonazepam), but do very different things! Do not keep them in the same container.',
    safetyScore: 45
  }
];

// Helper to format structured Gemini prompt for Image AI
const MEDICAL_SAFETY_PROMPT = `
You are RxVision AI, an expert clinical pharmacology image recognition system designed for patient safety and medication verification.
Analyze the provided image thoroughly. The image may contain:
1. Loose pills/capsules (look at shape, color, scoring, and engraved imprint letters/numbers).
2. Medication packaging/prescription bottle labels.
3. Handwritten or printed doctor prescription slips.

Return ONLY a valid JSON object matching this exact schema:
{
  "summary": "Brief 1-sentence overview of what was identified",
  "extractedMedications": [
    {
      "name": "Generic Drug Name",
      "brand": "Brand Name (if identifiable)",
      "dosage": "e.g. 10mg or 500mg",
      "schedule": "Instructions/frequency (e.g. Twice daily with meals)",
      "imprint": "Visible markings or imprint code",
      "shape": "Color and physical shape (e.g. Oval yellow tablet)",
      "confidence": 0.95,
      "purpose": "What this medicine treats"
    }
  ],
  "interactions": [
    {
      "severity": "CRITICAL" | "HIGH" | "MODERATE" | "LOW",
      "pair": "Drug A + Drug B",
      "mechanism": "Clinical pharmacological explanation of why they interact",
      "risk": "Potential adverse effect on patient",
      "action": "Immediate clinical action or recommendation"
    }
  ],
  "elderlySummary": "Simple, 6th-grade level explanation in 2-3 sentences that an elderly patient can understand easily or listen to via audio.",
  "safetyScore": 85
}

Important:
- If dangerous combinations are found (e.g. Warfarin + NSAID, Benzodiazepine + Opioid, dual ACE-inhibitors), mark severity as "CRITICAL" or "HIGH" and lower safetyScore accordingly (< 40).
- If only one medication is present with no conflicts, provide safe usage guidelines and a safetyScore of 95.
- Output ONLY pure JSON without markdown backticks or explanations.
`;

export async function analyzeMedicationImage(imageBase64, mimeType = 'image/jpeg') {
  const apiKey = getStoredApiKey();
  const modelId = getStoredModel();

  // If no API key is set, return realistic simulated response or fallback
  if (!apiKey) {
    // Artificial small delay to simulate neural inference
    await new Promise((resolve) => setTimeout(resolve, 1400));
    return {
      source: 'SIMULATED_CLINICAL_ENGINE',
      data: CLINICAL_DEMO_CASES[0] // Returns high-impact default demonstration
    };
  }

  // Live call to Google Gemini Flash
  try {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: MEDICAL_SAFETY_PROMPT },
            {
              inline_data: {
                mime_type: mimeType,
                data: cleanBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        response_mime_type: 'application/json'
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${errText}`);
    }

    const json = await response.json();
    const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No diagnostic content returned from Gemini model.');
    }

    // Clean potential markdown blocks if present
    const cleanedText = candidateText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return {
      source: 'LIVE_GEMINI_AI',
      model: modelId,
      data: parsedData
    };
  } catch (err) {
    console.error('Vision analysis error:', err);
    throw err;
  }
}
