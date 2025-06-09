import { useEffect, useState } from 'react'
import { LoaderIcon, ArrowLeftIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to fetch note. Please try again later.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const res = await axiosInstance.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim()
      });
      setNote(res.data);
      navigate("/");
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error('Error updating note:', error);
      if (error.response?.status === 429) {
        toast.error('Rate limit reached. Please try again later.');
      } else {
        toast.error('Failed to update note. Please try again later.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <LoaderIcon className="animate-spin text-primary size-12 mb-4" />
          <p className="text-lg font-mono text-primary">Loading note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full mb-4 text-2xl font-bold"
          placeholder="Note Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered w-full h-64 mb-4"
          placeholder="Note Content"
        />
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className='btn btn-ghost gap-2'
          >
            <ArrowLeftIcon size={16} /> Back
          </button>
          <button
            onClick={handleUpdate}
            className='btn btn-primary'
            disabled={saving}
          >
            {saving ? <LoaderIcon className="animate-spin size-4 mr-2" /> : null}
            Save Changes
          </button>
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this note?')) {
                try {
                  setSaving(true);
                  await axiosInstance.delete(`/notes/${id}`);
                  toast.success('Note deleted successfully!');
                  navigate('/');
                } catch (error) {
                  console.error('Error deleting note:', error);
                  toast.error('Failed to delete note. Please try again later.');
                } finally {
                  setSaving(false);
                }
              }
            }}
            className="btn btn-outline btn-error"
            disabled={saving}
          >
            Delete
          </button>
        </div>
        <div className='mt-6 p-4 bg-base-300 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>Note Details</h2>
          <p className='text-base-content/70'>Created: {new Date(note.createdAt).toLocaleString()}</p>
          <p className='text-base-content/70'>Modified: {new Date(note.updatedAt).toLocaleString()}</p>
          <p className='text-base-content/50 text-sm font-mono mt-2'>ID: {note._id}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage