const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐚𝐦𝐞 : 𝐒𝐎𝐍𝐈𝐘𝐀 𝐊𝐇𝐀𝐍
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : 𝐅𝐄𝐌𝐀𝐋𝐄
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : 𝐌𝐈𝐍𝐆𝐋𝐄
│ 🎂 𝐀𝐠𝐞 : 𝟏𝟖+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : 𝐈𝐒𝐋𝐀𝐌
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 5𝐓𝐇 𝐅𝐀𝐈𝐋
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : (𝐖𝐁)𝐇𝐎𝐖𝐑𝐀𝐇
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│ https://fb.com/61566264584912
│ 💬 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│ https://wa.me/+9195640*****
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗧𝗶𝗺𝗲
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/u3XbMyG.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
