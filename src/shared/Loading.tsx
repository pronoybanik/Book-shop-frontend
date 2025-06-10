
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div 
          className="absolute inset-0 border-2 rounded-full animate-ping"
          style={{ borderColor: '#f96d6d' }}
        ></div>
        <div 
          className="absolute inset-2 border-2 rounded-full animate-ping"
          style={{ 
            borderColor: '#f96d6d', 
            animationDelay: '0.5s' 
          }}
        ></div>
        <div 
          className="absolute inset-4 border-2 rounded-full animate-ping"
          style={{ 
            borderColor: '#f96d6d', 
            animationDelay: '1s' 
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;