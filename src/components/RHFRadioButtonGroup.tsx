import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";

export function RHFRadioButtonGroup<T extends FieldValues>({name, label, buttonsData}: RHFComponentCommonProps<T>) {
    const {control} = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, ...fields}, fieldState: {error}}) => 
                <FormControl error={!!error}>
                    <FormLabel id="genders-group">{label}</FormLabel>
                    <RadioGroup {...fields}
                        name={name}
                        aria-label={label}
                        value={value}
                        onChange={(_, newValue) => {
                            onChange(newValue)
                        }}
                    >
                        {buttonsData?.map((button) => <FormControlLabel key={button.id} value={button.label} control={<Radio/>} label={button.label}/>)}
                    </RadioGroup>
                </FormControl>
            }
        >
            
        </Controller>
    )
}