import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'  // Import directly from react-hot-toast
import axiosInstance from '../lib/axios'

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
      if (!trimmedTitle || !trimmedContent) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    toast.promise(
      axiosInstance.post('/notes', { title, content })
        .then(() => {
          navigate('/');
        }),
      {
        loading: 'Creating note...',
        success: 'Note created successfully!',
        error: err => err.response?.status === 429 
          ? 'Rate limit reached. Please try again later.'
          : 'Failed to create note'
      }
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-4'>
            <ArrowLeftIcon className='inline-block mr-2' />
            <span>
              Back to home
            </span>
          </Link>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>
                Create a new note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Enter title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type='submit'
                    className={`btn btn-primary ${loading ? 'Creating...' : 'Create Note'}`}
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
