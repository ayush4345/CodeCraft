import React, { useState,useEffect } from 'react'
import { supabase } from '../../supabase/supabase'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Reset() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [resetEvent, setResetEvent] = useState(false);

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(event)
          if (event === "PASSWORD_RECOVERY") {
            setResetEvent(true)  
          }
        })
      }, [])

    const resetPassword = async (e) => {
        const { data, error } = await supabase.auth.updateUser({
            password: e.target.password
        })
        if (data) 
        toast.success("Password updated successfully!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        if (error!==null) 
        toast.error("There was an error updating your password.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        navigate("/")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
        {resetEvent && 
        (<section className="grid h-screen place-content-center bg-slate-900 text-slate-300">
            <div className="mb-10 text-center text-orange-400">
                <p><span className="font-bold">Password</span> and <span className="font-bold">Confirm</span> validation.</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                />
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                    />
                    <p id="validation" className="text-center text-white-500 italic text-sm"></p>
                </div>
                <button
                    className="rounded-full bg-orange-500 p-2 px-4 text-white hover:bg-black-500"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? "Hide" : "Show"} Password
                </button>
                <button
                    className="rounded-full bg-orange-500 p-2 px-4 text-white hover:bg-black-500"
                    onClick={resetPassword}
                >
                    Set Password
                </button>
            </div>
        </section>)
        }
        </div>
    )
}
