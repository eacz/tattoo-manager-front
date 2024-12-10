'use client'

import { login, signup } from '@/actions'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../../common/common.css'

interface FormInputs {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>({})
  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')
    const { email, password, name, confirmPassword } = data

    if (password !== confirmPassword) {
      setError("Password doesn't matched")
      return
    }

    const { ok, message } = await signup({ email, name, password })
    if (!ok) {
      setError(message)
      return
    }
    await login(data.email, data.password)
    window.location.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-14  items-center '>
      <div className='w-full'>
        <label className='label' htmlFor='name'>
          Name
        </label>
        <input
          id='name'
          type='text'
          className='input'
          {...register('name', { required: true, minLength: 3 })}
        />
      </div>
      <div className='w-full'>
        <label className='label' htmlFor='email'>
          Email
        </label>
        <input
          id='email'
          type='email'
          className='input'
          {...register('email', { required: true, minLength: 8 })}
        />
      </div>
      <div className='w-full'>
        <label className='label' htmlFor='password'>
          Password
        </label>
        <input
          id='password'
          type='password'
          className='input'
          {...register('password', { required: true, minLength: 6 })}
        />
      </div>
      <div className='w-full'>
        <label className='label' htmlFor='confirmPassword'>
          Confirm password
        </label>
        <input
          id='confirmPassword'
          type='password'
          className='input'
          {...register('confirmPassword', { required: true, minLength: 6 })}
        />
      </div>
      <div className='w-full '>
        <p className='text-danger mb-2'>{error}</p>

        <button type='submit' className='button-primary'>
          Sign up
        </button>
      </div>
    </form>
  )
}