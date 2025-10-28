"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Trail } from "@/data/trails";
import type { Article } from "@/data/articles";

interface SiteContextType {
  trails: Trail[];
  articles: Article[];
  loading: boolean;
  fetchTrails: () => Promise<void>;
  fetchArticles: () => Promise<void>;
  addTrail: (trail: Omit<Trail, "id">) => Promise<void>;
  updateTrail: (id: string, data: Partial<Trail>) => Promise<void>;
  deleteTrail: (id: string) => Promise<void>;
  addArticle: (article: Omit<Article, "id">) => Promise<void>;
  updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:4000/api";

  // fetch data on mount
  useEffect(() => {
    Promise.all([fetchTrails(), fetchArticles()]).then(() => setLoading(false));
  }, []);

  const fetchTrails = async () => {
    const res = await fetch(`${API_URL}/trails`);
    const data = await res.json();
    setTrails(data);
  };

  const fetchArticles = async () => {
    const res = await fetch(`${API_URL}/articles`);
    const data = await res.json();
    setArticles(data);
  };

  const addTrail = async (trail: Omit<Trail, "id">) => {
    const res = await fetch(`${API_URL}/trails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trail),
    });
    if (res.ok) await fetchTrails();
  };

  const updateTrail = async (id: string, data: Partial<Trail>) => {
    const res = await fetch(`${API_URL}/trails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) await fetchTrails();
  };

  const deleteTrail = async (id: string) => {
    const res = await fetch(`${API_URL}/trails/${id}`, { method: "DELETE" });
    if (res.ok) await fetchTrails();
  };

  const addArticle = async (article: Omit<Article, "id">) => {
    const res = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    if (res.ok) await fetchArticles();
  };

  const updateArticle = async (id: string, data: Partial<Article>) => {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) await fetchArticles();
  };

  const deleteArticle = async (id: string) => {
    const res = await fetch(`${API_URL}/articles/${id}`, { method: "DELETE" });
    if (res.ok) await fetchArticles();
  };

  return (
    <SiteContext.Provider
      value={{
        trails,
        articles,
        loading,
        fetchTrails,
        fetchArticles,
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
