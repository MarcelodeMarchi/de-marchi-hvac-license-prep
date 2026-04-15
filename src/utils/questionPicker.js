const DEFAULT_HISTORY_KEY = "question-history-v1";

const hasStorage = () => {
  return typeof window !== "undefined" && window.localStorage;
};

const loadUsedIds = (storageKey) => {
  if (!hasStorage()) return new Set();

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return new Set();
    return new Set(data);
  } catch (error) {
    return new Set();
  }
};

const saveUsedIds = (storageKey, usedIds) => {
  if (!hasStorage()) return;
  const payload = Array.from(usedIds);
  window.localStorage.setItem(storageKey, JSON.stringify(payload));
};

export const shuffleArray = (array) => {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

export const getNonRepeatingSelection = (
  pool,
  count,
  storageKey = DEFAULT_HISTORY_KEY
) => {
  if (!Array.isArray(pool)) return [];

  const usedIds = loadUsedIds(storageKey);
  let available = pool.filter((q) => !usedIds.has(q.id));

  if (available.length < count) {
    usedIds.clear();
    available = pool;
  }

  const shuffled = shuffleArray(available);
  const limit = Math.min(count, shuffled.length);
  const picked = shuffled.slice(0, limit);

  const updatedIds = new Set(usedIds);
  picked.forEach((q) => updatedIds.add(q.id));
  saveUsedIds(storageKey, updatedIds);

  return picked;
};
