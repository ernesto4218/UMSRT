// routes/match.js

// =====================================================================
// SYNONYMS — tuned to the ACTUAL data in the submissions table
// =====================================================================
const SYNONYMS = {
  // ---------- Customer Service / Sales ----------
  csr: [
    "customer service",
    "costumer service",
    "customer services",
    "customer support",
    "sales",
    "sales lady",
    "globe agent",
    "globe sales agent",
    "globe telecom",
    "jollibee crew",
    "cashier",
    "waiter",
    "waitress",
    "front desk",
  ],
  "customer service": [
    "csr",
    "costumer service",
    "customer services",
    "sales",
    "cashier",
    "front desk",
  ],
  "costumer service": ["customer service", "csr"],
  sales: ["sales lady", "sales agent", "globe agent", "cashier", "retail"],
  cashier: ["sales lady", "counter", "front desk"],

  // ---------- Cooking / Food ----------
  cooking: [
    "cook",
    "chef",
    "kitchen",
    "culinary",
    "nc ii cookery",
    "cookery",
    "baker",
    "baking",
  ],
  cook: ["cooking", "chef", "kitchen", "culinary"],
  chef: ["cooking", "cook", "kitchen", "culinary"],
  cookery: ["cooking", "cook", "culinary"],

  // ---------- Driver / Delivery ----------
  driver: ["delivery", "truck driver", "motorcycle", "driver"],
  delivery: ["driver"],

  // ---------- Office / Computer ----------
  computer: [
    "computer literacy",
    "microsoft",
    "microsoft office",
    "ms office",
    "spreadsheets",
    "excel",
    "word",
    "powerpoint",
    "presentation software",
    "typing",
    "typesetting",
    "using microsoft",
  ],
  microsoft: [
    "computer",
    "microsoft office",
    "ms office",
    "excel",
    "word",
    "powerpoint",
    "spreadsheets",
    "using microsoft",
  ],
  excel: ["spreadsheets", "microsoft", "ms office", "excel"],
  spreadsheets: ["excel", "microsoft", "ms office"],
  "ms office": ["microsoft", "excel", "word", "powerpoint", "spreadsheets"],
  "microsoft office": ["microsoft", "ms office", "excel", "word", "powerpoint"],
  powerpoint: ["presentation software", "microsoft", "ms office"],
  "presentation software": ["powerpoint", "microsoft"],
  typing: ["computer", "typesetting", "data entry"],

  // ---------- Data / Analytics ----------
  data: ["data analysis", "data analyst", "analytics", "spreadsheets"],
  "data analysis": ["data", "analyst", "analytics"],
  analyst: ["data analysis", "data", "analytics"],
  analytics: ["data analysis", "data"],

  // ---------- Communication / Soft skills ----------
  communication: [
    "good in communication",
    "active listening",
    "listening",
    "public speaking",
    "presentation",
    "communicating",
  ],
  "problem solving": [
    "problem-solving",
    "analytical",
    "critical thinking",
    "flexible",
  ],
  "time management": ["organizing", "planning", "organized"],
  organizing: ["time management", "planning"],
  planning: ["organizing", "time management"],
  writing: ["paperworks", "organizing"],
  paperworks: ["writing", "organizing"],

  // ---------- Creative / Design ----------
  design: [
    "designer",
    "portrait artist",
    "artist",
    "painter",
    "graphic design",
    "graphic designer",
    "creative",
  ],
  designer: [
    "design",
    "artist",
    "portrait artist",
    "painter",
    "graphic designer",
  ],
  artist: ["designer", "portrait artist", "painter", "creative"],
  "video editing": ["video editor", "editing", "video", "video editor"],
  "video editor": ["video editing"],

  // ---------- Tech / Programming ----------
  programming: [
    "programmer",
    "developer",
    "software",
    "coding",
    "code",
    "it",
    "tech",
  ],
  programmer: ["programming", "developer", "software developer", "coder"],
  it: [
    "programming",
    "information technology",
    "tech support",
    "computer technician",
  ],
  developer: ["programmer", "programming", "software developer"],

  // ---------- Social Media ----------
  tiktok: [
    "tiktok affiliate",
    "tiktok affliate",
    "social media",
    "content creator",
    "affiliate",
  ],
  "social media": ["tiktok", "content creator", "affiliate"],
  affiliate: ["tiktok", "tiktok affiliate", "social media"],

  // ---------- Education / Teaching ----------
  teacher: [
    "teaching",
    "tutor",
    "educator",
    "instructor",
    "secondary education",
    "education",
    "bachelor of secondary education",
  ],
  teaching: ["teacher", "tutor", "educator", "instructor"],
  education: [
    "teacher",
    "teaching",
    "educator",
    "bachelor of secondary education",
  ],

  // ---------- Health ----------
  nurse: ["nursing", "rn", "midwife", "midwifery", "healthcare"],
  midwife: ["midwifery", "nurse", "nursing", "healthcare"],
  midwifery: ["midwife", "nurse", "nursing"],

  // ---------- Social Work ----------
  "social work": ["social worker", "cswdo", "dswd"],
  "social worker": ["social work"],

  // ---------- Agriculture ----------
  agriculture: ["farming", "farmer", "agri"],
  farmer: ["farming", "agriculture", "agri"],

  // ---------- Criminology ----------
  criminology: ["crim", "police", "law enforcement"],

  // ---------- Course shortcuts ----------
  bsis: [
    "information system",
    "information systems",
    "bachelor of science in information system",
    "bachelor of science in information systems",
  ],
  bsit: [
    "information technology",
    "bachelor of science in information technology",
  ],
  "information system": ["bsis", "is"],
  "information technology": ["bsit", "it"],
  bpe: ["physical education", "bachelor of physical education", "pe"],
  "physical education": ["bpe", "pe"],
  biology: ["bs biology", "bachelor of science in biology", "bio"],
  bio: ["biology"],
};

// =====================================================================
// SKILL CLUSTERS — categories derived from the real skills in the data
// =====================================================================
export const SKILL_CLUSTERS = {
  csr: [
    "customer service",
    "costumer service",
    "customer services",
    "sales",
    "csr",
    "globe",
    "jollibee",
    "cashier",
    "waiter",
    "waitress",
  ],
  office: [
    "computer",
    "microsoft",
    "excel",
    "word",
    "powerpoint",
    "spreadsheets",
    "presentation software",
    "typing",
  ],
  data: ["data analysis", "analyst", "analytics"],
  cook: ["cooking", "cook", "chef", "culinary", "cookery"],
  driver: ["driver", "delivery"],
  creative: [
    "design",
    "designer",
    "artist",
    "painter",
    "video editing",
    "portrait",
  ],
  tech: [
    "programming",
    "programmer",
    "developer",
    "software",
    "coding",
    "code",
  ],
  social: ["tiktok", "affiliate", "social media", "content creator"],
  soft: [
    "communication",
    "problem solving",
    "time management",
    "active listening",
    "organizing",
    "planning",
    "writing",
    "paperworks",
    "flexible",
  ],
  none: ["n/a", "none", "nothing", "wala", "no experience", "i don't have"],
};

export const SKILL_OPTIONS = [
  { value: "csr", label: "Customer Service / Sales" },
  { value: "office", label: "Office / Computer (MS Office)" },
  { value: "data", label: "Data Analysis" },
  { value: "cook", label: "Cooking / Food Service" },
  { value: "driver", label: "Driver / Delivery" },
  { value: "creative", label: "Design / Creative" },
  { value: "tech", label: "Programming / IT" },
  { value: "social", label: "Social Media / TikTok" },
  { value: "soft", label: "Soft Skills (Comm / Time Mgmt)" },
  { value: "none", label: "No skills listed (N/A, None)" },
];

// =====================================================================
// COURSE CLUSTERS — from the real course_taken values
// =====================================================================
export const COURSE_CLUSTERS = {
  bsis: [
    "bsis",
    "information system",
    "information systems",
    "bachelor of science in information system",
  ],
  bsit: [
    "bsit",
    "information technology",
    "bachelor of science in information technology",
    "bachelor of information technology",
  ],
  bpe: ["physical education", "bpe"],
  bio: ["biology", "bachelor of science in biology"],
  educ: ["secondary education", "bachelor of secondary education", "education"],
  mid: ["midwifery", "midwife"],
  social: ["social work", "bachelor of science in social work"],
  agri: ["agriculture"],
  crim: ["criminology"],
};

export const COURSE_OPTIONS = [
  { value: "bsis", label: "BS Information System (BSIS)" },
  { value: "bsit", label: "BS Information Technology (BSIT)" },
  { value: "bpe", label: "Bachelor of Physical Education (BPE)" },
  { value: "bio", label: "BS Biology" },
  { value: "educ", label: "BS Secondary Education" },
  { value: "mid", label: "BS Midwifery" },
  { value: "social", label: "BS Social Work" },
  { value: "agri", label: "BS Agriculture" },
  { value: "crim", label: "BS Criminology" },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Best match" },
  { value: "newest", label: "Newest first" },
  { value: "age_asc", label: "Youngest first" },
  { value: "age_desc", label: "Oldest first" },
];

// =====================================================================
// FIELDS — weighted fields for scoring
// =====================================================================
const FIELDS = [
  { key: "skills", weight: 10, label: "Skills", icon: "sparkles" },
  { key: "course", weight: 5, label: "Course", icon: "book" },
  { key: "college", weight: 2, label: "Education", icon: "book" },
  { key: "prev_job_1", weight: 6, label: "Previous role", icon: "briefcase" },
  { key: "prev_job_2", weight: 6, label: "Previous role", icon: "briefcase" },
  { key: "want_job_1", weight: 4, label: "Looking for", icon: "target" },
  { key: "want_job_2", weight: 4, label: "Looking for", icon: "target" },
];

const MAX_WEIGHT = Math.max(...FIELDS.map((f) => f.weight));

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function tokenize(str) {
  return (str || "")
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .map((t) => t.replace(/^[.]+|[.]+$/g, ""))
    .filter((t) => t.length >= 2);
}

export function buildSearchTerms(query) {
  const baseTokens = tokenize(query);
  const expanded = new Set(baseTokens);
  for (const tok of baseTokens) {
    if (SYNONYMS[tok]) SYNONYMS[tok].forEach((s) => expanded.add(s));
  }
  return { baseTokens, expandedTerms: [...expanded] };
}

function containsTerm(haystack, term) {
  if (!haystack || !term) return false;
  const h = haystack.toLowerCase();
  if (
    term.includes(" ") ||
    term.includes("-") ||
    term.includes(".") ||
    term.includes("#")
  )
    return h.includes(term);
  const re = new RegExp(`(^|[^a-z0-9])${escapeRegex(term)}([^a-z0-9]|$)`, "i");
  return re.test(h);
}

export function scoreCandidate(candidate, terms) {
  let score = 0;
  const matchedBase = new Set();
  const reasonsMap = new Map();

  for (const term of terms.expandedTerms) {
    for (const field of FIELDS) {
      const value = candidate[field.key];
      if (containsTerm(value, term)) {
        score += field.weight;

        for (const bt of terms.baseTokens) {
          if (bt === term || (SYNONYMS[bt] && SYNONYMS[bt].includes(term))) {
            matchedBase.add(bt);
          }
        }

        const key = `${field.label}::${value}`;
        if (!reasonsMap.has(key)) {
          reasonsMap.set(key, {
            label: field.label,
            icon: field.icon,
            value: value,
            terms: new Set(),
          });
        }
        reasonsMap.get(key).terms.add(term);
      }
    }
  }

  const maxPossible = Math.max(1, terms.baseTokens.length * MAX_WEIGHT);
  const matchPct = Math.min(100, Math.round((score / maxPossible) * 100));

  const reasons = [...reasonsMap.values()].map((r) => ({
    label: r.label,
    icon: r.icon,
    value: r.value,
    terms: [...r.terms],
  }));

  return { score, matchPct, matchedBase: [...matchedBase], reasons };
}
