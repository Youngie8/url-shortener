import Login from '@/components/login';
import SignUp from '@/components/signup';
import { Tabs, TabsList, TabsTrigger, TabsContent  } from '@/components/ui/tabs';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Auth = () => {

  const [searchParams] = useSearchParams();
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-2xl font-bold'>{searchParams.get('createNew')? "Hold up, Let's Log you in first...": 'Login / Sign-up'}</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login/></TabsContent>
        <TabsContent value="signup"><SignUp/></TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth