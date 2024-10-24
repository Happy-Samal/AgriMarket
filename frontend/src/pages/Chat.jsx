import React, { useState, useContext, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { sendMessage, getChat, getHistory, updateChat } from '../helpers/chat';
import { getUser } from '../helpers/account';
import { convertToDate, convertToTime } from '../helpers/convertToDate';
import { UserContext } from '../context/UserProvider';
import { io } from 'socket.io-client';


function Chat() {
    const socket = useRef()
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate()
    const [expand, setExpand] = useState(false)
    const scrollRef = useRef(null);
    const [formInfo, setFormInfo] = useState({})
    const [messages, setMessages] = useState([])
    const [chatHistory, setChatHistory] = useState([])
    const searchParams = new URLSearchParams(window.location.search);
    const receiver = searchParams.get('receiver');
    const sender = searchParams.get('sender');
    const [receiverName, setReceiverName] = useState('')
    const [receiverOnline, setReceiverOnline] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (sender == null) {
            navigate('/Notfound')
        }
    }, [])



    const getChatHistory = async () => {
        setLoader(true)
        const ans = await getHistory();
        setChatHistory(ans.chats)
        setLoader(false)

    }
    const getChats = async () => {
        if (receiver != null) {
            const res = await getChat(receiver);
            setMessages(res?.chats || [])
        } else {
            setMessages([])
        }
    }
    const getUserDB = async () => {
        if (receiver != null) {
            const res = await getUser({ id: receiver });
            setReceiverName(res.user.username)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await getChatHistory()
            await getChats()
            await getUserDB()
        }
        fetchData()
    }, [sender, receiver])

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });

        }
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages, chatHistory])


    const inputChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
        });

        socket.current.emit('send_status', { id: sender })
        socket.current.on('receive_status', (data) => {
            setReceiverOnline(data)
        });

        if (receiver != null) {
            socket.current.on('receive_message', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.current.disconnect(); // Disconnect the socket when the component is unmounted
            };
        }
        return () => {
            socket.current.off('receive_status'); // Disconnect the socket for temporary
        };
    }, [sender, receiver])

    useEffect(() => {
        const seen = async () => {
            if (receiver != null && receiverOnline?.id == receiver && receiverOnline?.isOnline) {
                await updateChat(receiver)
                await getChats()
            }
        }
        seen()
    }, [receiverOnline, sender, receiver])


    const formSubmit = async (e) => {
        e.preventDefault()
        if (receiver != null) {
            const res = await sendMessage({ receiver: receiver, content: formInfo.message })
            getChats()
            getChatHistory()
            socket.current.emit('send_message', { sender, content: formInfo.message });
            setFormInfo({})
        }
    }

    return (
        <>
            <Helmet>
                <title>My Chat</title>
                <meta name="description" content="AgriMarket - From Farm to Your Table, Fresh and Direct " />
            </Helmet>


            <div className='absolute top-0 z-50  w-screen bg-black flex overflow-hidden text-white'>

                {/* side bar */}
                <div className={` bg-[#211f2c] h-[100vh] border-r-2 border-[#1a1d26] absolute md:relative md:left-0 z-20 md:z-0 md:w-[30%] transition-all duration-700  ${expand ? 'left-0 w-[75vw]  ' : ' -left-80  '} `} onClick={() => { setExpand(false) }}>

                    {/* upper heading */}
                    <div className='flex border-b-2 border-[#1a1d26] font-semibold text-[20px] md:text-[24px] w-full h-[8%] px-5 items-center'>
                        <h1 className=''>Chats</h1>
                    </div>

                    {/* chat history */}
                    <div ref={scrollRef} className='flex flex-col relative h-[70%] overflow-y-auto scrollbar-rounded2 bg-[#18171d] px-4 py-3 overflow-x-hidden gap-3 '>
                        {chatHistory?.length === 0 && <h3 className='text-base md:text-[20px]'>No chat history</h3>}
                        {loader && (
                            <div className="flex justify-center items-center absolute inset-0">
                                <img src="/loader.gif" alt="loading" className='w-12 md:w-16 invert' />
                            </div>
                        )}
                        {chatHistory?.map((item) => {
                            const isSender = item.sender?._id === sender;
                            const username = isSender ? item.receiver?.username : item.sender?.username;
                            const id = isSender ? item.receiver?._id : item.sender?._id;

                            return (
                                <div
                                    key={item._id}
                                    onClick={async () => {
                                        await updateChat(id)
                                        navigate(`/chat?sender=${sender}&receiver=${id}`)
                                    }}
                                    className={`flex items-center  justify-between cursor-pointer hover:bg-[#2466fd] ${id == receiver ? 'bg-[#2466fd]' : 'bg-[#252331]'} py-2 px-3 md:p-4  rounded-lg`}
                                >
                                    <div className='flex gap-2 items-center'>
                                        <img src="/avatar3.gif" alt="avatar" className="lg:h-9 h-5 border rounded-full bg-black" />
                                        <div className='flex flex-col  justify-center'>
                                            <h1 className="lg:text-[18px] text-[10px]">{username}</h1>
                                            <span className='flex '>
                                                <p className={` w-[80px] lg:w-[220px]  overflow-hidden whitespace-nowrap text-ellipsis ${(item.messages[item.messages.length - 1].isSeen) || (item.messages[item.messages.length - 1].sender == sender) ? 'text-gray-400 lg:text-[12px] text-[6px]' : 'text-green-500 lg:text-[16px] text-[10px]  font-semibold'}`}>
                                                    {item.messages[item.messages.length - 1].content}
                                                </p>
                                                {
                                                    (() => {
                                                        let count = 0;
                                                        item.messages?.forEach((message) => {
                                                            if (!message.isSeen && message.sender != sender) {
                                                                count++;
                                                            }
                                                        });
                                                        return count > 0 ? (
                                                            <p className='bg-gray-700 rounded-full text-white w-3 h-3 lg:w-5 lg:h-5 flex items-center justify-center lg:text-[14px] text-[8px]'>
                                                                {count}
                                                            </p>
                                                        ) : null;
                                                    })()
                                                }

                                            </span>
                                        </div>
                                    </div>
                                    <p className='lg:text-[12px] flex self-end text-[8px] text-gray-400 text-nowrap md:w-fit'>{item.messages[item.messages.length - 1].isSeen ? convertToDate(item.messages[item.messages.length - 1].timestamp) : convertToTime(item.messages[item.messages.length - 1].timestamp)}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* footer */}
                    <div className='absolute bottom-0 border-t-2 border-[#1a1d26] w-full h-[22%] overflow-hidden lg:text-base text-[10px] p-2'>
                        <div className='flex gap-2 flex-col text-center'>
                            <div>
                                <p>Copyright &copy; {currentYear}-{currentYear + 1} AgriMarket | All rights reserved!</p>
                                <p>Made by Happy Samal with ❤</p>
                            </div>
                            <div className='flex gap-4 sm:justify-normal justify-center'>
                                < Link to={'/about'} className='hover:underline underline sm:no-underline'>About</ Link>
                                < Link to={'/contactUs'} className='hover:underline underline sm:no-underline'>Contact us</ Link>
                                < Link to={'/privacyPolicy'} className='hover:underline underline sm:no-underline'>Privacy Policy</ Link>
                                < Link to={'/termsCondition'} className='hover:underline underline sm:no-underline'>Terms & Conditions</ Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            <span>Follow Me On</span>
                            <div className='flex gap-4'>
                                <a href="https://www.instagram.com/rudrasamal_/" target="_blank" rel="noopener noreferrer">
                                    <img src="/insta.gif" alt="insta" className=' h-[20px] lg:h-[25px]' />
                                </a>
                                <a href="https://www.facebook.com/samalrudra.rudra" target="_blank" rel="noopener noreferrer">
                                    <img src="/facebook.gif" alt="facebook" className='h-[20px] lg:h-[25px]' />
                                </a>
                                <a href="https://www.linkedin.com/in/happy-samal" target="_blank" rel="noopener noreferrer">
                                    <img src="/linkedin.gif" alt="linkedin" className='h-[20px] lg:h-[25px]' />
                                </a>
                                <a href="https://github.com/Happy-Samal" target="_blank" rel="noopener noreferrer">
                                    <img src="/github.gif" alt="github" className='h-[20px] lg:h-[25px]' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* right side page */}
                <div className='flex flex-col  bg-[#211f2c] h-[100vh]  w-full md:w-3/4  relative transition-all duration-500 text-white  ' >

                    {/* upper heading box */}
                    <div className='flex border-b-2 border-[#1a1d26] font-semibold text-[14px] md:text-[20px] w-full h-[8%] justify-between items-center px-2 lg:px-10'>
                        <img src="/expandbar.svg" alt="expand" onClick={() => { setExpand(true) }} className='w-7 invert cursor-pointer visible md:invisible ' />
                        <div className="flex items-center gap-4">
                            <h1 className="text-sm md:text-lg font-semibold">{receiver == null ? 'AgriMarket' : receiverName}</h1>
                            {receiver != null && (
                                <div className="flex items-center gap-1 text-center">
                                    <span
                                        className={`h-2 w-2 rounded-full ${receiverOnline?.id == receiver && receiverOnline?.isOnline
                                            ? 'bg-green-500 animate-pulse'
                                            : 'bg-gray-400'
                                            }`}
                                    ></span>
                                    {(receiverOnline?.id == receiver && receiverOnline?.isOnline) ? <h2 className="md:text-sm text-[10px] text-green-400">Online</h2> : <h2 className="md:text-sm text-[10px] text-gray-600">Offline</h2>}

                                </div>
                            )}
                        </div>
                        <img src="/home.gif" alt="home" onClick={() => { navigate('/') }} className='md:w-9 w-7 cursor-pointer ' />
                    </div>

                    {/* chat box */}
                    <div ref={scrollRef} className='flex flex-col gap-8 px-4 py-8 relative h-[80%] bg-[#18171d] overflow-y-auto scrollbar-rounded2 transition-all duration-700 overflow-x-hidden'>
                        {messages?.length == 0 ? <div className='flex self-center absolute top-1/2 md:text-[20px]'>{receiver == null ? 'Welcome to AgriMarket' : `Chat With ${receiverName}`}</div> : <div className='bg-[#211f2c] rounded-md px-2 py-1 flex self-center'>🔒 Messages are end-to-end encrypted .No one outside of this chat, not even AgriMarket, can read to them.</div>}
                        {/* Display all messages (Receiver & Sender) */}
                        {messages?.map((item, index) => {
                            const currentDate = convertToDate(item?.timestamp);
                            const previousDate = index > 0 ? convertToDate(messages[index - 1]?.timestamp) : null;
                            return (
                                <React.Fragment key={index} >
                                    {currentDate !== previousDate && <h4 className='flex self-center bg-[#211f2c] rounded-md px-2 py-1'>{currentDate}</h4>}

                                    {/* Message content */}
                                    <div key={item._id} className={`flex items-center gap-1 ${item.sender === receiver ? 'self-start justify-start' : 'self-end justify-end'} w-full`}>
                                        {item.sender === receiver ? (
                                            <>
                                                {/* Receiver message*/}
                                                <img src="/avatar3.gif" alt="avatar" className="lg:h-8 h-6 border rounded-full bg-black" />
                                                <div className={`rounded-lg bg-[#2466fd] px-3 py-1 relative flex ${item.content.length > 20 ? 'flex-col gap-0' : 'flex-row gap-2'
                                                    } max-h-[220px] max-w-[80%]`}>
                                                    <p className="text-white break-words max-h-[200px] overflow-y-auto scrollbar-rounded2 py-1.5">
                                                        {item.content}
                                                    </p>
                                                    <span className="text-[9px] md:text-[11px] text-gray-300 self-end items-center gap-1 flex">
                                                        <p>{convertToTime(item.timestamp)}</p>
                                                        <img src={item.isSeen ? '/seen.png' : '/unseen.png'} alt="tick" className='h-3 invert' />
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Sender message*/}
                                                <div className={`rounded-lg bg-[#2466fd] px-3 py-0.5 relative flex ${item.content.length > 20 ? 'flex-col gap-0' : 'flex-row gap-2'
                                                    } max-h-[220px] max-w-[80%]`}>
                                                    <p className="text-white break-words max-h-[200px] overflow-y-auto scrollbar-rounded2 py-1.5">
                                                        {item.content}
                                                    </p>
                                                    <span className="text-[9px] md:text-[11px] text-gray-300 flex gap-1 items-center  self-end ">
                                                        <p>{convertToTime(item.timestamp)}</p>
                                                        <img src={item.isSeen ? '/seen.png' : '/unseen.png'} alt="tick" className='h-3 invert' />
                                                    </span>
                                                </div>
                                                <img src="/avatar3.gif" alt="avatar" className="lg:h-8 h-6 border rounded-full bg-black" />
                                            </>
                                        )}
                                    </div>

                                </React.Fragment>
                            );
                        })}

                    </div>

                    {/*  Enter message box*/}
                    <div className='absolute bottom-0 flex items-center justify-center w-full h-[12%]' >
                        <form onSubmit={formSubmit} className={`border rounded-full w-[90%] md:w-[80%] h-1/2 relative flex items-center  justify-between ${receiver == null ? 'border-black' : 'bg-[#18171d]'}`} >
                            <input type="text" name='message' value={formInfo.message || ''} onChange={inputChange} disabled={receiver == null} placeholder='Type message...' className={`bg-transparent text-white  outline-none relative h-full w-full rounded-l-full px-4 ${receiver == null ? 'placeholder:text-black' : 'placeholder:text-white'}`} />
                            <button disabled={receiver == null} type='submit' className='px-2 md:px-8'>
                                <img src="/send.gif" alt="send" className={`${receiver == null ? '' : 'invert'} h-8 w-8 `} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
