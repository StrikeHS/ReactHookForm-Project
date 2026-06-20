import {Stack, TextField} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { Schema } from '../types/schema'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup'
import { RHFRadioButtonGroup } from '../../components/RHFRadioButtonGroup'
import { useGetData } from '../hooks/useGetData'
import { RHFCheckboxes } from '../../components/RHFCheckboxes'
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker'
import { RHFRangeSlider } from '../../components/RHFRangeSlider'
import { RHFSwitch } from '../../components/RHFSwitch'

export function Users() {
    const buttonsData = useGetData()
    const {register, formState: {errors}} = useFormContext<Schema>()

    return (
        <Stack sx={{gap: 2}}>
            <TextField {...register('name')}
                label="Name"
                error={!!errors.name} 
                helperText={errors.name?.message}
            />
            <TextField {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <RHFAutocomplete<Schema>
                name="states"
                label="States"
                buttonsData={buttonsData.statesQuery.data}
            />
            <RHFToggleButtonGroup<Schema> 
                name="languages"
                label="languages"
                buttonsData={buttonsData.langQuery.data}
            />
            <RHFRadioButtonGroup<Schema>
                name="genders"
                label="Genders"
                buttonsData={buttonsData.gendersQuery.data}
            />
            <RHFCheckboxes<Schema>
                name="skills"
                label="Skills"
                buttonsData={buttonsData.skillsQuery.data}
            />
            <RHFDateTimePicker<Schema>
                name="registrationDateAndTime"
                label="Registration Date & Time"
            />
            <RHFRangeSlider<Schema>
                name="salary"
            />
            <RHFSwitch<Schema>
                name="isTeacher"
                label="Are you a teacher?"
            />
        </Stack>
    )
}