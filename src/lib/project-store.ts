"use client";

import { useState, useEffect } from "react";
import { Product, SavedProjectItem } from "../domain/types";

const PROJECT_STORAGE_KEY = "jb_saved_project_items_v1";

export function useProjectSchedule() {
  const [items, setItems] = useState<SavedProjectItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROJECT_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const saveItems = (newItems: SavedProjectItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const addItem = (product: Product, quantity = 1, notes = "") => {
    const existingIndex = items.findIndex((i) => i.productId === product.id);
    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      saveItems(updated);
    } else {
      const newItem: SavedProjectItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        product,
        quantity,
        notes,
        addedAt: new Date().toISOString(),
      };
      saveItems([...items, newItem]);
    }
  };

  const removeItem = (id: string) => {
    saveItems(items.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    saveItems(
      items.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const updateNotes = (id: string, notes: string) => {
    saveItems(
      items.map((i) => (i.id === id ? { ...i, notes } : i))
    );
  };

  const clearProject = () => {
    saveItems([]);
  };

  const isInProject = (productId: string) => {
    return items.some((i) => i.productId === productId);
  };

  return {
    items,
    isLoaded,
    itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    clearProject,
    isInProject,
  };
}
