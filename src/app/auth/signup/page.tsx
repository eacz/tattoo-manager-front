import { AuthWrapper, RegisterForm, BottomText } from '@/modules/auth'
import { useTranslations } from 'next-intl'

export default function SignUp() {
  const t = useTranslations('signupPage')
  const componentType = typeof window === 'undefined' ? 'server' : 'client';
  
  return (
    <AuthWrapper>
      <RegisterForm />
      <BottomText text={t('bottomText')} linkText={t('bottomTextLink')} link='/auth/login' />
    </AuthWrapper>
  )
}
