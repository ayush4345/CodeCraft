import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AuthModal from '../../components/Modals/AuthModal'
import { useRecoilValue } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (user) navigate("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, navigate,loading]);

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/hero.png" alt="Hero img" width={700} height={700} />
        </div>
        { authModal.isOpen && <AuthModal/>}
      </div>
    </div>
  )
}
