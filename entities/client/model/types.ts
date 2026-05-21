export type ClientPlan = "Starter" | "Growth" | "Scale" | "Enterprise";
export type SubscriptionStatus = "active" | "trial" | "past_due" | "blocked";

export interface ClientSummary {
  id: string;
  companyName: string;
  plan: ClientPlan;
  subscriptionStatus: SubscriptionStatus;
  greenhouseCount: number;
  cameraCount: number;
  registrationDate: string;
  lastActivity: string;
  monthlySpend: string;
  accountOwner: string;
}
