export type PlantStatus = "Good" | "Risk" | "Problem";

export interface PlantAnalysis {
  id: string;
  image: string;
  name: string;
  place: string;
  date: string;
  status: PlantStatus;
}

export interface AnalysisMetric {
  id: string;
  title: string;
  value: string;
  detail: string;
}

export interface AnalysisStage {
  id: string;
  title: string;
  description: string;
}

export interface AnalysisInsight {
  id: string;
  title: string;
  description: string;
}
