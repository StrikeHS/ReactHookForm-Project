import {Button, Container, List, ListItemButton, ListItemText, ListSubheader, Stack, Typography} from '@mui/material'
import { useFieldArray, useFormContext, useWatch, type SubmitHandler } from 'react-hook-form'
import { defaultValues, type Schema } from '../types/schema'
import { RHFAutocomplete } from '../../components/RHFAutocomplete'
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup'
import { RHFRadioButtonGroup } from '../../components/RHFRadioButtonGroup'
import { useGetData } from '../hooks/useGetData'
import { RHFCheckboxes } from '../../components/RHFCheckboxes'
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker'
import { RHFRangeSlider } from '../../components/RHFRangeSlider'
import { RHFSwitch } from '../../components/RHFSwitch'
import { RHFTextField } from '../../components/RHFTextField'

import { useEffect, useState } from 'react'
import { useGetUserDataById, useGetUsers } from '../services/queries'
import { useCreateUser, useUpdateUser } from '../services/mutations'


export function Users() {
    const buttonsData = useGetData();
    const usersData = useGetUsers();
    const {control, reset, handleSubmit, subscribe} = useFormContext<Schema>()

    const [id, setId] = useState<number>();

    const isTeacher = useWatch({control, name: "isTeacher"})
    // const id = useWatch({control, name: "id"}) <--- Bad practise --->
    const variant = useWatch({control, name: "variant"})
    
    const userData = useGetUserDataById({userId: id})

    const createUserMutation = useCreateUser()
    const updateUserMutation = useUpdateUser()
   
    const {append, fields, remove} = useFieldArray({
        control,
        name: 'students'
    })

    useEffect(() => {
        if(userData.data){ console.log(123)
            reset(userData.data)}
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.data])

    useEffect(() => {
        if(!isTeacher) remove();
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTeacher])

    useEffect(() => {
        const sub = subscribe({formState: {values: true}, callback: ({values}) => console.log(values)})
        return () => sub()
    }, [subscribe])

    const handleUserClick = (id: number) => {
        setId(id)
        // setValue('id', id) <--- Bad practise --->
    }

    const onSubmit:SubmitHandler<Schema> = (data) => {
        if (variant === 'create') {
            (createUserMutation.mutate(data, {onSuccess: (data) => setId(data.data?.id)}))
        } else {
            if(id) updateUserMutation.mutate({data, id})
        }
    }

    return (
       <Container maxWidth="md" component="form" onSubmit={handleSubmit(onSubmit, (errors)=> console.log(errors))}>
            <Stack sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component={'div'}>
                            Users
                        </ListSubheader>
                    }
                >
                    {usersData.data?.map((item) => (
                        <ListItemButton key={item.id} onClick={() => handleUserClick(item.id)} selected={id === item.id}>
                            <ListItemText key={item.id} primary={item.label}/>
                        </ListItemButton>
                    ))}
                </List> 
            
                <Stack sx={{gap: 2}}>
                    <RHFTextField<Schema> name={`name`} label={`Name`} />
                    <RHFTextField<Schema> name={`email`} label={`Email`} />
                    <RHFAutocomplete<Schema>
                        name="states"
                        label="States"
                        buttonsData={buttonsData.statesQuery.data}
                    />
                    <RHFToggleButtonGroup<Schema> 
                        name="languagesSpoken"
                        label="languages"
                        buttonsData={buttonsData.langQuery.data}
                    />
                    <RHFRadioButtonGroup<Schema>
                        name="gender"
                        label="Genders"
                        buttonsData={buttonsData.gendersQuery.data}
                    />
                    <RHFCheckboxes<Schema>
                        name="skills"
                        label="Skills"
                        buttonsData={buttonsData.skillsQuery.data}
                    />
                    <RHFDateTimePicker<Schema>
                        name="registrationDateAndTime"
                        label="Registration Date & Time"
                    />
                    <Typography>Salary</Typography>
                    <RHFRangeSlider<Schema>
                        name="salaryRange"
                    />
                    <RHFSwitch<Schema>
                        name="isTeacher"
                        label="Are you a teacher?"
                    />
                    {isTeacher && (
                    <>
                            <Button onClick={() => append({name: ''})}>Add new student</Button>
                    </>
                    )
                    }
                    {isTeacher && fields.map((item, index) => 
                    <div key={item.id}>
                        <RHFTextField<Schema> name={`students.${index}.name` as const} label={`Name`}  />
                        <Button onClick={() => remove(index)} color='error'>Delete</Button>
                    </div>
                        )
                    }
                    <Stack direction={'row'} sx={{justifyContent: 'space-between'}}>
                        <Button type='submit' variant='contained'>{variant === 'create' ? 'Create User' : 'Edit User'}</Button>
                        <Button onClick={() => reset(defaultValues)} variant='outlined'>Reset</Button>
                    </Stack>
                </Stack>
            </Stack>
       </Container>
    )
}