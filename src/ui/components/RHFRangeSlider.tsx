import { Controller, useFormContext, type FieldValues} from "react-hook-form";
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";
import { Slider } from "@mui/material";

export function RHFRangeSlider<T extends FieldValues>({name}: Pick<RHFComponentCommonProps<T>, 'name'>) {
    const {control} = useFormContext()
    return (
        <Controller 
            name={name}
            control={control}
            render={({field}) => (
                <Slider
                    {...field}
                    value={Array.isArray(field.value) ? field.value : []}
                />
            )}
        />
    )
}