import { AuthWrapper, BottomText, LoginForm } from '@/modules/auth'

export default function Login() {
  return (
    <AuthWrapper>
      <LoginForm />
      <BottomText text="You don't have an account?" linkText='Sign up' link={'/auth/signup'}/>
    </AuthWrapper>
  )
}
