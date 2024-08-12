import Login from '@/components/login';
import SignUp from '@/components/signup';
import { Tabs, TabsList, TabsTrigger, TabsContent  } from '@/components/ui/tabs';
import { UrlState } from '@/context';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Auth = () => {

  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const { isAuthenticated, loading} = UrlState();

  useEffect(() => {
    if(isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`);
    }
  }, [isAuthenticated, loading])

  return (
    <div className='mt-16 flex flex-col items-center gap-10'>
      <h1 className='text-2xl font-bold'>{longLink ? "Hold up, Let's Log you in first...": 'Login / Sign-up'}</h1>
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