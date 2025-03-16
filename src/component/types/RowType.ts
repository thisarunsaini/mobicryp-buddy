export interface RowType {
  period: number;
  returnDate: string;
  total: number;
  carriedFromDateMatches?: number; // For display or debugging if needed
  returnAmount: number; // newly added
  leftoverUsed?: number; // newly added
  growth?: number;       // newly added
  matched?: number;      // newly added
}