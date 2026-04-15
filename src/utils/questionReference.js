const BOOKS = {
  FCM_MANUAL: "FCM Florida Contractors Manual 2025 Edition",
  OSHA_1926: "Construction Industry Regulations - 29 CFR 1926 OSHA (Jan 1, 2026)",
  CHAPTER_455: "2025 Chapter 455",
  FBC_MECHANICAL: "Florida Building Code Mechanical - Eighth Edition (2023)",
  FBC_ENERGY: "Florida Building Code - Energy Conservation - Eighth Edition (2023)",
  EEBC_FLORIDA: "Energy Efficient Building Construction in Florida - 11th Edition (UF)",
  ENERGY_SYSTEMS: "Energy Systems Analysis and Management - Second Edition",
  RAC_TECH: "Refrigeration & Air Conditioning Technology - Tenth Edition (ICC/Cengage)",
  TROUBLESHOOTING: "Air Conditioning and Refrigeration Troubleshooting Handbook (2nd Edition, 2003)",
  PIPEFITTERS: "Pipefitters Handbook - Forrest Lindsey",
  FIBROUS_GLASS_DUCT: "Fibrous Glass Duct Construction Standards",
  NFPA_90A: "NFPA 90A - Standard for the Installation of Air-Conditioning and Ventilating Systems (2015)",
  NFPA_90B: "NFPA 90B - Standard for the Installation of Warm Air Heating and Air Conditioning Systems (2024)",
  NFPA_96: "NFPA 96 - Standard for Ventilation Control and Fire Protection of Commercial Cooking Operations (2021)",
  BUILDERS_GUIDE: "Builder's Guide to Accounting - Revised Edition",
};

const normalize = (value) => (value || "").toString().toLowerCase();

const includesAny = (text, keywords) => {
  return keywords.some((keyword) => text.includes(keyword));
};

export const getReferenceBook = (question) => {
  if (!question) return "";
  if (question.reference_book) return question.reference_book;

  const combinedText = normalize(
    [question.question_en, question.question_pt, question.reference].filter(Boolean).join(" ")
  );

  const category = question.category;

  if (category === "NFPA") {
    if (
      includesAny(combinedText, [
        "96",
        "grease",
        "hood",
        "kitchen",
        "cooking",
        "commercial cooking",
      ])
    ) {
      return BOOKS.NFPA_96;
    }

    if (
      includesAny(combinedText, [
        "90b",
        "warm air",
        "one- and two-family",
        "one and two-family",
        "residential",
      ])
    ) {
      return BOOKS.NFPA_90B;
    }

    return BOOKS.NFPA_90A;
  }

  if (category === "FBC Mechanical") return BOOKS.FBC_MECHANICAL;

  if (category === "Energy Efficiency") return BOOKS.EEBC_FLORIDA;

  if (category === "OSHA / Safety" || category === "Safety") return BOOKS.OSHA_1926;

  if (category === "Troubleshooting") return BOOKS.TROUBLESHOOTING;

  if (category === "Design") return BOOKS.ENERGY_SYSTEMS;

  if (category === "Finance") return BOOKS.BUILDERS_GUIDE;

  if (category === "Business" || category === "Business & Ethics" || category === "Business & Finance") {
    if (
      includesAny(combinedText, [
        "balance sheet",
        "income statement",
        "cash flow",
        "financial",
        "accounting",
        "ledger",
        "journal",
        "budget",
        "ratio",
      ])
    ) {
      return BOOKS.BUILDERS_GUIDE;
    }
    return BOOKS.FCM_MANUAL;
  }

  if (category === "Compliance" || category === "Codes & Licensing" || category === "Code") {
    if (includesAny(combinedText, ["osha", "29 cfr", "1926"])) {
      return BOOKS.OSHA_1926;
    }

    if (includesAny(combinedText, ["chapter 455", "455.", "f.s. 455", "fs 455"])) {
      return BOOKS.CHAPTER_455;
    }

    if (
      includesAny(combinedText, [
        "energy conservation",
        "energy code",
        "r-value",
        "r-",
        "duct leakage",
        "seers",
      ])
    ) {
      return BOOKS.FBC_ENERGY;
    }

    if (
      includesAny(combinedText, [
        "mechanical",
        "condensate",
        "exhaust duct",
        "attic",
        "duct sealing",
        "refrigerant piping",
        "plenum",
        "fire damper",
        "smoke damper",
        "fbc mechanical",
      ])
    ) {
      return BOOKS.FBC_MECHANICAL;
    }

    return BOOKS.FCM_MANUAL;
  }

  if (category === "Electrical" || category === "Electrical HVAC") {
    return BOOKS.RAC_TECH;
  }

  if (category === "HVAC" || category === "HVAC Trade" || category === "Trade") {
    if (includesAny(combinedText, ["hydronic", "boiler", "steam", "piping"])) {
      return BOOKS.PIPEFITTERS;
    }

    if (includesAny(combinedText, ["fibrous", "fiberglass", "ductboard"])) {
      return BOOKS.FIBROUS_GLASS_DUCT;
    }

    return BOOKS.RAC_TECH;
  }

  return "";
};
