"use client";

import { useState, useEffect } from "react";
import { Product } from "../domain/types";

const COMPARE_STORAGE_KEY = "jb_compare_models_v1";

export function useCompareList() {
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (stored) {
        setCompareModels(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const saveList = (newList: string[]) => {
    setCompareModels(newList);
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  const toggleCompare = (model: string) => {
    if (compareModels.includes(model)) {
      saveList(compareModels.filter((m) => m !== model));
    } else {
      if (compareModels.length >= 3) {
        // limit to 3 products
        saveList([...compareModels.slice(1), model]);
      } else {
        saveList([...compareModels, model]);
      }
    }
  };

  const isComparing = (model: string) => compareModels.includes(model);

  const clearCompare = () => saveList([]);

  return {
    compareModels,
    isLoaded,
    compareCount: compareModels.length,
    toggleCompare,
    isComparing,
    clearCompare,
  };
}
