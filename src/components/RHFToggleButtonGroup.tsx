import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { Language } from "../types/languages";

type RHFToggleButtonGroupProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    buttonsData?: Language[]
}

export function RHFToggleButtonGroup<T extends FieldValues>({name, label, buttonsData}: RHFToggleButtonGroupProps<T>) {
    const {control} = useFormContext();

    return(
        <Controller 
            control={control}
            name={name}
            render={({field: {value, onChange, ref}}) => (
                <>
                    <ToggleButtonGroup
                        aria-label={label}
                        value={value}
                        onChange={(_, newValue) => {
                            if(newValue.length) onChange(newValue)
                        }}
                        ref={ref}
                    >
                        {buttonsData?.map((button) => <ToggleButton key={button.id} value={button.label.toLowerCase()}>{button.label}</ToggleButton>)}
                    </ToggleButtonGroup>
                </>
                
            )}
        />
    )
}