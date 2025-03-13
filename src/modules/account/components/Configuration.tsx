'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { Modal } from '@/modules/common'
import '../account.css'
import { customCookies } from '../interfaces/custom-cookies.interface'

interface Props {
  currentLang: string
  currentTheme: string
  setCookies: (values: customCookies) => void
}

const languages: ('es' | 'en')[] = ['es', 'en']
const themes: ('dark' | 'light')[] = ['dark', 'light']

export const Configuration = ({ currentLang, currentTheme, setCookies }: Props) => {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fields, setFields] = useState<customCookies>({ lang: currentLang, theme: currentTheme })

  const onSave = () => {
    setCookies(fields)
    setIsModalOpen(false)
  }
  return (
    <>
      <button className='button-primary' onClick={() => setIsModalOpen(true)}>
        {t('accountPage.buttons.config')}
      </button>
      <Modal active={isModalOpen} setActive={setIsModalOpen} title={t('accountPage.config.modalTitle')}>
        <div className='flex flex-col gap-2'>
          <p className='font-bold '>{t('accountPage.config.selectedLanguage')}</p>
          <div className='flex gap-2'>
            {languages.map((lang) => (
              <div
                className={clsx(lang === fields.lang ? 'option-selected' : 'option')}
                key={lang}
                onClick={() => setFields((current) => ({ ...current, lang }))}>
                <p>{t(`languages.${lang}`)}</p>
              </div>
            ))}
          </div>

          <p className='font-bold'>{t('accountPage.config.selectedLanguage')}</p>

          <div className='flex gap-2'>
            {themes.map((theme) => (
              <div
                className={clsx(theme === fields.theme ? 'option-selected' : 'option')}
                key={theme}
                onClick={() => setFields((current) => ({ ...current, theme }))}>
                <p>{t(`accountPage.themes.${theme}`)}</p>
              </div>
            ))}
          </div>
          <button type='button' className='button-primary my-2' onClick={onSave}>
            {t('accountPage.buttons.save')}
          </button>
        </div>
      </Modal>
    </>
  )
}
