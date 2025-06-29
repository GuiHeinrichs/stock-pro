import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR(
        "/permissoes/api/get-users",
        fetcher
    );
    return { users: data, error, isLoadingUsers: isLoading, mutate };
};