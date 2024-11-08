// src/app/page.tsx

'use client';

import {useState} from 'react';

export default function Home() {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomNumber = async () => {
    setLoading(true);
    setError(null);
    setNumber(null);

    try {
      const response = await fetch('/api/random');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: {number: number} = await response.json();
      setNumber(data.number);
    } catch (err) {
      setError('Failed to fetch the random number.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Random Number Generator</h1>
      <button
        onClick={fetchRandomNumber}
        disabled={loading}
        className={`px-6 py-3 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } transition-colors`}
      >
        {loading ? 'Loading...' : 'Get Random Number'}
      </button>
      {number !== null && (
        <p className="mt-6 text-2xl">
          Random Number: <span className="font-semibold">{number}</span>
        </p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
