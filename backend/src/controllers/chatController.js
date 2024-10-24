import Chat from '../models/Chat.js'

// send message
const sendMessage = async (req, res) => {
    const { receiver, content } = req.body;
    const sender = req.userId;

    try {
        const existChat = await Chat.findOne({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        });

        if (existChat) {
            existChat.messages.push({
                sender: sender,
                content: content,
                isSeen:false,
            });
            await existChat.save();
        } else {
            // If no chat exists, create a new one
            await Chat.create({
                sender: sender,
                receiver: receiver,
                messages: [{ sender: sender, content: content }],
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
        });
    }
};

// get Chats
const getChat = async (req, res) => {
    const receiver = req.query.receiver;
    const sender = req.userId;
    try {
        const chat = await Chat.findOne({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        })
        if(chat){
            const sortedMessages = chat.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            res.status(200).json({
                success: true,
                message: 'Messages get successfully!',
                chats:sortedMessages
            });
        }else{
            res.status(200).json({
                success: true,
                message: 'Chat does not exist!',
                chats:[]
            });
        }
        } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
        });
    }
}

// get chat history
const getHistory = async (req, res) => {
    const sender = req.userId;
    try {
        const chats = await Chat.find({
            $or: [
                { sender: sender},
                { receiver: sender }
            ]
        })
        .populate('sender','username email')
        .populate('receiver','username email');
        
        res.status(200).json({
            success: true,
            message: 'Chats get successfully!',
            chats:chats.reverse()
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
        });
    }
}

const updateChat = async (req, res) => {
    const { receiver } = req.body;
    const sender = req.userId;

    try {
        const existChat = await Chat.findOneAndUpdate(
            {
                $or: [
                    { sender: sender, receiver: receiver },
                    { sender: receiver, receiver: sender }
                ]
            },
            {
                $set: { 'messages.$[elem].isSeen': true }
            },
            {
                arrayFilters: [{ 'elem.isSeen': false }], // Only update messages where isSeen is false
                new: true // Return the updated document
            }
        );
        res.status(200).json({
            success: true,
            message: 'Chat seen updated successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
        });
    }
};


export {sendMessage , getChat , getHistory , updateChat}