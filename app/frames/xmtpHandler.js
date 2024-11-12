// /app/frames/polls/xmtpHandler.js
import { Client } from "@xmtp/xmtp-js";

export async function sendPollResult(clientAddress, selectedOption) {
  const xmtpClient = await Client.create(clientAddress);
  const pollResult = `You voted for option ${selectedOption}`;

  await xmtpClient.conversations.send(
    "Poll Results",
    pollResult
  );
}
