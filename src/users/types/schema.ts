import {z} from 'zod';
// import { patterns } from '../../constants';

export const schema = z.object({
    name: z.string().min(1, {error: 'Name is req'}),
    email: z.email().min(1, {error: "Email is req"}),
    // email: z.string().min(1, {error: "Email is req"})
    // .refine((email) => patterns.email.test(email), {error: 'Email is not valid'})
    states: z.array(z.string()).min(1, {error: "Need one or two states"}).max(2, {error: "Too many states"}),
    languages: z.array(z.string()).min(1,{error: "Need one or two languages"}).max(2, {error: "Too many languages"}),
    genders: z.literal(['Male', 'Female']),
    skills: z.array(z.string()).max(2, {error: "Too many skiils. Chill dude..."})
});

export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
    email: '',
    name: '',
    states: [],
    languages: [],
    genders: 'Male',
    skills: []
}