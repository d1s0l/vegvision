import type { PlantAnalysis, PlantStatus } from "./types";

export const plantStatusText: Record<PlantStatus, string> = {
  Good: "Здоровое",
  Risk: "Риск заболевания",
  Problem: "Обнаружено заболевание",
};

export const recentAnalyses: PlantAnalysis[] = [
  {
    id: "1",
    image: "/lk/camera-icon.svg",
    name: "Томаты",
    place: "Теплица 1",
    date: "14.02.2026",
    status: "Good",
  },
  {
    id: "2",
    image: "/lk/camera-icon.svg",
    name: "Томаты",
    place: "Теплица 1",
    date: "14.02.2026",
    status: "Risk",
  },
  {
    id: "3",
    image: "/lk/camera-icon.svg",
    name: "Томаты",
    place: "Теплица 1",
    date: "14.02.2026",
    status: "Problem",
  },
];
