import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const ViewPaste = () => {

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input
            className='p-2 rounded-xl mt-2 w-[66%] pl-4'
                type='text'
                placeholder='enter title here'
                value={paste.title}
                disabled
            />
        </div>

        <div className='mt-8'>
            <textarea
                className='rounded-2xl mt-4 min-w-[500px] p-4'
                value={paste.content}
                placeholder='enter content here'
                disabled
                rows={20}
            />
        </div>
    </div>
  )
}

export default ViewPaste