'use client'

import '../schedule.css'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface Props {
  setValue: (value: string[]) => void
}

export const MultipleHourPicker = ({ setValue }: Props) => {
  const t = useTranslations()

  const [hour, setHour] = useState('')
  const [hours, setHours] = useState<string[]>([])

  const handleAddHour = () => {
    if (hour && !hours.includes(hour)) {
      setHours((prev) => [...prev, hour])
    }

    setHour('')
  }

  const deleteHour = (hour: string) => {
    const newHours = hours.filter((h) => h !== hour)
    setHours(newHours)
  }

  useEffect(() => {
    setValue(hours)
  }, [hours])

  return (
    <div className='hours'>
      <p className='font-bold'>{t('schedulePage.createSchedule.multipleHourPickerText')}</p>
      <div className='flex gap-2 items-center'>
        <input type='time' onChange={(e) => setHour(e.target.value)} value={hour} />
        <button
          type='button'
          className={clsx('button-fit', {
            'button-primary': hour,
            'button-disabled': !hour,
          })}
          disabled={!hour}
          onClick={handleAddHour}>
          {t('schedulePage.createSchedule.add')}
        </button>
        {hours.map((hour) => (
          <p className='hour-selected' key={hour} onClick={() => deleteHour(hour)}>
            {hour}
          </p>
        ))}
      </div>
    </div>
  )
}
