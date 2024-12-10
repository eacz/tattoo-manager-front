import Link from 'next/link'
interface Props {
  text: string
  linkText: string
  link: string
}
export const BottomText = ({ linkText, text, link }: Props) => {
  return (
    <div className='bottom-text-container'>
      <p className='text-lg'>{text}</p>
      <Link className='text-link' href={link}>
      {linkText}
      </Link>
    </div>
  )
}
