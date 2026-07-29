import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "murle-connect:bookmarks";

export interface BookmarkEntry {
  key: string; // unique: `${section}:${id}`
  section: "history" | "culture" | "stories" | "traditions" | "proverbs";
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  route: string;
  savedAt: string;
}

let cache: BookmarkEntry[] | null = null;
const listeners = new Set<(entries: BookmarkEntry[]) => void>();

async function loadAll(): Promise<BookmarkEntry[]> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

async function persist(entries: BookmarkEntry[]) {
  cache = entries;
  listeners.forEach((cb) => cb(entries));
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage failures are non-fatal; bookmarks simply won't persist this session.
  }
}

export function useBookmarks() {
  const [entries, setEntries] = useState<BookmarkEntry[]>(cache ?? []);
  const [ready, setReady] = useState(cache !== null);

  useEffect(() => {
    let mounted = true;
    loadAll().then((all) => {
      if (mounted) {
        setEntries(all);
        setReady(true);
      }
    });
    const listener = (all: BookmarkEntry[]) => setEntries(all);
    listeners.add(listener);
    return () => {
      mounted = false;
      listeners.delete(listener);
    };
  }, []);

  const isBookmarked = useCallback(
    (key: string) => entries.some((e) => e.key === key),
    [entries]
  );

  const toggleBookmark = useCallback(
    async (entry: Omit<BookmarkEntry, "savedAt">) => {
      const all = await loadAll();
      const exists = all.some((e) => e.key === entry.key);
      const next = exists
        ? all.filter((e) => e.key !== entry.key)
        : [{ ...entry, savedAt: new Date().toISOString() }, ...all];
      await persist(next);
    },
    []
  );

  return { entries, ready, isBookmarked, toggleBookmark };
}
