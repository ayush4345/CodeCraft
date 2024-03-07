// Chat.js - Chat Component
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Chat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user);
            if (!user) {
                navigate('/auth');
            }
        };

        fetchData();
        // Subscribe to changes in the "messages" table
        const subscription = supabase
            .channel('room1')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                setMessages(prevMessages => [...prevMessages, payload.new]);
            })
            .subscribe()

        // Fetch initial messages
        fetchMessages();

        // Unsubscribe from changes when component unmounts
        return () => {
            subscription.unsubscribe();
        };

    }, []);


    const fetchMessages = async () => {
        try {
            const { data: messages, error } = await supabase.from('messages').select('*');
            if (error) {
                throw error;
            }
            setMessages(messages);
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    const sendMessage = async () => {
        try {
            setSendingMessage(true)
            if (newMessage.trim() === '') return;
            const { data, error1 } = await supabase
                .from('users')
                .select('displayName')
                .eq('id', user.id)
            console.log(data)

            const { error } = await supabase.from('messages').insert([
                { displayName: data[0].displayName, text: newMessage }
            ]);

            if (error) {
                throw error;
            }
            setSendingMessage(false)
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
            setSendingMessage(false)
        }
    };

    return (
        <>
        <Topbar/>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-col flex-auto h-full p-6  bg-dark-layer-2 ">
                    <div
                        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-dark-layer-1 h-full p-4"
                    >
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message, index) =>
                                        message.user_id !== user.id ? (
                                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-col items-start ml-3">
                                                    <div className="text-xs text-gray-400">{message.displayName}</div> {/* Display displayName above */}
                                                    <div className="relative text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                        <div>{message.text}</div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">{message.created_at}</div> {/* Display created_at below */}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="col-start-6 col-end-13 p-3 rounded-lg mr-3">
                                                <div className="flex flex-col items-end">
                                                    <div className="text-xs text-gray-400">{message.displayName}</div> {/* Display displayName above */}
                                                    <div className="relative text-sm bg-orange-100 py-2 px-4 shadow rounded-xl">
                                                        <div>{message.text}</div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">{message.created_at}</div> {/* Display created_at below */}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                            </div>
                        </div>
                        <div
                            className="flex flex-row items-center h-16 rounded-xl bg-dark-layer-2 w-full px-4"
                        >
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-orange-300 pl-4 h-10"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                >
                                    {!sendingMessage && <span onClick={sendMessage}>Send</span>}
                                    {sendingMessage && <AiOutlineLoading3Quarters/>}
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
