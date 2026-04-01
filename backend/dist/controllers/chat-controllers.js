import User from "../models/User.js";
import { configureGroq } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        const history = user.chats.map(({ role, content }) => ({
            role: role === "assistant" ? "assistant" : "user",
            content: content || "",
        }));
        history.push({ role: "user", content: message });
        user.chats.push({ content: message, role: "user" });
        const client = configureGroq();
        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: history,
        });
        const reply = response.choices[0].message.content ?? "";
        user.chats.push({ content: reply, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not registered OR Token malfunctioned");
        if (user._id.toString() !== res.locals.jwtData.id)
            return res.status(401).send("Permissions didn't match");
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not registered OR Token malfunctioned");
        if (user._id.toString() !== res.locals.jwtData.id)
            return res.status(401).send("Permissions didn't match");
        user.chats.splice(0, user.chats.length);
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map