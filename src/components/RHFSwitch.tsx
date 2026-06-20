import { Controller, useFormContext, type FieldValues} from "react-hook-form";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";
import { FormControl, FormControlLabel, Switch } from "@mui/material";

export function RHFSwitch<T extends FieldValues>({name, label}: RHFComponentCommonProps<T>) {
    const {control} = useFormContext();
    
    return (
        <Controller 
            control={control}
            name={name}
            render={({field: {value, onChange, ...fields}}) => (
                <FormControl {...fields}>
                    <FormControlLabel control={<Switch value={value} onChange={(_, newValue) => onChange(newValue)}/>} label={label}/>
                </FormControl>
            )}
        />
    )
}