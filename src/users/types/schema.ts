import {z} from 'zod';
// import { patterns } from '../../constants';

export const schema = z.intersection(
    z.object({
        name: z.string().min(1, {error: 'Name is req'}),
        email: z.email().min(1, {error: "Email is req"}),
        states: z.array(z.string()).min(1, {error: "Need one or two states"}).max(2, {error: "Too many states"}),
        languagesSpoken: z.array(z.string()).min(1,{error: "Need one or two languages"}).max(2, {error: "Too many languages"}),
        gender: z.literal(['1', '2']),
        skills: z.array(z.string()).max(2, {error: "Too many skiils. Chill dude..."}),
        registrationDateAndTime: z.date(),
        salaryRange: z.array(z.number()).min(2).max(2),
        formerEmploymentPeriod: z.array(z.date()).min(2).max(2).optional()
    }),
    z.discriminatedUnion('variant', [
        z.object({variant: z.literal('create')}),
        z.object({variant: z.literal('edit'), id: z.number().min(1)})
    ])
).and(z.union([
    z.object({isTeacher: z.literal(false)}),
    z.object({
        isTeacher: z.literal(true),
        students: z.array(
            z.object({
                name: z.string().min(1)
        }))
    })
]));

export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
    email: '',
    name: '',
    states: [],
    languagesSpoken: [],
    gender: '1',
    skills: [],
    registrationDateAndTime: new Date(),
    salaryRange: [1, 30],
    isTeacher: false,
    variant: 'create'
}