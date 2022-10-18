import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import authApi from '../api/authApi';
import { Input } from '../components/Input';

const SignupSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = async (data) => {
        const response = await authApi.login(data);
        console.log({ response });
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="User Name" name="username" register={register} className="form-control" errors={errors.username} />
                <br />
                <Input label="Password" name="password" register={register} className="form-control" errors={errors.password} />
                <button type="submit">Gửi</button>
            </form>
        </>
    );
}

export default Login