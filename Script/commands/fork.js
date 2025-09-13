module.exports.config = {
name: "fork",
version: "1.0.0",
hasPermssion: 0,
credits: "SHAHADAT SAHU",
description: "Send GitHub repo link",
commandCategory: "other",
usages: "fork",
cooldowns: 3,
};

module.exports.run = async function({ api, event }) {
return api.sendMessage(
"Amr boss habib er kache jaw Link:\n\nhttps://www.facebook.com/share/1AU2iFTZwP/",
event.threadID,
event.messageID
);
};

