export type PlantStatus = "Good" | "Risk" | "Problem";

export interface PlantAnalysis {
  id: string;
  image: string;
  name: string;
  place: string;
  date: string;
  status: PlantStatus;
}
