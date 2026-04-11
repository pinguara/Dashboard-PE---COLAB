export interface Goal {
  id: string;
  meta: string;
  formula: string;
  axis?: string;
  indicators: {
    [year: number]: string | number;
  };
}

export interface Category {
  id: string;
  title: string;
  description: string;
  initiatives: string[];
  expectedResults: string[];
  goals: Goal[];
}

export interface MonthlyResult {
  goalId: string;
  year: number;
  month: number;
  value: number;
}
