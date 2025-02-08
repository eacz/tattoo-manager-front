'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { Divider, Modal } from '@/modules/common'
import { WorkDayPicker, MultipleHourPicker, workdaysType } from '../'
import { useRouter } from 'next/navigation'
import { createSchedule } from '@/actions'

interface FormInputs {
  schedulesHours: string[]
  workdays: workdaysType[]
}

export const CreateSchedule = () => {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations('schedulePage')
  const { handleSubmit, setValue, reset, getValues } = useForm<FormInputs>({
    defaultValues: { schedulesHours: [], workdays: [] },
  })
  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!data.workdays.length) {
      return setError(t('createSchedule.errors.noWorkdaysError'))
    }

    if (!data.schedulesHours.length) {
      return setError(t('createSchedule.errors.noScheduleHoursError'))
    }

    setError('')
    
    setIsModalOpen(false)
    await createSchedule(data)

    router.refresh()
  }

  return (
    <div>
      <p>
        {t('createSchedule.noScheduleText')}{' '}
        <span onClick={() => setIsModalOpen(true)} className='cursor-pointer text-primary'>
          {t('createSchedule.noScheduleTextLink')}
        </span>
      </p>
      <Modal active={isModalOpen} setActive={setIsModalOpen} title={t('createSchedule.createModalTitle')}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 items-center w-full p-4'>
          <div className='w-full'>
            <WorkDayPicker setValue={(value: workdaysType[]) => setValue('workdays', value)} />
            <Divider />

            <MultipleHourPicker setValue={(value: string[]) => setValue('schedulesHours', value)} />
            <Divider />

            <p className='text-danger mb-2'>{error}</p>

            <button type='submit' className='button-primary'>
              {t('createSchedule.buttonCreate')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
