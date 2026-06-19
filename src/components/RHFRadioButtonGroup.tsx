import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { Gender } from "../types/gender";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type RHFRadioButtonGroupProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    buttonsData?: Gender[]
}

export function RHFRadioButtonGroup<T extends FieldValues>({name, label, buttonsData}: RHFRadioButtonGroupProps<T>) {
    const {control} = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, ...fields}}) => 
                <FormControl>
                    <FormLabel id="genders-group">Genders</FormLabel>
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