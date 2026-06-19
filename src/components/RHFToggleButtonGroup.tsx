import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";

export function RHFToggleButtonGroup<T extends FieldValues>({name, label, buttonsData}: RHFComponentCommonProps<T>) {
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