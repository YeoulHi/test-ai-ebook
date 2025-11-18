
import React, { useState, useCallback } from 'react';
import { generateEbookCoverImage } from './services/geminiService';
import EbookCover from './components/EbookCover';
import Loader from './components/Loader';
import { BookIcon } from './components/icons';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('The Last Stargazer');
  const [author, setAuthor] = useState<string>('Alex Vance');
  const [prompt, setPrompt] = useState<string>('A lone astronaut looking at a colorful nebula in space, minimalist, vector art.');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCover = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt for the cover image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const fullPrompt = `Ebook cover art for a book titled "${title}". A professional, marketable design featuring: ${prompt}. Minimalist style.`;
      const generatedImageUrl = await generateEbookCoverImage(fullPrompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, title]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <BookIcon className="w-10 h-10 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Ebook Cover Generator</h1>
          </div>
          <p className="text-lg text-gray-400">Create a beautiful cover for your next masterpiece.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Book Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Midnight Library"
                className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">Author Name</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Matt Haig"
                className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Cover Art Prompt</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Describe the cover image you want to create..."
                className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <button
              onClick={handleGenerateCover}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? 'Generating...' : 'Generate Cover'}
            </button>
            {error && <p className="text-red-400 text-center mt-4">{error}</p>}
          </div>

          <div className="flex justify-center items-center h-full">
            <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center transition-all duration-300">
              {isLoading && <Loader />}
              {!isLoading && imageUrl && (
                <EbookCover title={title} author={author} imageUrl={imageUrl} />
              )}
              {!isLoading && !imageUrl && (
                <div className="text-center text-gray-500 p-8">
                  <BookIcon className="w-16 h-16 mx-auto mb-4"/>
                  <p>Your generated cover will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
