import { AuthWrapper, RegisterForm, BottomText } from '@/modules/auth'

export default function SignUp() {
  return (
    <AuthWrapper>
      <RegisterForm />
      <BottomText text='Already have an account?' linkText='Log in' link='/auth/login' />
    </AuthWrapper>
  )
}
