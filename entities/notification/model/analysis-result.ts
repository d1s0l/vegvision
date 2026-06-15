import type { NotificationPayload } from "./types";

export interface DiseasePrediction {
  class: string;
  confidence: number;
}

export interface AnalysisResult {
  disease: string;
  message: string;
  confidencePercent: number | null;
  needsAgronomist: boolean;
  imageUrl: string;
  visualizationUrl: string;
  top3: DiseasePrediction[];
}

export const diseaseRu: Record<string, string> = {
  "Cucumber_Fresh Leaf": "Свежий лист огурца",
  Cucumber_Anthracnose: "Антракноз огурца",
  Tomato___Late_blight: "Фитофтороз томата",
  Tomato___healthy: "Здоровый томат",
  Tomato___Tomato_Yellow_Leaf_Curl_Virus:
    "Вирус желтой курчавости томата",
  Tomato___Leaf_Mold: "Бурая пятнистость томата",
  Potato___Early_blight: "Фитофтороз картофеля",
  Potato___Late_blight: "Фитофтороз картофеля (поздний)",
  Potato___healthy: "Здоровый картофель",
  Pepper___Bacterial_spot: "Бактериальная пятнистость перца",
  Pepper___healthy: "Здоровый перец",
};

export function translateDisease(value: string) {
  return diseaseRu[value] || value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function getModelResponse(payload: NotificationPayload) {
  if (!isRecord(payload.models)) {
    return null;
  }

  const successfulModel = Object.values(payload.models).find(
    (model) => isRecord(model) && model.ok !== false && isRecord(model.resp),
  );

  return isRecord(successfulModel) && isRecord(successfulModel.resp)
    ? successfulModel.resp
    : null;
}

function getStringValue(
  payload: NotificationPayload,
  response: Record<string, unknown> | null,
  key: string,
) {
  const payloadValue = payload[key];

  if (typeof payloadValue === "string") {
    return payloadValue;
  }

  const responseValue = response?.[key];

  return typeof responseValue === "string" ? responseValue : "";
}

function getNumberValue(
  payload: NotificationPayload,
  response: Record<string, unknown> | null,
  key: string,
) {
  const payloadValue = payload[key];

  if (typeof payloadValue === "number" && Number.isFinite(payloadValue)) {
    return payloadValue;
  }

  const responseValue = response?.[key];

  return typeof responseValue === "number" && Number.isFinite(responseValue)
    ? responseValue
    : null;
}

function getBooleanValue(
  payload: NotificationPayload,
  response: Record<string, unknown> | null,
  key: string,
) {
  const payloadValue = payload[key];

  if (typeof payloadValue === "boolean") {
    return payloadValue;
  }

  const responseValue = response?.[key];

  return typeof responseValue === "boolean" ? responseValue : false;
}

function getTop3(response: Record<string, unknown> | null) {
  const value = response?.top3;

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is DiseasePrediction =>
      isRecord(item) &&
      typeof item.class === "string" &&
      typeof item.confidence === "number" &&
      Number.isFinite(item.confidence),
  );
}

export function getAnalysisResult(payload: NotificationPayload): AnalysisResult {
  const response = getModelResponse(payload);

  return {
    disease: getStringValue(payload, response, "disease"),
    message: getStringValue(payload, response, "message"),
    confidencePercent: getNumberValue(payload, response, "confidence_percent"),
    needsAgronomist: getBooleanValue(payload, response, "needs_agronomist"),
    imageUrl: getStringValue(payload, response, "image_url"),
    visualizationUrl: getStringValue(payload, response, "visualization_path"),
    top3: getTop3(response),
  };
}

