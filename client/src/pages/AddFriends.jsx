import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const AddFriends = () => {

    const { isUpdatingFriends, addFriend } = useAuthStore();

    const [email, setEmail] = useState("");

    const handleSubmit = async(e) => {
         e.preventDefault();
        await addFriend({ email: email });
    }

  return (
    <div className='w-full h-[60vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter email of your friend' value={email} className='py-2 px-1 border-2' />
        </div>

        <button type='submit' className='p-2 my-2 bg-green-200 hover:bg-green-300 transition-transform duration-200 ease-in-out shadow-sm hover:shadow-md rounded-sm cursor-pointer'>{ isUpdatingFriends ? "Loading..." : "Add Friend" }</button>
      </form>
    </div>
  )
}

export default AddFriends
