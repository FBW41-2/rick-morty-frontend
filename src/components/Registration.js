import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default () => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm()
    const submit = (data) => {
        // send data to backend
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <input {...register("user", {required: true})} placeholder="Username" />
            </div>
            {errors.user && <div>Username is required</div>}
            <div>
                <input {...register("email", {required: true, pattern: /^\S+@\S+$/i})} placeholder="Email" />
            </div>
            {errors.email && <div>Email is required</div>}
            <div>
                <input {...register("password", {required: true, minLength: 8})} type="password" placeholder="Password" />
            </div>
            {errors.password && <div>Password is required</div>}
            <div>
                <input {...register("password_repeat", {validate: (value) => {
                        return value === watch('password'); // value is from password_repeat and watch will return value from password
                    }})} placeholder="repeat Password" type="password" />
            </div>
            {errors.password_repeat && <div>Password is not the same</div>}
            <input type="submit" />
        </form>
    )
}
