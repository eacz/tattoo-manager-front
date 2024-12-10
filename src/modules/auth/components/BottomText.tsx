import Link from 'next/link'
interface Props {
  text: string
  linkText: string
}
export const BottomText = ({ linkText, text }: Props) => {
  return (
    <div className='bottom-text-container'>
      <p className='text-lg'>{text}</p>
      <Link className='text-primary' href='/auth/signup'>
      {linkText}
      </Link>
    </div>
  )
}
