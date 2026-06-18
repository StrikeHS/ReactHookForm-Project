import {Stack, TextField} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { Schema } from '../types/schema'
import { RHFAutocompite } from '../../components/RHFAutocompite'
import {useLanguages,  useStates } from '../services/queries'
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup'

export function Users() {
    const statesQuery = useStates();
    const langQuery = useLanguages();
    const {register, formState: {errors}} = useFormContext<Schema>()

    return (
        <Stack sx={{gap: 2}}>
            <TextField {...register('name')}
                label={'Name'}
                error={!!errors.name} 
                helperText={errors.name?.message}
            />
            <TextField {...register('email')}
                label={'Email'}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <RHFAutocompite<Schema>
                name="states"
                label={"states"}
                options={statesQuery.data}
            />
            <RHFToggleButtonGroup<Schema> 
                name="languages"
                label={"languages"}
                buttonsData={langQuery.data}
            />
        </Stack>
    )
}