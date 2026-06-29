import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import type { CommonDataType } from '../../types/RHFComponentProps';
import type { ApiGet } from '../types/apiTypes';

export function useStates() {
    return useQuery({
        queryKey: ['states'],
        queryFn: () => axios.get<CommonDataType[]>('http://localhost:8080/states').then((res) => res.data)
    })
}

export function useLanguages() {
    return useQuery({
        queryKey: ['languages'],
        queryFn: () => axios.get<CommonDataType[]>('http://localhost:8080/languages').then((res) => res.data)
    })
}

export function useGenders() {
    return useQuery({
        queryKey: ['genders'],
        queryFn: () => axios.get<CommonDataType[]>('http://localhost:8080/genders').then((res) => res.data)
    })
}

export function useSkills() {
    return useQuery({
        queryKey: ['skills'],
        queryFn: () => axios.get<CommonDataType[]>('http://localhost:8080/skills').then((res) => res.data)
    })
}

export function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: ():Promise<CommonDataType[]> => axios.get<ApiGet[]>('http://localhost:8080/users').then((res) => res.data.map((user) => ({
            id: user.id,
            label: user.name
        } satisfies CommonDataType)))
    })
}

export function useGetUserDataById({userId}: {userId: number | undefined}) {
    return useQuery({
        queryKey: ['userData', userId],
        queryFn: () => axios.get<ApiGet>(`http://localhost:8080/users/${userId}`).then((res) => {return {
            variant: 'edit',
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            gender: res.data.gender,
            languagesSpoken: res.data.languagesSpoken,
            registrationDateAndTime: new Date(res.data.registrationDateAndTime),
            salaryRange: [res.data.salaryRange[0], res.data.salaryRange[1]],
            skills: res.data.skills,
            states: res.data.states,
            students: res.data.students,
            isTeacher: res.data.isTeacher
        } satisfies ApiGet}),
        enabled: !!userId
    })
}