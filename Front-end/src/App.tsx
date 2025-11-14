import ProspectsPage from './pages/ProspectsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-100 text-gray-800">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(200, 200, 200, 0.5)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      />
      <main>
        <ProspectsPage />
      </main>
    </div>
  );
}

export default App;