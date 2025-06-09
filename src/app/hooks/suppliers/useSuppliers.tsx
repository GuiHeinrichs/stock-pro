import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export const useSuppliers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "fornecedores/api/get",
    fetcher
  );
  return { suppliers: data, error, isLoadingSuppliers: isLoading, mutate };
};
