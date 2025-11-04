import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// API Calls
import {
    registerUser,
    login,
} from "./api";
import { useFetchUser } from "./queries";

// Register user mutation
export const useRegisterMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        },
        onError: (error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Login mutation
export const useLoginMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (response) => {
            // Save JWT on localStorage
            localStorage.setItem("AUTH_TOKEN", response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })

            // Redirect to admin dashboard
            redirect("/admin/dashboard")
        },
        onError: (error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}