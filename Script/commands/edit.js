const axios = require('axios');

const apiEndpoint = "https://edit-and-gen.onrender.com/gen";

module.exports.config = {
  name: "edit",
  version: "7.0",
  credits: "Dipto",
  countDown: 5,
  hasPermssion: 2,
  category: "AI",
  commandCategory: "AI",
  description: "Edit images or generate new ones using powerful AI",
  guide: {
    en: "{pn} [prompt] → reply to image to edit, or just use prompt to generate",
  },
};

// API call with retry & timeout
async function callAPI(prompt, imageUrl = null, retries = 2) {
  const fullURL = `${apiEndpoint}?prompt=${encodeURIComponent(prompt)}${
    imageUrl ? `&image=${encodeURIComponent(imageUrl)}` : ""
  }`;

  try {
    const response = await axios.get(fullURL, {
      responseType: "stream",
      timeout: 60000, // 60s timeout
      validateStatus: () => true
    });
    return response;
  } catch (err) {
    if (retries > 0) {
      console.warn("Retrying API call... attempts left:", retries);
      return callAPI(prompt, imageUrl, retries - 1);
    }
    throw err;
  }
}

// Main handler
async function handleEdit(api, event, args) {
  const url = event.messageReply?.attachments?.[0]?.url || null;
  const prompt = args.join(" ").trim() || "Enhance this image";

  try {
    const response = await callAPI(prompt, url);

    if (response.headers["content-type"]?.startsWith("image/")) {
      return api.sendMessage(
        {
          body: `✨ AI Result for: "${prompt}"`,
          attachment: response.data
        },
        event.threadID,
        event.messageID
      );
    }

    // If text or JSON returned
    let responseData = "";
    for await (const chunk of response.data) {
      responseData += chunk.toString();
    }

    try {
      const jsonData = JSON.parse(responseData);
      if (jsonData?.response) {
        return api.sendMessage(jsonData.response, event.threadID, event.messageID);
      }
    } catch {
      if (responseData.trim()) {
        return api.sendMessage(responseData.trim(), event.threadID, event.messageID);
      }
    }

    return api.sendMessage(
      "❌ API returned no valid image or message.",
      event.threadID,
      event.messageID
    );

  } catch (error) {
    console.error("Edit command error:", error.message);
    return api.sendMessage(
      "❌ Failed to process your request. Try again later.",
      event.threadID,
      event.messageID
    );
  }
}

module.exports.run = async ({ api, event, args }) => {
  if (!args[0] && !event.messageReply) {
    return api.sendMessage(
      "⚠️ Give a prompt or reply to an image with a prompt.",
      event.threadID,
      event.messageID
    );
  }
  await handleEdit(api, event, args);
};

module.exports.handleReply = async function ({ api, event, args }) {
  if (event.type === "message_reply") {
    await handleEdit(api, event, args);
  }
};
