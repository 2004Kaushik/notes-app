import { NotebookIcon } from 'lucide-react'
import React from 'react'

const NotesNotFound = () => {
    return (
        <div className='text-center text-inherit py-10'>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-24 h-24 rounded-full flex items-center justify-center bg-base-200 mb-4'>
                    <NotebookIcon className="text-inherit bg-base-300 size-8 bg-inherit" />
                </div>
                <h2 className='text-2xl font-semibold mb-4'>No Notes Found</h2>
                <p className='text-lg'>It seems you haven't created any notes yet.</p>
                <p className='text-lg'>Start by creating a new note!</p>
            </div >
        </div>
    )
}

export default NotesNotFound
