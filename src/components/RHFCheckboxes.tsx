import { Controller, useFormContext, type FieldValues} from "react-hook-form";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";

export function RHFCheckboxes<T extends FieldValues>({name, label, buttonsData}: RHFComponentCommonProps<T>) {
    const {control} = useFormContext() 

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {value, onChange}, fieldState: {error}}) => (
                <FormControl error={!!error}>
                    <FormLabel component="legend">{label}</FormLabel>
                    <FormGroup>
                        {
                            buttonsData?.map((button) =>
                                <FormControlLabel 
                                    key={button.id}
                                    label={button.label}
                                    control={
                                        <Checkbox
                                            checked={value.includes(button.id)}
                                            onChange={(_, newValue) => {
                                                if(newValue && !value.includes(button.id)) {
                                                    onChange([...value, button.id])
                                                } else if(!newValue && value.includes(button.id)) {
                                                    onChange(value.filter((buttonId: string) => buttonId !== button.id))
                                                }
                                            }}
                                            name={button.label}
                                        />
                                    }
                                />
                            )
                        }
                    </FormGroup>
                </FormControl>
            )}
        >

        </Controller>
    )
}
