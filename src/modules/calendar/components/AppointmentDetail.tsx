'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { Modal } from '@/modules/common'
import '../../common/common.css'
import { FullAppointment } from '../interfaces/appointment'
import { deleteAppointment, updateAppointment } from '@/actions'

dayjs.extend(utc)
dayjs.extend(timezone)

interface FormInputs {
  id: number
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
  appointment: FullAppointment
}

export const AppointmentDetails = ({ isModalOpen, setActive, appointment }: Props) => {
  const router = useRouter()
  const [editable, setEditable] = useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      ...appointment,
      timeStart: dayjs(appointment.dateStart).format('HH:MM'),
      timeEnd: dayjs(appointment.dateEnd).format('HH:MM'),
      date: dayjs(appointment.dateStart).format('YYYY-MM-DD').toString(),
    },
  })

  const [error, setError] = useState('')
  const t = useTranslations('calendarPage.AppointmentDetails')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError('')

    try {
      const { date, timeStart, timeEnd, ...rest } = data
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
      const payload = { ...rest, dateStart, dateEnd }

      const { ok, message } = await updateAppointment(data.id, payload)
      if (!ok) {
        setError(message)
      }
      router.refresh()
      setActive(false)
    } catch (error: any) {
      console.log(error)
      setError(error)
    }
  }

  const handleButtonClick = () => {
    if (!editable) {
      setEditable(true)
    }
  }

  const handleDelete = async () => {
    await deleteAppointment(appointment.id)
    setActive(false)
    router.refresh()
  }

  return (
    <>
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
              {...register('timeStart', { required: true })}
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
              {...register('timeEnd', { required: true })}
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
          <div className='w-full flex flex-col gap-2 '>
            <p className='text-danger mb-2'>{error}</p>

            <button
              disabled={!isDirty && editable}
              type={editable ? 'submit' : 'button'}
              onClick={handleButtonClick}
              className='button-primary'>
              {editable ? t('buttonUpdate') : t('buttonEdit')}
            </button>
            <button type='button' onClick={() => setShowConfirmDeleteModal(true)} className='button-delete'>
              {t('delete.buttonDelete')}
            </button>
          </div>
        </form>
      </Modal>
      <Modal active={showConfirmDeleteModal} setActive={setShowConfirmDeleteModal} title={t('delete.title')}>
        <div className='flex justify-center items-center w-full'>
          <button className='button-delete max-w-48 mt-4' onClick={handleDelete}> {t('delete.buttonDelete')}</button>
        </div>
      </Modal>
    </>
  )
}
