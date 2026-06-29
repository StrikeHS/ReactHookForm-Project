import { TextField } from "@mui/material";
import { Controller, type FieldValues } from "react-hook-form";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";

export function RHFTextField<T extends FieldValues>({name, label}: RHFComponentCommonProps<T>) {
    return (
       <Controller 
            name={name}
            render={({field, fieldState: {error}}) => (
                <TextField {...field} label={label} error={!!error} helperText={error?.message}/>
            )}
       
       /> 
    )
}