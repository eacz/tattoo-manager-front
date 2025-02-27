'use client'

import { Modal } from '@/modules/common'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../../common/common.css'
import dayjs from 'dayjs'
import { createAppointment } from '@/actions'
import { useRouter } from 'next/navigation'
import { Schedule } from '@/modules/schedules'

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
  schedule?: Schedule
}
export const CreateAppointment = ({ isModalOpen, setActive, startDate, schedule }: Props) => {
  const router = useRouter()
  const { register, handleSubmit, setValue, reset, getValues } = useForm<FormInputs>({
    defaultValues: { date: startDate ?? '' },
  })

  const [error, setError] = useState('')
  const t = useTranslations('calendarPage.createAppointmentForm')

  const updateTimeStart = (hour: string) => {
    setValue('timeStart', hour)
    setValue('timeEnd', `${Number(hour.split(':')[0]) + 3}:${hour.split(':')[1]}`)
  }

  setValue('date', startDate ?? '')
  if (schedule?.schedulesHours.length) {
    updateTimeStart(schedule.schedulesHours[0])
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')
    console.log(data)

    if (data.earnestMoney && Number(data.earnestMoney) > Number(data.price)) {
      setError(t('errors.earnestMoney'))
      return
    }

    const { date, timeEnd, timeStart, ...rest } = data
    if (timeStart >= timeEnd) {
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
          {schedule && (
            <>
              <p className='my-1'>{t('schedule-available')}</p>
              <select className='select' onChange={({ target }) => updateTimeStart(target.value)}>
                {schedule?.schedulesHours.map((schedule) => (
                  <option value={schedule} key={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            </>
          )}
          {schedule && <p className='my-1'>{t('custom-hour')}</p>}

          <input
            id='timeStart'
            type='time'
            className='input'
            {...register('timeStart', { required: false, minLength: 1 })}
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
