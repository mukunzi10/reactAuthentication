export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind CSS!</h1>
      <p className="mt-4 text-lg text-gray-700">This is a simple example of using Tailwind CSS in a React app.</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Click Me
      </button>
      <div className="mt-8 p-4 bg-white rounded shadow-md"></div>
        <h2 className="text-2xl font-semibold">Tailwind CSS Components</h2>
        <p className="mt-2 text-gray-600">You can create beautiful components with Tailwind CSS.</p>
    </div>
  );
}