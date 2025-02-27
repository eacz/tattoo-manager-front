'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { Divider, Modal } from '@/modules/common'
import { WorkDayPicker, MultipleHourPicker, workdaysType, Schedule } from '../'
import { useRouter } from 'next/navigation'
import { updateSchedule } from '@/actions'

interface FormInputs {
  schedulesHours: string[]
  workdays: workdaysType[]
}

interface Props {
  schedule: Schedule
}

export const UpdateSchedule = ({ schedule }: Props) => {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations('schedulePage')
  const { handleSubmit, setValue, formState } = useForm<FormInputs>({
    defaultValues: { schedulesHours: schedule.schedulesHours, workdays: schedule.workdays },
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

    await updateSchedule(data)

    setIsModalOpen(false)

    router.refresh()
  }

  return (
    <div>
      <button className='button-primary max-w-[150px]' onClick={() => setIsModalOpen(true)}>
        {t('editSchedule.edit')}
      </button>
      <Modal active={isModalOpen} setActive={setIsModalOpen} title={t('createSchedule.createModalTitle')}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 items-center w-full p-4'>
          <div className='w-full'>
            <WorkDayPicker
              initialValue={schedule.workdays}
              setValue={(value: workdaysType[]) => setValue('workdays', value, { shouldDirty: true })}
            />
            <Divider />

            <MultipleHourPicker
              initialValue={schedule.schedulesHours}
              setValue={(value: string[]) => setValue('schedulesHours', value, { shouldDirty: true })}
            />
            <Divider />

            <p className='text-danger mb-2'>{error}</p>

            <button type='submit' className='button-primary' disabled={!formState.isDirty}>
              {t('editSchedule.update')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
