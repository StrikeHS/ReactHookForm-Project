import { Controller, useFormContext, type FieldValues} from "react-hook-form";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'

export function RHFDateTimePicker<T extends FieldValues>({name, label}: RHFComponentCommonProps<T>) {
    const {control} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => 
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker 
                        label={label}
                        {...field}
                    />
                </LocalizationProvider>               
            }
        />
    )
}
