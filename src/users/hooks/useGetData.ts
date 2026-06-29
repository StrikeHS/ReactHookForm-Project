import { useGenders, useLanguages, useSkills, useStates } from "../services/queries";

export function useGetData() {
    const statesQuery = useStates();
    const langQuery = useLanguages();
    const gendersQuery = useGenders();
    const  skillsQuery = useSkills();

    return {
        statesQuery,
        langQuery,
        gendersQuery,
        skillsQuery
    }
}