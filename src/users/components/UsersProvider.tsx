import { FormProvider, useForm } from "react-hook-form";
import { Users } from "./User";
import { defaultValues, schema, type Schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import {DevTool} from "@hookform/devtools"

export function UsersProvider() {
    const methods = useForm<Schema>({mode: 'all', resolver: zodResolver(schema), defaultValues: defaultValues})
    return (
        <FormProvider {...methods}>
            <Users />
            {/* <DevTool control={methods.control}/> */}
        </FormProvider>
    )
}