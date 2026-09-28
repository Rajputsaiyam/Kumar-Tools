const ragService = require("../services/ragService");

const handleChatMessage = (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: "Message is required" });
  }

  const result = ragService.queryKnowledgeBase(message);
  res.json({ success: true, data: result });
};

module.exports = {
  handleChatMessage,
};
