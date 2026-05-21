export interface BillingMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  invoices: number;
}
