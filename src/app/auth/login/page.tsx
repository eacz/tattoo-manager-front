import { AuthWrapper, BottomText, LoginForm } from '@/modules/auth'
import { useTranslations } from 'next-intl';

export default function Login() {
  const t = useTranslations('loginPage');
  return (
    <AuthWrapper>
      <LoginForm />
      <BottomText text={t('bottomText')} linkText={t('bottomTextLink')} link={'/auth/signup'}/>
    </AuthWrapper>
  )
}
