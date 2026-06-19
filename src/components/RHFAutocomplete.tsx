import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { Option } from "../types/options";
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material'


type RHFAutocompiteProps<T extends FieldValues> = {
    name: Path<T>;
    options?: Option[];
    label: string;
}

export function RHFAutocomplete<T extends FieldValues>({name, options, label}:RHFAutocompiteProps<T>) {
    const {control} = useFormContext()
    return  (
    <Controller 
        control={control}
        name={name}
        render={({field: {value, onChange, ref}, fieldState: {error}}) => (
            <Autocomplete
                options={options || []}
                value={value.map((id: string) => options?.find((item) => item.id === id))}
                getOptionLabel={(option) => options?.find(item => option.id === item.id)?.label ?? ''}
                onChange={(_, newValue) => {
                    onChange(newValue.map(item => item.id))
                }}
                multiple
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        fullWidth
                        inputRef={ref}
                        error={!!error}
                        helperText={error?.message}
                        label={label}
                    />
                )}
                renderOption={(props, option, { selected }) => (
                    <Box {...props} component={'li'} key={props.key} >
                        <Checkbox
                            icon={<CheckBoxOutlineBlank />}
                            checkedIcon={<CheckBox/>} 
                            checked={selected}
                        />
                        {option.label}
                    </Box>
                )}
            />
        )}
    />
)
}