/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const GET = frames(async (ctx) => {
  const { selectedOption, voteIndex } = ctx.searchParams;
  const pollId = 'your-poll-id'; // Replace with your actual poll ID or pass it dynamically if needed.

  // if (voteIndex !== undefined) {
  //   // Trigger the vote API call
  //   try {
  //     await fetch(`/api/polls/${pollId}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ voteIndex: parseInt(voteIndex) }),
  //     });
  //   } catch (error) {
  //     console.error("Failed to register vote:", error);
  //   }
  // }

  return {
    image: (
      <div tw="bg-green-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
        <h2 tw="text-4xl font-bold mb-8 text-center">
          You voted for: {selectedOption}
        </h2>
      </div>
    ),
    buttons: [
      <Button action="post" target="/frames/poll">
        Back to Poll
      </Button>,
    ],
  };
});
