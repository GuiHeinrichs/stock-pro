import useSWR from "swr";
import { DashboardData } from "@/types/Dashboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDashboardData = () => {
  const { data, error, isLoading } = useSWR<DashboardData>(
    "/dashboard/api/data",
    fetcher
  );

  return { data, error, isLoading };
};
