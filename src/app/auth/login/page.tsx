import { AuthWrapper, BottomText, LoginForm } from '@/modules/auth'

export default function Login() {
  return (
    <AuthWrapper>
      <LoginForm />
      <BottomText text='Already have an account?' linkText='Sign up' />
    </AuthWrapper>
  )
}
