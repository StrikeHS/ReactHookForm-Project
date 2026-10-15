import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, useFormContext, type FieldValues} from "react-hook-form";
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material'
import type { RHFComponentCommonProps } from "../types/RHFComponentProps";

export function RHFAutocomplete<T extends FieldValues>({name, buttonsData, label}: RHFComponentCommonProps<T>) {
    const {control} = useFormContext()
    return  (
    <Controller 
        control={control}
        name={name}
        render={({field: {value, onChange, ref}, fieldState: {error}}) => (
            <Autocomplete
                options={buttonsData || []}
                value={value.map((id: string) => buttonsData?.find((item) => item.id === id))}
                getOptionLabel={(option) => buttonsData?.find(item => option.id === item.id)?.label ?? ''}
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