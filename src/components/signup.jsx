import React, { useEffect, useState } from 'react'
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
import useFetch from '@/hooks/use-fetch'
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'

const Signup = () => {
    
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null
    })
    
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files? files[0]: value,
        }));
    };
    const {data, loading, error, fn: fnSignup} = useFetch(signup, formData)
    const { fetchUser } = UrlState();

    useEffect(() => {
        if(error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`);
            fetchUser();

        }
    }, [error, loading])

    const handeSignup = async() => {
        setErrors([])
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Name is required')
                    .min(3, 'Minimum of 3 characters'),

                email: Yup.string()
                    .email('Invalid Email')
                    .required('Email is Required'),

                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is Required'),
                
                profile_pic: Yup.mixed().required('Upload a profile picture please😔')
            })
            await schema.validate(formData, {abortEarly: false})
            await fnSignup()
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
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create a new Account</CardDescription>
            {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent className="space-y-1">
            <div className="space-y-2">
                <Input name="name"
                type="name"
                placeholder="Enter name"
                onChange={handleInputChange}/>
                {errors.name && <Error message={errors.name} />}
            </div>
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
            <div className="space-y-1">
                <Input  name="profile_pic"
                type="file"
                onChange={handleInputChange}
                accept="image/*"/>
                {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" variant="secondary" onClick={handeSignup}>
            {loading?<PulseLoader size={10} color='#36d7b7' />: 'Create Account'}    
            
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Signup