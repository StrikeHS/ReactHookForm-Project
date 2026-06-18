import { Button, ButtonGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { Language } from "../types/languages";
import { FormHelperText } from '@mui/material';

type RHFGroupButtonsProps = {
    name: string;
    label: string;
    buttonsData?: Language[]
}

export function RHFGroupButtons({name, label, buttonsData}: RHFGroupButtonsProps) {
    const {control} = useFormContext();

    return(
        <Controller 
            control={control}
            name={name}
            render={({field: {value, onChange, ref}, fieldState: {error}}) => (
                <>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {buttonsData?.map((button) => <Button key={button.id}>{button.label}</Button>)}
                    </ButtonGroup>
                    {!!error && (<FormHelperText />)}
                </>
                
            )}
        />
    )
}