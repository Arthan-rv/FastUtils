'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function ImageCompressor() {
  const [original, setOriginal] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.7);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setOriginal(file);
      setPreview(URL.createObjectURL(file));
      setCompressed(null);
    }
  };

  const compressImage = async () => {
    if (!original) return;

    setLoading(true);

    const options = {
      maxSizeMB: 0.5, 
      useWebWorker: true,
      initialQuality: quality,
    };

    try {
      const compressedFile = await imageCompression(original, options);
      setCompressed(compressedFile);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
    <h1 className="text-3xl font-bold mb-6">Image Compressor</h1>

    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
      
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleUpload}
        />

        <label
            htmlFor="fileInput"
            className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg block mb-4"
        >
            {original ? "Change Image" : "Upload Image"}
        </label>
        {original && (
  <div className="mt-4">
    <p className="text-sm mb-2">
      Compression Level: {(quality * 100).toFixed(0)}%
    </p>

    <input
      type="range"
      min="0.1"
      max="1"
      step="0.1"
      value={quality}
      onChange={(e) => setQuality(Number(e.target.value))}
      className="w-full"
    />

    <p className="text-xs text-gray-400 mt-1">
      Lower = smaller size, higher = better quality
    </p>
  </div>
)}

      {preview && (
        <img
          src={preview}
          className="rounded-lg mb-4 max-h-60 mx-auto"
        />
      )}

      <button
        onClick={compressImage}
        disabled={!original}
        className="bg-white text-black px-4 py-2 rounded-lg w-full disabled:opacity-50"
      >
        {loading ? 'Optimizing...' : 'Optimize Image'}
      </button>
      <p className="text-xs text-gray-400 mt-2">
        No uploads. All processing happens in your browser.
    </p>

      {compressed && (
        <div className="mt-4 text-sm">
          <p>Original: {(original!.size / 1024).toFixed(2)} KB</p>
          <p>Compressed: {(compressed.size / 1024).toFixed(2)} KB</p>

          <a
            href={URL.createObjectURL(compressed)}
            download="compressed.jpg"
            className="text-blue-400 block mt-2"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  </div>
);
}