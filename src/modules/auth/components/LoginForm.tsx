'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { login } from '@/actions'
import '../../common/common.css'

interface FormInputs {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>({})
  const [error, setError] = useState('')
  const t = useTranslations('loginPage');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data

    const { ok, message } = await login(email.toLowerCase(), password)
    if (!ok) {
      setError(message)
      return
    }
    window.location.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-14 items-center '>
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
        <label className='label'  htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          className='input'
          {...register('password', { required: true, minLength: 6 })}
        />
      </div>
      <div className='w-full '>
        <p className='text-danger mb-2'>{error}</p>

        <button type='submit' className='button-primary'>
          {t('button')}
        </button>
      </div>
    </form>
  )
}
