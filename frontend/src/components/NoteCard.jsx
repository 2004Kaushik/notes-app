import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../lib/utils.js'
import toast from 'react-hot-toast'  // Import directly from react-hot-toast
import axiosInstance from '../lib/axios.js'

const NoteCard = ({ note, onDelete }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Deleting...');
        try {
            await axiosInstance.delete(`/notes/${note._id}`);
            if (onDelete) onDelete(note._id);
            toast.success('Note deleted successfully', { id: toastId });
        } catch (error) {
            const errorMessage = error.response?.status === 429
                ? 'Rate limit reached. Please try again later.'
                : 'Failed to delete note';
            toast.error(errorMessage, { id: toastId });
        }
    };

    return (
        <Link
            className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-inherit'
            to={`/note/${note._id}`}
        >
            <div className='card-body bg-base-300 rounded-lg'>
                <h3 className='card-title text-base-content'>
                    {note.title}
                </h3>
                <p className='text-base-content/70 line-clamp-3'>
                    {note.content}
                </p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-xs text-base-content/50'>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4' />
                        <button 
                            className='btn btn-ghost btn-xs'
                            onClick={handleDelete}
                        >
                            <Trash2Icon className='size-4 text-red-500' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard
