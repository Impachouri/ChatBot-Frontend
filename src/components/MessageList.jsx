import BotIcon from "./BotIcon";

const MessageList = ({ messages, typing, messagesEndRef }) => {
    return (
        <div className="h-[80%] flex flex-col space-y-4 overflow-y-auto gap-5 font-medium text-xl">
            {messages.map((message, index) => (
                <div key={index} className="flex w-full">
                    <div className="flex items-start space-x-8 ">
                        {message.sender === "user" ? (
                            <div className="w-14 h-14 aspect-square flex items-center justify-center bg-purple-400 rounded-full text-white font-bold">
                                S
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <BotIcon />
                            </div>
                        )}
                        <div className="w-full  h-full flex items-center justify-center">
                            <div >
                                {message.text}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {typing && (
                <div className="flex w-full">
                    <div className="flex items-start space-x-8 ">
                        <div className="flex items-center justify-center">
                            <BotIcon />
                        </div>
                        <div className="w-full h-full flex items-center justify-center">
                            <div>Replying...</div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
