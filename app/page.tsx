export default function Home() {
  return (
ad    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">City Select Training</h1>
          <nav className="space-x-4">
            <a href="/login" className="hover:underline">Login</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">Choose Your Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales */}
          <div className="rounded-2xl border p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Sales Training</h3>
            <p className="mb-4 text-sm">Learn techniques and skills for boosting dealership sales.</p>
            <a href="/sales" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Sales Training
            </a>
          </div>

          {/* Collections */}
          <div className="rounded-2xl border p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Collections Training</h3>
            <p className="mb-4 text-sm">Master the art of customer follow-ups and payment strategies.</p>
            <a href="/collections" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Start Collections Training
            </a>
          </div>

          {/* Compliance */}
          <div className="rounded-2xl border p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">Compliance Training</h3>
            <p className="mb-4 text-sm">Understand dealership regulations and best practices.</p>
            <a href="/compliance" className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              Start Compliance Training
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center p-6 mt-12">
        &copy; {new Date().getFullYear()} City Select Training. All rights reserved.
      </footer>
    </div>
  );
}