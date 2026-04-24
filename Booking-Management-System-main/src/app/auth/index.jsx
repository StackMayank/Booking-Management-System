import React from 'react'
import AuthLayout from '@/components/layouts/auth.layout'
import SignIn from './signin'
import SignUp from './signup'


const SignInPage = () => {
  return (
    <AuthLayout title="Welcome Back" 
    description="Please enter your details to sign in">
        <SignIn />
    </AuthLayout>
  )
}

const SignUpPage = () => {
  return (
    <AuthLayout title="Create Account 
    " description="Please enter your details to sign up">
     <SignUp />
    </AuthLayout>
  )
}


export {SignInPage, SignUpPage}