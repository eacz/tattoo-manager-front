interface Props {
  children: JSX.Element | JSX.Element[]
}
import '../auth.css'

export const AuthWrapper = ({ children }: Props) => {
  return (
    <div className='auth-wrapper'>
      <h2 className='text-5xl'>TattooManager</h2>
      {children}
    </div>
  )
}
