import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader, PulseLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup'
  
const Login = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handeLogin = async() => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Invalid Email')
                    .required('Email is Required'),

                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is Required')
            })
            await schema.validate(formData, {abortEarly: false})
        }
        catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    }

  return (
    <Card>
        <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account if you already have one</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
            <div className="space-y-2">
                <Input name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleInputChange}/>
                {errors.email && <Error message={errors.email} />}
            </div>
            <div className="space-y-1">
                <Input  name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="Enter password"/>
                {errors.password && <Error message={errors.password} />}
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" variant="secondary" onClick={handeLogin}>
            {true?<PulseLoader size={10} color='#36d7b7' />: 'login'}    
            
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Login