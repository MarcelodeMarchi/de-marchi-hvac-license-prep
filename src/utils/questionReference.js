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

const includesAny = (text, keywords) => keywords.some((keyword) => text.includes(keyword));

const findKeywordMatch = (text, entries) => {
  return entries.find((entry) => includesAny(text, entry.keywords));
};

const selectBook = (question) => {
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
        "seer",
        "eer",
        "afue",
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

const mapOshaReference = (text) => {
  const entries = [
    { keywords: ["ppe", "personal protective"], chapter: "Subpart E", page: "217" },
    { keywords: ["fall"], chapter: "Subpart M", page: "305" },
    { keywords: ["scaffold"], chapter: "Subpart L", page: "288" },
    { keywords: ["ladder"], chapter: "Subpart X", page: "437" },
    { keywords: ["electrical"], chapter: "Subpart K", page: "271" },
    { keywords: ["fire protection", "flammable"], chapter: "Subpart F", page: "239" },
    { keywords: ["welding", "cutting"], chapter: "Subpart J", page: "267" },
    { keywords: ["excavat"], chapter: "Subpart P", page: "333" },
    { keywords: ["crane"], chapter: "Subpart N", page: "630" },
    { keywords: ["demolition"], chapter: "Subpart T", page: "387" },
    { keywords: ["hazcom", "sds", "chemical"], chapter: "Subpart D", page: "103" },
    { keywords: ["record", "form 300", "injur", "illness"], chapter: "1904", page: "37" },
    { keywords: ["inspection", "citation"], chapter: "1903", page: "29" },
    { keywords: ["housekeeping", "sanitation"], chapter: "Subpart C", page: "71" },
  ];
  return findKeywordMatch(text, entries);
};

const mapFbcMechanicalReference = (text) => {
  const entries = [
    { keywords: ["ventilation"], chapter: "Chapter 4", page: "25" },
    { keywords: ["exhaust", "hood"], chapter: "Chapter 5", page: "35" },
    { keywords: ["duct", "plenum"], chapter: "Chapter 6", page: "65" },
    { keywords: ["combustion air"], chapter: "Chapter 7", page: "79" },
    { keywords: ["chimney", "vent"], chapter: "Chapter 8", page: "81" },
    { keywords: ["fireplace", "solid fuel", "heater"], chapter: "Chapter 9", page: "87" },
    { keywords: ["boiler", "water heater", "pressure vessel"], chapter: "Chapter 10", page: "93" },
    { keywords: ["refrigerat", "machinery room"], chapter: "Chapter 11", page: "97" },
    { keywords: ["hydronic", "piping"], chapter: "Chapter 12", page: "109" },
    { keywords: ["fuel oil"], chapter: "Chapter 13", page: "117" },
    { keywords: ["solar"], chapter: "Chapter 14", page: "121" },
  ];
  return findKeywordMatch(text, entries);
};

const mapFbcEnergyReference = (text) => {
  const entries = [
    { keywords: ["air barrier", "air leakage", "infiltration"], chapter: "R402.4", page: "R402.4" },
    { keywords: ["insulation", "r-value", "r-"], chapter: "R402", page: "R402" },
    { keywords: ["duct", "duct leakage"], chapter: "R403.3", page: "R403.3" },
    { keywords: ["fenestration", "window", "u-factor", "shgc"], chapter: "R402.3", page: "R402.3" },
    { keywords: ["hot water"], chapter: "R403.4", page: "R403.4" },
    { keywords: ["lighting"], chapter: "R404/C405", page: "R404" },
    { keywords: ["eri", "energy rating"], chapter: "R406", page: "R406" },
    { keywords: ["performance", "energy analysis"], chapter: "R405", page: "R405" },
    { keywords: ["hvac", "heat pump", "cooling"], chapter: "R403", page: "R403" },
  ];
  return findKeywordMatch(text, entries);
};

const mapEebcFloridaReference = (text) => {
  const entries = [
    { keywords: ["air barrier"], chapter: "Building Science", page: "63-64" },
    { keywords: ["air leakage"], chapter: "Building Science", page: "66, 120" },
    { keywords: ["blower door"], chapter: "Building Science", page: "86-87" },
    { keywords: ["moisture", "vapor"], chapter: "Building Science", page: "53-63" },
    { keywords: ["insulation", "r-value"], chapter: "Insulation", page: "95-111" },
    { keywords: ["radiant"], chapter: "Insulation", page: "125-126" },
    { keywords: ["window", "door", "u-factor", "shgc"], chapter: "Windows/Doors", page: "134-146" },
    { keywords: ["hvac", "heat pump", "manual j", "load"], chapter: "HVAC", page: "163-177" },
    { keywords: ["ventilation", "iaq"], chapter: "Ventilation", page: "35-38, 177-180" },
    { keywords: ["duct", "duct leakage"], chapter: "Duct Systems", page: "185-192" },
    { keywords: ["seer", "afue", "hspf"], chapter: "Energy Metrics", page: "167-173" },
    { keywords: ["lighting", "lumens", "led"], chapter: "Lighting", page: "240-254" },
    { keywords: ["water heater", "uef", "ef"], chapter: "Water Heating", page: "207-223" },
    { keywords: ["code", "r402", "r403"], chapter: "Codes", page: "C301-C405" },
    { keywords: ["orientation", "passive", "conduction"], chapter: "Building Design", page: "31-41, 134-137" },
  ];
  return findKeywordMatch(text, entries);
};

const mapEnergySystemsReference = (text) => {
  const entries = [
    { keywords: ["audit"], chapter: "Chapter 6", page: "6.1" },
    { keywords: ["energy conservation", "checklist"], chapter: "Chapter 1", page: "1.7" },
    { keywords: ["air system", "duct"], chapter: "Chapter 2", page: "2.1" },
    { keywords: ["domestic water", "hot water"], chapter: "Chapter 3", page: "3.1" },
    { keywords: ["electrical", "lighting"], chapter: "Chapter 4", page: "4.1" },
    { keywords: ["iaq", "maintenance"], chapter: "Chapter 5", page: "5.1" },
    { keywords: ["estimating"], chapter: "Chapter 8", page: "8.1" },
    { keywords: ["econom", "life-cycle"], chapter: "Chapter 9", page: "9.1" },
    { keywords: ["refrigerant", "cfc"], chapter: "Chapter 10", page: "10.1" },
    { keywords: ["energy recovery"], chapter: "Chapter 11", page: "11.1" },
    { keywords: ["evaporative"], chapter: "Chapter 12", page: "12.1" },
    { keywords: ["solar", "alternative"], chapter: "Chapter 13", page: "13.1" },
    { keywords: ["hydronic"], chapter: "Chapter 14", page: "14.1" },
    { keywords: ["investment"], chapter: "Chapter 15", page: "15.1" },
    { keywords: ["energy conservation measures"], chapter: "Chapter 16", page: "16.1" },
    { keywords: ["psychrometric"], chapter: "Chapter 18", page: "18.7" },
  ];
  return findKeywordMatch(text, entries);
};

const mapRacTechReference = (text) => {
  const entries = [
    { keywords: ["heat", "temperature", "pressure"], chapter: "Unit 1", page: "Unit 1" },
    { keywords: ["refrigeration cycle"], chapter: "Unit 3", page: "Unit 3" },
    { keywords: ["safety"], chapter: "Unit 4", page: "Unit 4" },
    { keywords: ["tool", "instrument"], chapter: "Unit 5", page: "Unit 5" },
    { keywords: ["refrigerant handling", "recovery"], chapter: "Unit 9", page: "Unit 9" },
    { keywords: ["charging"], chapter: "Unit 10", page: "Unit 10" },
    { keywords: ["control"], chapter: "Unit 13-16", page: "Unit 13-16" },
    { keywords: ["motor"], chapter: "Unit 17-20", page: "Unit 17-20" },
    { keywords: ["evaporator"], chapter: "Unit 21", page: "Unit 21" },
    { keywords: ["condenser"], chapter: "Unit 22", page: "Unit 22" },
    { keywords: ["compressor"], chapter: "Unit 23", page: "Unit 23" },
    { keywords: ["txv", "expansion"], chapter: "Unit 24", page: "Unit 24" },
    { keywords: ["refrigeration system"], chapter: "Unit 25", page: "Unit 25" },
    { keywords: ["ice machine"], chapter: "Unit 27", page: "Unit 27" },
    { keywords: ["troubleshooting"], chapter: "Unit 29", page: "Unit 29" },
    { keywords: ["heat pump"], chapter: "Unit 43-44", page: "Unit 43-44" },
    { keywords: ["psychrometric"], chapter: "Unit 35", page: "Unit 35" },
    { keywords: ["duct", "air distribution"], chapter: "Unit 37", page: "Unit 37" },
    { keywords: ["load"], chapter: "Unit 42", page: "Unit 42" },
  ];
  return findKeywordMatch(text, entries);
};

const mapTroubleshootingReference = (text) => {
  const entries = [
    { keywords: ["compressor", "evaporator", "condenser"], chapter: "Chapter 1", page: "1-146" },
    { keywords: ["electronic control", "thermostat"], chapter: "Chapter 2", page: "147" },
    { keywords: ["startup", "start-up"], chapter: "Chapter 3", page: "251" },
    { keywords: ["service", "gauge manifold", "leak"], chapter: "Chapter 4", page: "257" },
    { keywords: ["wiring diagram"], chapter: "Chapter 5", page: "313" },
    { keywords: ["safety"], chapter: "Chapter 6", page: "427" },
    { keywords: ["troubleshooting chart"], chapter: "Chapter 7", page: "438" },
    { keywords: ["engineering data"], chapter: "Chapter 8", page: "487" },
  ];
  return findKeywordMatch(text, entries);
};

const mapPipefittersReference = (text) => {
  const entries = [
    { keywords: ["bend", "offset", "radius"], chapter: "Part 1", page: "1-1" },
    { keywords: ["miter", "fabrication", "elbow"], chapter: "Part 2", page: "2-1" },
    { keywords: ["solder", "braz", "plastic pipe"], chapter: "Part 3", page: "3-1" },
    { keywords: ["flange", "thread", "fitting"], chapter: "Part 4", page: "4-1" },
    { keywords: ["reference", "conversion", "trigon"], chapter: "Part 5", page: "5-1" },
  ];
  return findKeywordMatch(text, entries);
};

const mapFibrousGlassDuctReference = (text) => {
  const entries = [
    { keywords: ["board", "duct board"], chapter: "Section 1", page: "1.1" },
    { keywords: ["characteristics", "class", "duct rating"], chapter: "Section 2", page: "2.1-2.2" },
    { keywords: ["joint", "mastic", "seam", "tape"], chapter: "Section 3", page: "3.3-3.5" },
    { keywords: ["elbow", "transition", "tee", "splitter"], chapter: "Section 4", page: "4.1-4.7" },
    { keywords: ["reinforcement", "termination", "sag"], chapter: "Section 5", page: "5.1-5.18" },
    { keywords: ["hanger", "support"], chapter: "Section 6", page: "6.1-6.8" },
  ];
  return findKeywordMatch(text, entries);
};

const mapNfpaReference = (text, book) => {
  const entries90A = [
    { keywords: ["damper", "smoke"], chapter: "Chapter 5-7", page: "90A-15" },
    { keywords: ["duct", "plenum"], chapter: "Chapter 4", page: "90A-7" },
    { keywords: ["maintenance"], chapter: "Annex B", page: "90A-22" },
  ];
  const entries90B = [
    { keywords: ["supply", "return"], chapter: "Chapter 5", page: "90B-6" },
    { keywords: ["combustible", "clearance"], chapter: "Chapter 6", page: "90B-9" },
    { keywords: ["equipment", "controls"], chapter: "Chapter 7", page: "90B-14" },
  ];
  const entries96 = [
    { keywords: ["hood"], chapter: "Chapter 5", page: "5.1" },
    { keywords: ["grease", "duct"], chapter: "Chapter 7", page: "7.1" },
    { keywords: ["fire extinguishing", "suppression"], chapter: "Chapter 10", page: "10.1" },
    { keywords: ["cleaning", "inspection"], chapter: "Chapter 12", page: "12.1" },
  ];

  if (book === BOOKS.NFPA_96) return findKeywordMatch(text, entries96);
  if (book === BOOKS.NFPA_90B) return findKeywordMatch(text, entries90B);
  return findKeywordMatch(text, entries90A);
};

const mapBuildersGuideReference = (text) => {
  const entries = [
    { keywords: ["record", "bookkeeping"], chapter: "Chapter 1", page: "5" },
    { keywords: ["accounting method"], chapter: "Chapter 2", page: "23" },
    { keywords: ["sales", "receivable"], chapter: "Chapter 3-4", page: "37-53" },
    { keywords: ["bad debt"], chapter: "Chapter 5", page: "63" },
    { keywords: ["cash budget"], chapter: "Chapter 6, 14", page: "71, 173" },
    { keywords: ["profit"], chapter: "Chapter 8", page: "87" },
    { keywords: ["check", "payable"], chapter: "Chapter 9", page: "97" },
    { keywords: ["materials", "inventory"], chapter: "Chapter 10", page: "115" },
    { keywords: ["payroll"], chapter: "Chapter 11", page: "125" },
    { keywords: ["overhead"], chapter: "Chapter 12", page: "141" },
    { keywords: ["depreciation"], chapter: "Chapter 13", page: "155" },
    { keywords: ["financial statement", "balance sheet", "income statement"], chapter: "Chapter 21", page: "247" },
    { keywords: ["ratio"], chapter: "Chapter 23", page: "267" },
  ];
  return findKeywordMatch(text, entries);
};

const mapFcmManualReference = (text) => {
  const entries = [
    { keywords: ["business plan", "organization"], chapter: "Chapter 1", page: "1" },
    { keywords: ["licens"], chapter: "Chapter 2", page: "2" },
    { keywords: ["financial"], chapter: "Chapter 3", page: "3" },
    { keywords: ["risk"], chapter: "Chapter 4", page: "4" },
    { keywords: ["labor", "employment"], chapter: "Chapter 5", page: "5" },
    { keywords: ["workers", "compensation"], chapter: "Chapter 6", page: "6" },
    { keywords: ["safety"], chapter: "Chapter 7", page: "7" },
    { keywords: ["contract", "subcontract"], chapter: "Chapter 8", page: "8" },
    { keywords: ["lien", "bond"], chapter: "Chapter 9", page: "9" },
    { keywords: ["project management"], chapter: "Chapter 10", page: "10" },
  ];
  return findKeywordMatch(text, entries);
};

const mapChapter455Reference = (text) => {
  const entries = [
    { keywords: ["definition", "applicability"], chapter: "General Provisions", page: "455.01" },
    { keywords: ["licens", "exam"], chapter: "Licensing", page: "455.213-455.217" },
    { keywords: ["education", "continuing"], chapter: "Education", page: "455.212" },
    { keywords: ["discipline", "penalt"], chapter: "Discipline", page: "455.227" },
    { keywords: ["enforcement", "unlicensed"], chapter: "Enforcement", page: "455.228" },
    { keywords: ["public records"], chapter: "Public Records", page: "455.229" },
  ];
  return findKeywordMatch(text, entries);
};

const getApproximateReference = (question, book) => {
  const text = normalize(
    [question.question_en, question.question_pt, question.reference].filter(Boolean).join(" ")
  );

  if (book === BOOKS.OSHA_1926) return mapOshaReference(text);
  if (book === BOOKS.FBC_MECHANICAL) return mapFbcMechanicalReference(text);
  if (book === BOOKS.FBC_ENERGY) return mapFbcEnergyReference(text);
  if (book === BOOKS.EEBC_FLORIDA) return mapEebcFloridaReference(text);
  if (book === BOOKS.ENERGY_SYSTEMS) return mapEnergySystemsReference(text);
  if (book === BOOKS.RAC_TECH) return mapRacTechReference(text);
  if (book === BOOKS.TROUBLESHOOTING) return mapTroubleshootingReference(text);
  if (book === BOOKS.PIPEFITTERS) return mapPipefittersReference(text);
  if (book === BOOKS.FIBROUS_GLASS_DUCT) return mapFibrousGlassDuctReference(text);
  if (book === BOOKS.BUILDERS_GUIDE) return mapBuildersGuideReference(text);
  if (book === BOOKS.FCM_MANUAL) return mapFcmManualReference(text);
  if (book === BOOKS.CHAPTER_455) return mapChapter455Reference(text);
  if (book === BOOKS.NFPA_90A || book === BOOKS.NFPA_90B || book === BOOKS.NFPA_96) {
    return mapNfpaReference(text, book);
  }

  return null;
};

export const getReferenceBook = (question) => selectBook(question);

export const getReferenceInfo = (question) => {
  if (!question) return { book: "", chapter: "", page: "", note: "" };

  const book = selectBook(question);
  const approx = getApproximateReference(question, book);

  if (!approx) {
    return { book, chapter: "", page: "", note: "" };
  }

  return {
    book,
    chapter: approx.chapter || "",
    page: approx.page || "",
    note: "aproximado",
  };
};
