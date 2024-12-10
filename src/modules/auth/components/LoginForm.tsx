export const LoginForm = () => {
  return (
    <form className='flex flex-col gap-14 items-center '>
      <div className='w-full'>
        <p className='text-lg mb-1'>Email</p>
        <input type='email' className='border-gray-300 border-solid border-2 p-2 rounded-md w-full' />
      </div>
      <div className='w-full'>
        <p className='text-lg mb-1'>Password</p>
        <input type='password' className='border-gray-300 border-solid border-2 p-2 rounded-md w-full' />
      </div>
      <button className='bg-primary text-white p-2 rounded-md w-full'>Login</button>
    </form>
  )
}
