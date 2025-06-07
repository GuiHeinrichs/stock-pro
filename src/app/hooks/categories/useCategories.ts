import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/categorias/api/get",
    fetcher
  );
  return { categories: data, error, isLoading, mutate };
};
