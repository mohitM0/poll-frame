/* eslint-disable react/jsx-key */
import { frames } from "../frames";
// import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx) => {
  const { selectedOption, voteIndex } = ctx.searchParams;

  const frameUrl = ctx.message?.frameUrl;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  if (!frameUrl) {
    throw new Error("frameUrl is undefined");
  }
  const urlParams = new URLSearchParams(new URL(frameUrl).search);
  const pollId = urlParams.get("pollId");

  if (!pollId) {
    return {
      image: (
        <div tw="bg-red-600 text-white w-full h-full flex justify-center items-center">
          <h2 tw="text-2xl font-bold">Poll ID is missing</h2>
        </div>
      ),
    };
  }
  if (voteIndex !== undefined) {
    try {
      const absoluteUrl = new URL(`/api/polls/${pollId}`, baseUrl).toString();

      await fetch(absoluteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteIndex: parseInt(voteIndex) }),
      });
    } catch (error) {
      console.error("Failed to register vote:", error);
    }
  }

  return {
    image: (
      <div tw="bg-green-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
        <h2 tw="text-4xl font-bold mb-8 text-center">
          You voted for: {selectedOption}
        </h2>
      </div>
    ),
    // buttons: [
    //   <Button action="post" target={new URL(`/${pollId}`, baseUrl)}>
    //     Back to Poll
    //   </Button>,
    // ],
  };
});


export const GET = handleRequest;
export const POST = handleRequest;