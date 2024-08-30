const crypto = require("crypto");

function generateKey() {
  return crypto.randomBytes(64).toString("base64");
}

console.log("Generated secret:", generateKey());
