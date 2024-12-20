import clsx from 'clsx'
import { IoCloseOutline } from 'react-icons/io5'

interface Props {
  children: JSX.Element | JSX.Element[]
  active: boolean
  title?: string
  setActive: (value: boolean) => void
}

export const Modal = ({ children, title, active, setActive }: Props) => {
  const closeModal = () => setActive(false)

  if (!active) return <></>
  return (
    <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-foreground text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-foreground px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div
                className={clsx('flex cursor-pointer justify-between', {
                  'justify-end': !title,
                })}
                onClick={closeModal}>
                <h3 className='font-bold text-xl'>{title}</h3>
                <IoCloseOutline size={30} />
              </div>
              <div className='flex sm:items-start'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
