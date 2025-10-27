"use client";

import React, { createContext, useContext, useState } from "react";
import { trails as initialTrails, Trail } from "@/data/trails";
import { articles as initialArticles, Article } from "@/data/articles";

// Define the context type
interface SiteContextType {
  trails: Trail[];
  articles: Article[];
  addTrail: (trail: Trail) => void;
  updateTrail: (id: string, updated: Partial<Trail>) => void;
  deleteTrail: (id: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [trails, setTrails] = useState<Trail[]>(initialTrails);
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  // CRUD logic for Trails
  const addTrail = (trail: Trail) => setTrails((prev) => [...prev, trail]);

  const updateTrail = (id: string, updated: Partial<Trail>) =>
    setTrails((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );

  const deleteTrail = (id: string) =>
    setTrails((prev) => prev.filter((t) => t.id !== id));

  // CRUD logic for Articles
  const addArticle = (article: Article) =>
    setArticles((prev) => [...prev, article]);

  const updateArticle = (id: string, updated: Partial<Article>) =>
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );

  const deleteArticle = (id: string) =>
    setArticles((prev) => prev.filter((a) => a.id !== id));

  return (
    <SiteContext.Provider
      value={{
        trails,
        articles,
        addTrail,
        updateTrail,
        deleteTrail,
        addArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context)
    throw new Error("useSite must be used within a SiteProvider");
  return context;
}
