// ddiMatrix.js — Clinical Drug-Drug Interaction (DDI) & Pharmacology Engine

export const COMMON_TEST_DRUGS = [
  { name: 'Ibuprofen', brand: 'Advil / Motrin', dosage: '400mg', class: 'NSAID', purpose: 'Pain & Inflammation' },
  { name: 'Acetaminophen', brand: 'Tylenol', dosage: '500mg', class: 'Analgesic / Antipyretic', purpose: 'Pain Relief (Safe alternative)' },
  { name: 'Lisinopril', brand: 'Prinivil', dosage: '10mg', class: 'ACE Inhibitor', purpose: 'Blood Pressure Control' },
  { name: 'Metoprolol Tartrate', brand: 'Lopressor', dosage: '50mg', class: 'Beta-Blocker', purpose: 'Heart Rate & BP' },
  { name: 'Omeprazole', brand: 'Prilosec', dosage: '20mg', class: 'Proton Pump Inhibitor (PPI)', purpose: 'Acid Reflux / GI Protection' },
  { name: 'Amoxicillin', brand: 'Amoxil', dosage: '500mg', class: 'Antibiotic (Penicillin)', purpose: 'Bacterial Infection' },
  { name: 'Potassium Chloride', brand: 'K-Dur', dosage: '20mEq', class: 'Electrolyte', purpose: 'Hypokalemia Prevention' },
  { name: 'Ciprofloxacin', brand: 'Cipro', dosage: '500mg', class: 'Fluoroquinolone', purpose: 'Severe Infection' },
];

// Comprehensive Clinical DDI Knowledge Graph
export const CLINICAL_DDI_PAIRS = [
  {
    drugs: ['Warfarin', 'Aspirin'],
    severity: 'CRITICAL',
    title: 'Dual Antiplatelet & Anticoagulant Hemorrhage Synergy',
    mechanism: 'Warfarin inhibits Vitamin K synthesis factors II, VII, IX, X while Aspirin irreversibly inhibits COX-1 platelet aggregation. Simultaneous inhibition creates profound hemostatic collapse.',
    risk: 'Extremely elevated risk of life-threatening major gastrointestinal bleeding, spontaneous subdural hematoma, and internal hemorrhage (+480% relative risk).',
    pathway: 'CYP2C9 clearance & Platelet COX-1 blockade',
    action: 'DISCONTINUE Aspirin unless explicitly prescribed by a cardiologist with PPI gastroprotection. For analgesia, recommend MD-approved Acetaminophen within safe liver limits (≤ 2000mg/24h).',
    alternative: 'Acetaminophen (Tylenol) 325mg - 500mg PRN for mild pain under physician supervision.'
  },
  {
    drugs: ['Warfarin', 'Ibuprofen'],
    severity: 'CRITICAL',
    title: 'Severe Anticoagulant Displacement & Gastric Ulceration',
    mechanism: 'NSAIDs displace Warfarin from serum albumin binding sites, spike free circulating warfarin, and damage gastric mucosal lining.',
    risk: 'Severe acute GI ulcer bleeding, hematemesis, melena, rapid INR spike > 6.0.',
    pathway: 'Albumin binding displacement + COX-1 mucosal compromise',
    action: 'STRICT CONTRAINDICATION. Avoid all systemic NSAIDs (Ibuprofen, Naproxen, Ketorolac). Use topical analgesics or supervised Acetaminophen.',
    alternative: 'Topical Lidocaine 4% patch or supervised Acetaminophen.'
  },
  {
    drugs: ['Lisinopril', 'Potassium Chloride'],
    severity: 'HIGH',
    title: 'Life-Threatening Hyperkalemia & Cardiac Arrhythmia',
    mechanism: 'ACE inhibitors decrease Aldosterone secretion, impairing renal potassium excretion. Co-administration of exogenous potassium leads to toxic serum accumulation.',
    risk: 'Dangerous hyperkalemia (K+ > 6.0 mEq/L), peaked T-waves, ventricular arrhythmia, and cardiac arrest.',
    pathway: 'Renin-Angiotensin-Aldosterone System (RAAS) suppression',
    action: 'Discontinue potassium supplements unless frequent (weekly) serum electrolyte monitoring is maintained by nephrologist.',
    alternative: 'Dietary management with routine basic metabolic panel (BMP).'
  },
  {
    drugs: ['Clonidine', 'Clonazepam'],
    severity: 'HIGH',
    title: 'Look-Alike Sound-Alike (LASA) & Severe CNS Depressant Synergy',
    mechanism: 'Confusion between antihypertensive and potent benzodiazepine. Both cause central nervous system depression and hypotension.',
    risk: 'Profound sedation, acute bradycardia, severe respiratory depression, falls, and orthostatic collapse.',
    pathway: 'Alpha-2 central agonist + GABA-A receptor allosteric modulation',
    action: 'Isolate storage containers immediately. Label with tall-man lettering (cloNIDine vs cloNAZEpam). Confirm prescription imprint before dosing.',
    alternative: 'Color-coded blister packaging or automated smart pill dispenser.'
  },
  {
    drugs: ['Metformin', 'Atorvastatin'],
    severity: 'LOW',
    title: 'Guideline-Recommended Cardio-Metabolic Regimen',
    mechanism: 'Complimentary metabolic pathways. Metformin reduces hepatic gluconeogenesis; Atorvastatin inhibits HMG-CoA reductase.',
    risk: 'Minimal pharmacokinetic conflict. Rare potential for mild myopathy or transient gastrointestinal upset.',
    pathway: 'OCT1/MATE transport & CYP3A4 hepatic clearance (Non-competing)',
    action: 'Safe combination. Administer Metformin with meals to minimize GI distress, and take Atorvastatin in the evening.',
    alternative: 'No change required; standard standard-of-care regimen.'
  },
  {
    drugs: ['Omeprazole', 'Warfarin'],
    severity: 'MODERATE',
    title: 'CYP2C19 Inhibition Altering Anticoagulant Metabolism',
    mechanism: 'Omeprazole competitively inhibits CYP2C19 and weakly affects CYP2C9, mildly prolonging Warfarin half-life.',
    risk: 'Unpredictable INR fluctuation and delayed bleeding risk.',
    pathway: 'CYP2C19 / CYP2C9 competitive inhibition',
    action: 'Monitor INR within 3-5 days of initiating or discontinuing Omeprazole. Consider Pantoprazole as a lower CYP-inhibiting alternative.',
    alternative: 'Pantoprazole (Protonix) or Famotidine (Pepcid).'
  }
];

// Helper to calculate cross-drug interactions between an arbitrary list of medications
export function calculateRegimenInteractions(medications) {
  const interactions = [];
  const medNames = medications.map(m => m.name.toLowerCase());

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const drugA = medications[i].name.toLowerCase();
      const drugB = medications[j].name.toLowerCase();

      const matchedRule = CLINICAL_DDI_PAIRS.find(pair => {
        const p0 = pair.drugs[0].toLowerCase();
        const p1 = pair.drugs[1].toLowerCase();
        return (drugA.includes(p0) && drugB.includes(p1)) || (drugA.includes(p1) && drugB.includes(p0));
      });

      if (matchedRule) {
        interactions.push({
          id: `ddi-${i}-${j}`,
          pair: `${medications[i].name} + ${medications[j].name}`,
          med1: medications[i],
          med2: medications[j],
          ...matchedRule
        });
      }
    }
  }

  // Calculate composite clinical safety score
  let score = 95;
  interactions.forEach(item => {
    if (item.severity === 'CRITICAL') score -= 55;
    else if (item.severity === 'HIGH') score -= 35;
    else if (item.severity === 'MODERATE') score -= 15;
    else if (item.severity === 'LOW') score += 2;
  });

  return {
    interactions,
    safetyScore: Math.max(5, Math.min(100, score))
  };
}
