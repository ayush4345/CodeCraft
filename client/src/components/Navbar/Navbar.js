import React from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleSignIn = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  const handleSignUp = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  }
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link to="/" className="flex items-center justify-center h-20">
        <img src="/Untitled_logo_1_free-file-removebg-preview-copy(1).png" alt="CodeCraft" height={200} width={200} />
      </Link>
      <div className="flex items-center gap-6">
        {/* <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-2 rounded-md text-sm font-medium border-2 border-transparent
            hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange
            transition duration-300 ease-in-out"
            onClick={handleSignUp}
        >
          Sign Up
        </button> */}
        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-2 rounded-md text-sm font-medium border-2 border-transparent
            hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange
            transition duration-300 ease-in-out"
            onClick={handleSignIn}
        >
          Log In
        </button>
      </div>
    </div>
  )
}
