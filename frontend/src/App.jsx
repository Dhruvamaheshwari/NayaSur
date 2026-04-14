import Chatbot from "./components/Chatbot";
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-900/50 dark:to-fuchsia-950 transition-colors flex items-center justify-center p-4 animate-gradient-shift overflow-hidden">
      {/* Animated Background Equalizer Bars */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 flex justify-between items-end gap-2 px-2 pointer-events-none opacity-20 dark:opacity-30 z-0 pb-0">
        <div className="flex-1 max-w-[80px] rounded-t-full bg-indigo-500 bg-equalize-2"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-purple-400 bg-equalize-5"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-pink-500 bg-equalize-1"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-indigo-400 bg-equalize-6"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-purple-500 bg-equalize-3"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-pink-400 bg-equalize-7"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-indigo-500 bg-equalize-4"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-purple-500 bg-equalize-1 shadow-sm"></div>
        <div className="flex-1 max-w-[80px] rounded-t-full bg-pink-500 bg-equalize-5"></div>
        <div className="flex-1 max-w-[80px] hidden sm:block rounded-t-full bg-indigo-400 bg-equalize-3"></div>
        <div className="flex-1 max-w-[80px] hidden sm:block rounded-t-full bg-purple-400 bg-equalize-6"></div>
        <div className="flex-1 max-w-[80px] hidden md:block rounded-t-full bg-pink-400 bg-equalize-2"></div>
        <div className="flex-1 max-w-[80px] hidden lg:block rounded-t-full bg-indigo-500 bg-equalize-7"></div>
        <div className="flex-1 max-w-[80px] hidden lg:block rounded-t-full bg-purple-500 bg-equalize-4"></div>
      </div>

      {/* Front App Layer */}
      <div className="relative z-10 w-full flex justify-center">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
