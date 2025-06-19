import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useStockMovements = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/estoque/api/get",
    fetcher
  );
  return { stockMovements: data, error, isLoadingMovements: isLoading, mutate };
};
