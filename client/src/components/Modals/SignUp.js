import React from 'react'
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = (type) => {
        setAuthModalState((prev) => ({ ...prev, type }));
      }; 
      const [inputs, setInputs] = useState({
        name: '',
        profession: '',
        institute: '',
        ageGroup: '',
        email: '',
        displayName: '',
        password: '',
        reason: '',
        experience: '',
        level:''
      });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeInput = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
      e.preventDefault();
  
      // Validate if all required fields are filled
      const requiredFields = ['name', 'profession', 'email', 'password', 'ageGroup', 'reason', 'experience','level'];
      const isAnyFieldEmpty = requiredFields.some(field => !inputs[field]);
  
      // if (isAnyFieldEmpty) {
      //   return alert('Please fill all required fields');
      // }
      if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert("Please fill all fields");
  
      try {
        setLoading(true);
        setError(null);
        toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
        const { user, error } = await supabase.auth.signUp({
          email: inputs.email,
          password: inputs.password,
        });
  
        if (error) {
          throw error;
        }else{
          console.log('Signed up:', user);
        // alert("Signed up successfully. Confirm it before login on your registered mailId.")
        const { data, error: linkError } = await supabase
          .from('users')
          .upsert([
            {
              email: inputs.email,
              displayName: inputs.displayName,
              name:inputs.name,
              profession:inputs.profession,
              institute:inputs.profession,
              ageGroup:inputs.ageGroup,
              reason:inputs.reason,
              experience:inputs.experience,
              level:inputs.level
            },
          ]);

        if (linkError) {
          console.error('Error linking user with users table:', linkError.message);
        } else {
          console.log('User linked with users table:', data);
        }
        }
  
        // Additional logic after successful registration
  
        // Redirect to additional info page with user data
        navigate('/');
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      } finally {
        setLoading(false);
        toast.dismiss("loadingToast");
      }
    };

    useEffect(() => {
      if (error) 
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }, [error]);
    
  return (
    <form className="space-y-6 px-6 pb-4 overflow-y-auto h-96" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white my-3">Register to LeetClone</h3>
      
      <div>
        <label htmlFor="name" className="text-sm font-medium block mb-2 text-gray-300">
          Name
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="name"
          id="name"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="profession" className="text-sm font-medium block mb-2 text-gray-300">
          Profession
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="profession"
          id="profession"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="Working/Student"
        />
      </div>
      <div>
        <label htmlFor="institute" className="text-sm font-medium block mb-2 text-gray-300">
          Institute/Company
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="institute"
          id="institute"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="ageGroup" className="text-sm font-medium block mb-2 text-gray-300">
          Age Group
        </label>
        <select
          onChange={handleChangeInput}
          name="ageGroup"
          id="ageGroup"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
          "
          defaultValue="" // Set the default value to an empty string
        >
          <option value="" disabled hidden >
            Select an age group
          </option>
          <option value="Below 18">Below 18</option>
          <option value="18-25">18-25</option>
          <option value="25+">25+</option>
        </select>
      </div>

      <div>
        <label htmlFor="level" className="text-sm font-medium block mb-2 text-gray-300">
          Level
        </label>
        <select
          onChange={handleChangeInput}
          name="level"
          id="level"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
          "
          defaultValue="" // Set the default value to an empty string
        >
          <option value="" disabled hidden >
            Select a level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>


      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email
        </label>
        <input
        onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
          Display Name
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="displayName"
          id="displayName"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Password
        </label>
        <input
        onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder="*******"
        />
      </div>

      <div>
        <label htmlFor="reason" className="text-sm font-medium block mb-2 text-gray-300">
          Why do I want to learn coding?
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="reason"
          id="reason"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="experience" className="text-sm font-medium block mb-2 text-gray-300">
          Current coding experience
        </label>
        <input
        onChange={handleChangeInput}
          type="text"
          name="experience"
          id="experience"
          className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
          placeholder=""
        />
      </div>
      
      

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account?{" "}
        <Link to='/auth' className="text-blue-700 hover:underline" onClick={()=>handleClick("login")}>
          Log In
        </Link>
      </div>
    </form>
  )
}
