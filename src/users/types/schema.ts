import {z} from 'zod';
import { patterns } from '../../constants';
export const schema = z.object({
    name: z.string().min(1, {error: 'req'}),
    email: z.string().min(1, {error: "Email is req"})
    .refine((email) => patterns.email.test(email), {error: 'Email is not valid'})
})