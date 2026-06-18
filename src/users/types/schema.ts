import {z} from 'zod';
// import { patterns } from '../../constants';

export const schema = z.object({
    name: z.string().min(1, {error: 'Name is req'}),
    email: z.email().min(1, {error: "Email is req"}),
    // email: z.string().min(1, {error: "Email is req"})
    // .refine((email) => patterns.email.test(email), {error: 'Email is not valid'})
    states: z.array(z.string()).min(1, {error: "Need one or two states"}).max(2, {error: "Too many states"}),
    languages: z.string().nonempty({error: "Need to choose lang"})
});

export type Schema = z.infer<typeof schema>

export const defaultValues: Schema = {
    email: '',
    name: '',
    states: [],
    languages: ''
}