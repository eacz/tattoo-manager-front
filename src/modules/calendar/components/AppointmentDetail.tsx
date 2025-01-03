'use client'

import { Modal } from '@/modules/common'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../../common/common.css'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { FullAppointment } from '../interfaces/appointment'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface FormInputs {
  title: string
  price: number
  date?: string
  dateStart: string
  dateEnd: string
  earnestMoney?: number
  notes?: string
}

interface Props {
  isModalOpen: boolean
  setActive: (value: boolean) => void
  appointment: FullAppointment
}

export const AppointmentDetails = ({ isModalOpen, setActive, appointment }: Props) => {
  console.log(appointment)

  const router = useRouter()
  const [editable, setEditable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      ...appointment,
      dateStart: dayjs(appointment.dateStart).format('HH:MM'),
      dateEnd: dayjs(appointment.dateEnd).format('HH:MM'),
      date: dayjs(appointment.dateStart).format('YYYY-MM-DD').toString(),
    },
  })

  const [error, setError] = useState('')
  const t = useTranslations('calendarPage.AppointmentDetails')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')
    console.log(data)
  }

  const handleButtonClick = () => {
    if (!editable) {
      setEditable(true)
    } else {
    }
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
            disabled={!editable}
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
            disabled={!editable}
            {...register('price', { required: true, minLength: 1 })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='date'>
            {t('date')}
          </label>
          <input
            id='date'
            type='date'
            className='input'
            disabled={!editable}
            {...register('date', { required: true })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='timeStart'>
            {t('start')}
          </label>
          <input
            id='timeStart'
            type='time'
            className='input'
            disabled={!editable}
            {...register('dateStart', { required: true })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='timeEnd'>
            {t('end')}
          </label>
          <input
            id='timeEnd'
            type='time'
            className='input'
            disabled={!editable}
            {...register('dateEnd', { required: true })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='earnestMoney'>
            {t('earnestMoney')}
          </label>
          <input
            id='earnestMoney'
            type='number'
            className='input'
            disabled={!editable}
            {...register('earnestMoney', { required: false, minLength: 1 })}
          />
        </div>
        <div className='w-full'>
          <label className='label' htmlFor='notes'>
            {t('notes')}
          </label>
          <textarea
            id='notes'
            className='input'
            disabled={!editable}
            {...register('notes', { required: false })}
          />
        </div>
        <div className='w-full '>
          <p className='text-danger mb-2'>{error}</p>

          <button disabled={!isDirty && editable} type='button' onClick={handleButtonClick} className='button-primary'>
            {editable ? t('buttonUpdate') : t('buttonEdit')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
