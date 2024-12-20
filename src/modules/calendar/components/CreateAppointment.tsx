'use client'

import { Modal } from '@/modules/common'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../../common/common.css'
import dayjs from 'dayjs'
import { createAppointment } from '@/actions'
import { useRouter } from 'next/navigation'

interface FormInputs {
  title: string
  price: number
  date: string
  timeStart: string
  timeEnd: string
  earnestMoney?: number
  notes?: string
}

interface Props {
  isModalOpen: boolean
  setActive: (value: boolean) => void
  startDate?: string
}
export const CreateAppointment = ({ isModalOpen, setActive, startDate }: Props) => {
  const router = useRouter()
  const { register, handleSubmit, setValue, reset } = useForm<FormInputs>({
    defaultValues: { date: startDate ?? '' },
  })
  setValue('date', startDate ?? '')
  const [error, setError] = useState('')
  const t = useTranslations('calendarPage.createAppointmentForm')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')

    const { date, timeEnd, timeStart, ...rest } = data
    if (timeStart > timeEnd) {
      setError(t('errors.dateStart'))
    }
    const dateStart = dayjs(date)
      .set('hours', Number(timeStart.split(':')[0]))
      .set('minutes', Number(timeStart.split(':')[1]))
      .toISOString()
    const dateEnd = dayjs(date)
      .set('hours', Number(timeEnd.split(':')[0]))
      .set('minutes', Number(timeEnd.split(':')[1]))
      .toISOString()
    const payload = { dateStart, dateEnd, ...rest }

    const { ok, message } = await createAppointment(payload)
    if (!ok) {
      setError(message)
      return
    }
    reset()
    setActive(false)
    router.refresh()
  }

  return (
    <Modal active={isModalOpen} setActive={setActive} title={t('titleModal')}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 items-center w-full p-4'>
        <div className='w-full'>
          <label className='label' htmlFor='title'>
            {t('title')}
          </label>
          <input
            id='title'
            type='text'
            className='input'
            {...register('title', { required: true, minLength: 3 })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='price'>
            {t('price')}
          </label>
          <input
            id='price'
            type='number'
            className='input'
            {...register('price', { required: true, minLength: 1 })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='date'>
            {t('date')}
          </label>
          <input id='date' type='date' className='input' {...register('date', { required: true })} />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='timeStart'>
            {t('start')}
          </label>
          <input
            id='timeStart'
            type='time'
            className='input'
            {...register('timeStart', { required: true })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='timeEnd'>
            {t('end')}
          </label>
          <input id='timeEnd' type='time' className='input' {...register('timeEnd', { required: true })} />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='earnestMoney'>
            {t('earnestMoney')}
          </label>
          <input
            id='earnestMoney'
            type='number'
            className='input'
            {...register('earnestMoney', { required: false, minLength: 1 })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='notes'>
            {t('notes')}
          </label>
          <textarea id='notes' className='input' {...register('notes', { required: false })} />
        </div>
        <div className='w-full '>
          <p className='text-danger mb-2'>{error}</p>

          <button type='submit' className='button-primary'>
            {t('button')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
