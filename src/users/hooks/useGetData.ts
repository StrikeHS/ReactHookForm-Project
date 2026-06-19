import { useGenders, useLanguages, useStates } from "../services/queries";

export function useGetData() {
    const statesQuery = useStates();
    const langQuery = useLanguages();
    const gendersQuery = useGenders(); 
    return {
        statesQuery,
        langQuery,
        gendersQuery
    }
}