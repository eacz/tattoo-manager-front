'use client'

import '../schedule.css'

import { useEffect, useState } from 'react'
import { workdays, workdaysType } from '../interfaces/schedule'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface Props {
  setValue: (value: workdaysType[]) => void
}
export const WorkDayPicker = ({ setValue }: Props) => {
  const t = useTranslations()

  const [selectedDays, setSelectedDays] = useState<workdaysType[]>([])

  const handleChange = (value: workdaysType) => {
    if (selectedDays.includes(value)) {
      const newSelectedDays = selectedDays.filter((workday) => workday !== value)
      setSelectedDays(newSelectedDays)
    } else {
      setSelectedDays((prev) => [...prev, value])
    }
  }

  useEffect(() => {
    if (setValue) {
      setValue(selectedDays)
    }
  }, [selectedDays])

  return (
    <div className='workdays'>
      <p className='font-bold'>{t('schedulePage.createSchedule.workdayPickerText')}</p>
      <div className='flex flex-wrap gap-2 items-center'>
        {workdays.map((workday) => (
          <div
            className={clsx('workday-option', { selected: selectedDays.includes(workday) })}
            key={workday}
            onClick={() => handleChange(workday)}>
            <p className={clsx('', { 'text-white': selectedDays.includes(workday) })}>
              {t(`days.${workday}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
