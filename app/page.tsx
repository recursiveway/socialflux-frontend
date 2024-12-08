import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
    <div className="max-w-md w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 text-center">
        <img 
          src="/IMG.svg" 
          alt="Coming Soon" 
          className="mx-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring something amazing. 
          Stay tuned and get ready for an exciting launch!
        </p>
        {/* <div className="flex justify-center space-x-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Notify Me
          </button>
        </div> */}
      </div>
    </div>
    <div className="mt-8 text-center text-gray-500">
      <p>© {new Date().getFullYear()} All Rights Reserved</p>
    </div>
  </div>
  );
}
