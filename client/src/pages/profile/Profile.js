import React, { useEffect, useState } from 'react'
import Topbar from "../../components/Topbar/Topbar";
import { supabase } from '../../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import DonutChart from 'react-donut-chart';


export default function Profile() {
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [problems, setProblems] = useState(null);
    const [difficulty, setDifficulty] = useState({'Easy':0,'Medium':0,'Hard':0});
    const [userRank, setUserRank] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(true);
    useEffect(() => {
        //fetch data from db
        const fetchUserData = async () => {
            setLoadingUserData(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user === null)
                navigate("/");

            try {
                const { data, error } = await supabase
                    .from('users')
                    .select()
                    .order('points', { ascending: false });

                if (error) {
                    console.error('Error fetching user data:', error);
                } else if (data) {
                    const currentUser = data.filter(person => person.id === user.id);
                    setUserRank(data.indexOf(currentUser[0]) + 1);
                    setUserData(currentUser[0]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }

            try {
                const { data, error } = await supabase
                    .from('Problems')
                    .select('id, difficulty');

                if (error) {
                    console.error('Error fetching problems:', error);
                } else if (data) {
                    setProblems(data);
                    setLoadingUserData(false);
                }
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        if (!userData)
            fetchUserData();
        
        if (!loadingUserData && problems && userData) {
            const newDifficulty = {'Easy': 0, 'Medium': 0, 'Hard': 0};
            userData.solvedProblems.forEach(element => {
                const currentProblem = problems.find(problem => problem.id === element);
                if (currentProblem) {
                    newDifficulty[currentProblem.difficulty] += 1; 
                }
            });
            setDifficulty(newDifficulty);
        }
    }, [userData, userRank, problems, loadingUserData]);


    return (
        <div>
            <div className="bg-dark-layer-2 min-h-screen">
                <Topbar />

                <div className="container mx-auto my-5 p-5 w-11/12">
                    <div className="md:flex no-wrap md:-mx-2 ">

                        <div className="w-full md:w-3/12 md:mx-2">

                            <div className="bg-dark-layer-1 p-3 border-t-4 border-green-400">
                                {!loadingUserData && (<>
                                    <h1 className="text-white font-bold text-xl leading-8 my-1">{userData.displayName}</h1>
                                    {/* <h3 className="text-white font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit.
                                    Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt
                                </p> */}
                                    <ul
                                        className="bg-dark-layer-1 text-white hover:text-gray-400 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                            <span>Rank</span>
                                            <span className="ml-auto"><span
                                                className="bg-green-500 py-1 px-2 rounded text-white text-sm">{userRank}</span></span>
                                        </li>
                                        <li className="flex items-center py-3">
                                            <span>Member since</span>
                                            <span className="ml-auto">{(userData.createdAt).slice(0, 10)}</span>
                                        </li>
                                    </ul>
                                </>)}
                            </div>

                            <div className="my-4"></div>

                            <div className="bg-dark-layer-1 p-3 hover:shadow">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span className="text-green-500">
                                        <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </span>
                                    <span className='text-white'>Premium</span>
                                </div>
                                {!loadingUserData && (<ul
                                    className="bg-dark-layer-1 text-white hover:text-gray-400 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                                    {userData.aipoints !== 0 ? (<li className="flex items-center py-3">
                                        <span>Premium Points Left</span>
                                        <span className="ml-auto">{userData.aipoints}</span>
                                    </li>) : (
                                        <li className="flex items-center py-3">
                                            <span>Not a preminum member</span>

                                        </li>
                                    )}
                                </ul>)}

                            </div>


                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">

                            <div className="bg-dark-layer-1 p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-white leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="white">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                {!loadingUserData && (<div className="text-white">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Name</div>
                                            <div className="px-4 py-2">{userData.name ? userData.name : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Profession</div>
                                            <div className="px-4 py-2">{userData.profession ? userData.profession : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Age Group</div>
                                            <div className="px-4 py-2">{userData.ageGroup ? userData.ageGroup : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Experience</div>
                                            <div className="px-4 py-2">{userData.experience ? userData.experience : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Level</div>
                                            <div className="px-4 py-2">{userData.level ? userData.level : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Toatl Points</div>
                                            <div className="px-4 py-2">{userData.points ? userData.points : ""}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email</div>
                                            <div className="px-4 py-2">
                                                <div href="mailto:jane@example.com">{userData.email ? userData.email : ""}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Reason of Joining</div>
                                            <div className="px-4 py-2">{userData.reason ? userData.reason : ""}</div>
                                        </div>
                                    </div>
                                </div>)}

                            </div>


                            <div className="my-4"></div>


                            <div className="bg-dark-layer-1 p-3 shadow-sm rounded-sm">

                                <div className="grid grid-cols-2">
                                    <div>
                                        <div className="flex items-center space-x-2 font-semibold text-white leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">Activity</span>
                                        </div>
                                        {!loadingUserData && (<ul className="list-inside space-y-2">
                                            <li >
                                                <div className="text-teal-600">Solved Problems</div>
                                                <div className="text-gray-500 ">{userData.solvedProblems.length}</div>
                                            </li>
                                            <li>
                                                <div className="text-teal-600">Liked Problems</div>
                                                <div className="text-gray-500 text-xs">{userData.likedProblems.length}</div>
                                            </li>
                                            <li>
                                                <div className="text-teal-600">Disliked Problems</div>
                                                <div className="text-gray-500 text-xs">{userData.dislikedProblems.length}</div>
                                            </li>
                                            <li>
                                                <div className="text-teal-600">Starred Problems</div>
                                                <div className="text-gray-500 text-xs">{userData.starredProblems.length}</div>
                                            </li>
                                        </ul>)}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 font-semibold text-white leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path fill="#fff"
                                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">Analytics</span>
                                        </div>

                                        <div>
                                            <DonutChart
                                                data={[
                                                    {
                                                        label: 'Easy',
                                                        value: difficulty.Easy,
                                                        // Adjust colors as needed
                                                        // Here's an example to set the color to green
                                                        
                                                    },
                                                    {
                                                        // Adjust empty value to make the donut chart appear as a ring
                                                        label: 'Medium',
                                                        value: difficulty.Medium,
                                                        
                                                    },
                                                    {
                                                        // Adjust empty value to make the donut chart appear as a ring
                                                        label: 'Hard',
                                                        value: difficulty.Hard,
                                                        
                                                    },
                                                    {
                                                        // Adjust empty value to make the donut chart appear as a ring
                                                        label: 'Unsolved',
                                                        value: problems.length-(difficulty.Easy + difficulty.Medium + difficulty.Hard),
                                                        isEmpty:true
                                                    },
                                                ]}
                                                // Adjust height and width as needed
                                                height={200}
                                                width={200}
                                                // Adjust the stroke width for the ring
                                                legend = {false}
                                                colors={['green','yellow','red','white']}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
