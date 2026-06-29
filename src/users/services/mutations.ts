import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Schema } from "../types/schema";
import omit from 'lodash/omit'

export function useCreateUser() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['CreateUser'],
        mutationFn: async (data: Schema) => axios.post('http://localhost:8080/users', omit(data, 'variant')),
        
        onSuccess: async () => 
            await queryClient.invalidateQueries({queryKey: ['users']})
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['UpdateUser'],
        mutationFn: async ({data, id}:{data: Schema, id: number} ) => axios.patch(`http://localhost:8080/users/${id}`, omit(data, 'variant')),
        onSuccess: async (_data, variables) => {
            const userId = variables.id;

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userData', userId] }),
                queryClient.invalidateQueries({ queryKey: ['users']})
            ]);
        }
    })
}