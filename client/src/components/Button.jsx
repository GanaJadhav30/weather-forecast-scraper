import React from 'react'

const Button = () => {
  return (
    <div>
        <input className='bg-white rounded-md p-2 m-4 ' type="text" name="name" placeholder='Enter location' />
        <button className="rounded-full text-md inline-flex h-12 items-center justify-center  bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 bg-zinc-600">Fetch Data</button>

    </div>

  )
}

export default Button