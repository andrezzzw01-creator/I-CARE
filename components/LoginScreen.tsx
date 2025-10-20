
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const AppLogo: React.FC = () => (
    <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-slate-800 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m-3 0h-1m10 0h1" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">I-CARE</h1>
    </div>
);

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <AppLogo />
        <h2 className="text-xl font-semibold text-center text-slate-700 mb-6">Sign in to your account</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <input type="email" placeholder="email" className="w-full px-4 py-3 bg-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="andrew@icare.com" />
          </div>
          <div>
            <input type="password" placeholder="password" className="w-full px-4 py-3 bg-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500" defaultValue="password" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-600">
              <input type="checkbox" className="mr-2 rounded" />
              Remember me
            </label>
            <a href="#" className="font-medium text-slate-600 hover:text-slate-800">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300 shadow-lg">
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-stone-300"></div>
          <span className="mx-4 text-stone-500 text-sm">Or sign in with</span>
          <div className="flex-grow border-t border-stone-300"></div>
        </div>

        <div className="space-y-4">
            <button onClick={onLogin} className="w-full bg-white text-slate-700 py-3 rounded-lg font-medium border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-3"/>
                Sign in with Google
            </button>
        </div>
        
        <p className="text-center text-sm text-slate-600 mt-8">
          Not a member? <a href="#" className="font-medium text-slate-800 hover:underline">Create a new account</a>
        </p>
      </div>
    </div>
  );
};
