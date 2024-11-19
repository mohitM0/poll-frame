/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";


interface PollOption {
    text: string;
    votes: number;
  }
  
  interface PollData {
    question: string;
    options: PollOption[];
  }

const handleRequest = frames(async (req) => {
  const { pollId } = req.query;

  if (!pollId) {
    return {
      image: (
        <div tw="bg-red-600 text-white w-full h-full flex justify-center items-center">
          <h2 tw="text-2xl font-bold">Poll ID not provided</h2>
        </div>
      ),
    };
  }

  // Fetch poll details
  let pollData: PollData;
  try {
    const response = await fetch(`/api/polls/${pollId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch poll details");
    }
    pollData = await response.json();
  } catch (error) {
    console.error("Error fetching poll:", error);
    return {
      image: (
        <div tw="bg-red-600 text-white w-full h-full flex justify-center items-center">
          <h2 tw="text-2xl font-bold">Error loading poll</h2>
        </div>
      ),
    };
  }

  const { question, options } = pollData;

  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
        <h2 tw="text-4xl font-bold mb-8 text-center">{question}</h2>
      </div>
    ),
    buttons: options.map((option: PollOption, index: number) => (
      <Button
        key={index}
        action="post"
        target={{
          pathname: "/voteResult",
          query: { selectedOption: option.text, voteIndex: index },
        }}
      >
        {option.text}
      </Button>
    )),
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
