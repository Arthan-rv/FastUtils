import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">

      {/* Header */}
      <div className="absolute top-4 left-6 text-sm text-gray-500">
        FastUtils
      </div>

      {/* Main Content */}
      <h1 className="text-4xl font-bold">FastUtils 🚀</h1>

      <p className="text-gray-400">
        Free tools. No signup. Instant results.
      </p>

      <Link href="/image-compressor" className="text-blue-400">
        Image Compressor →
      </Link>
    </main>
  );
}