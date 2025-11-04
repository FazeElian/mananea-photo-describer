import { useQuery } from "@tanstack/react-query"

// API Calls
import { getUser } from "./api"

export const useGetAuthenticatedUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    });
}

export const useFetchUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    });
}