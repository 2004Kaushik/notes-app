import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            maxWidth: '400px',
            animation: 'ease-in-out',
          },
        }}
      />
      <div className='relative h-full w-full'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
