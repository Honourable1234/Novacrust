import { useState } from 'react';
import ConversionModal from './components/ConversionModal';
import RecipientDetailsModal from './components/RecipientDetailsModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Crypto Conversion</h1>
        <p className="text-gray-600 mb-6">
          Well, I know you mentioned pages, but on opening the figma file I see that we have modals.
          So, click the button to view the modal.
        </p>
        <div className='flex gap-5'>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Open Modal 1
          </button>
          <button
            onClick={() => setIsModal2Open(true)}
            className="p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Open Modal 2
          </button>
        </div>

        <ConversionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <RecipientDetailsModal isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} />
      </div>
    </div>
  );
}

export default App
