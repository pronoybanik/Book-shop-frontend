
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative">
        {/* Main loader container */}
        <div className="flex flex-col items-center space-y-8">
          
          {/* Animated Books Stack */}
          <div className="relative">
            {/* Book 1 - Bottom */}
            <div className="absolute w-16 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-sm shadow-lg transform rotate-0 animate-pulse">
              <div className="absolute left-1 top-0.5 w-0.5 h-3 bg-red-300 rounded-full"></div>
            </div>
            
            {/* Book 2 - Middle */}
            <div className="absolute w-16 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm shadow-lg transform -rotate-3 translate-y-1 animate-pulse delay-300">
              <div className="absolute left-1 top-0.5 w-0.5 h-3 bg-blue-300 rounded-full"></div>
            </div>
            
            {/* Book 3 - Top */}
            <div className="w-16 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-sm shadow-lg transform rotate-2 translate-y-2 animate-pulse delay-700">
              <div className="absolute left-1 top-0.5 w-0.5 h-3 bg-emerald-300 rounded-full"></div>
            </div>

            {/* Floating Pages Animation */}
            <div className="absolute -top-4 left-8">
              <div className="w-3 h-4 bg-white rounded-sm shadow-md animate-bounce delay-1000 opacity-80"></div>
            </div>
            <div className="absolute -top-6 left-12">
              <div className="w-2 h-3 bg-slate-100 rounded-sm shadow-md animate-bounce delay-1200 opacity-60"></div>
            </div>
            <div className="absolute -top-8 left-10">
              <div className="w-2 h-3 bg-slate-50 rounded-sm shadow-md animate-bounce delay-1400 opacity-40"></div>
            </div>
          </div>

          {/* Animated Progress Bar */}
       

          {/* Loading Text with Typewriter Effect */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-xl font-bold text-slate-700">Loading</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Preparing your reading experience</p>
          </div>

          {/* Orbiting Reading Icons */}
          <div className="relative w-24 h-24 ">
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-0 w-12 h-12 bg-purple-500 rounded-full animate-pulse delay-1500"></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;