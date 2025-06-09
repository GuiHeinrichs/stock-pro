import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/produtos/api/get",
    fetcher
  );
  return { data, error, isLoading, mutate };
};
