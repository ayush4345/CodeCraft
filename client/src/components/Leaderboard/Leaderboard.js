import React from 'react'
import { useState,useEffect,useRef } from "react";
import { supabase } from "../../supabase/supabase";

export default function Leaderboard() {
    const scrollRef = useRef(null);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true)
    const leaderboard = useGetLeaderboard(setLoadingLeaderboard);

    const scrollToOrangeRow = () => {
        // Scroll to the element with the ref
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
      
      useEffect(() => {
        // Call the function to scroll to the orange row when the component mounts
        setTimeout(() => {
          scrollToOrangeRow();
        }, 3000);
      }, [scrollRef]);

  return (
    <div className="relative overflow-x-auto px-2 pb-10 max-h-screen">
            {loadingLeaderboard && (
              <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full max-w-[1200px] mx-auto">
              {!loadingLeaderboard && (
                <>
                <thead className="text-xs text-gray-500 uppercase dark:text-gray-400 border-b sticky top-0 bg-dark-layer-2">
                  <tr>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Rank
                    </th>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Display Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                {leaderboard.map((problem, idx) => {
                    return (
                        <tr className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""} ${problem.id === 0 ? "bg-orange-500" : ""}`} key={idx} ref={problem.id === 0 ? scrollRef : null}>
                            <td className="px-6 py-4">
                              {idx+1}
                            </td>
                            <td className={`px-6 py-4 `}>
                                {problem.displayName}
                            </td>
                            <td className={"px-6 py-4"}>
                                {problem.points}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
                </>
              )}
            </table>
          </div>
  )
}

const LoadingSkeleton = () => {
    return (
      <div className="flex items-center space-x-12 mt-4 px-6">
        <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
        <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
        <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
        <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

function useGetLeaderboard(setLoadingLeaderboard) {
    const [problems, setProblems] = useState([])
  
    useEffect(() => {
      //fetch data from db
      const fetchProblems = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setLoadingLeaderboard(false)
        try {
          const { data, error } = await supabase
            .from('users')
            .select()
            .order('points',{ascending:false});
  
            // console.log(data)
  
          if (error) {
            console.error('Error fetching problems:', error);
          } else if (data) {
            if(user)
            {
              const currentUser = data.filter(person => person.id === user.id);
              currentUser[0].id = 0;
  
            }
            setProblems(data)
            setLoadingLeaderboard(false)
          }
        } catch (error) {
          console.error('Error fetching problems:', error);
        }
      };
      fetchProblems();
    }, [setLoadingLeaderboard])
    return problems;
  }
  
  // function useGetLeaderboard(setLoadingLeaderboard) {
  //   const [leaderboardData, setLeaderboardData] = useState([]);
  
  //   useEffect(() => {
  //     // Fetch data from the database
  //     const fetchLeaderboardData = async () => {
  //       setLoadingLeaderboard(true); // Set loading to true while fetching data
  
  //       try {
  //         // Fetch all users and their points, ordered by points in descending order
  //         const { data: { user } } = await supabase.auth.getUser()
  //         const { data, error } = await supabase
  //           .from('users')
  //           .select()
  //           .order('points', { ascending: false });
  
  //         if (error) {
  //           console.error('Error fetching leaderboard data:', error);
  //         } else if (data) {
  //           // Find the index of the current user in the sorted data
  //           const currentUserIndex = data.findIndex(person => person.id === user.id);
  
  //           // Determine the start and end indices for slicing
  //           const startIndex = Math.max(0, currentUserIndex - 2); // Display 2 users above
  //           const endIndex = Math.min(data.length - 1, currentUserIndex + 2); // Display 2 users below
  
  //           // Slice the leaderboard data to get the subset
  //           const subsetLeaderboardData = data.slice(startIndex, endIndex + 1);
  
  //           setLeaderboardData(subsetLeaderboardData);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching leaderboard data:', error);
  //       } finally {
  //         setLoadingLeaderboard(false); // Set loading to false after fetching data
  //       }
  //     };
  
  //     fetchLeaderboardData();
  //   }, [setLoadingLeaderboard]);
  
  //   return leaderboardData;
  // }
