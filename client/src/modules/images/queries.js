import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllImages } from "./api"

export const useFetchAllImages = () => {
    return useQuery({
        queryKey: ["images"],
        queryFn: getAllImages,
        retry: 1,
        refetchOnWindowFocus: false
    });
}