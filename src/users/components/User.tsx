import {Stack, TextField} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { Schema } from '../types/schema'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import {useGenders, useLanguages,  useStates } from '../services/queries'
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup'
import { RHFRadioButtonGroup } from '../../components/RHFRadioButtonGroup'

export function Users() {
    const statesQuery = useStates();
    const langQuery = useLanguages();
    const gendersQuery = useGenders();
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
            <RHFAutocomplete<Schema>
                name="states"
                label={"states"}
                options={statesQuery.data}
            />
            <RHFToggleButtonGroup<Schema> 
                name="languages"
                label={"languages"}
                buttonsData={langQuery.data}
            />
            <RHFRadioButtonGroup<Schema>
                name="genders"
                label={"genders"}
                buttonsData={gendersQuery.data}
            />
        </Stack>
    )
}