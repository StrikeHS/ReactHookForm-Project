import type { FieldValues, Path } from "react-hook-form";

export type CommonDataType = {
    id: string; 
    label: string;
}

export type RHFComponentCommonProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    buttonsData?: CommonDataType[]
}