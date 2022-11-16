
export interface IAPIResponse {
    success: boolean,
    query: { from: string, to: string, amount: number }
    date: string,
    result: number
  }

 export interface IRequiredProps {
    amount: number;
    from: string;
    to: string;
    date: string;
}