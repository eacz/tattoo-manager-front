interface Props {
  children: JSX.Element | JSX.Element[]
}
export const AuthWrapper = ({ children }: Props) => {
  return (
    <div className='mt-4 flex flex-col h-full justify-around'>
      <h2 className='text-5xl'>TattooManager</h2>
      {children}
    </div>
  )
}
