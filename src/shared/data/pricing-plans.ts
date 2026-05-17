// src/shared/data/pricing-plans.ts

import pricingPlansJson from "./pricing-plans.json";

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonLabel: string;
};

export const pricingPlans = pricingPlansJson as PricingPlan[];

export function getPricingPlanById(planId: string | null): PricingPlan {
  return (
    pricingPlans.find((plan) => plan.id === planId) ??
    pricingPlans.find((plan) => plan.id === "teacher") ??
    pricingPlans[0]
  );
}