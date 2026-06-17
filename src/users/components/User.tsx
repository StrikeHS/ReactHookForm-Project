import {useForm} from 'react-hook-form'

export function Users() {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<{email: string}>(
        {
            mode: 'all'
        }
    )
    return (
        <form onSubmit={handleSubmit(()=> console.log('valid, submit'), () => console.log('invalid'))}>
            <input {...register('email', {
                required: { value: true, message: "Email req"},
                maxLength: { value: 10, message: 'Too many characters'}
                })}
            placeholder='Email'/>
            <p>{errors.email?.message}</p>
        </form>
    )
}