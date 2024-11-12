/* eslint-disable react/jsx-key */
import { frames } from "./frames";
// import { Button } from "frames.js/next";

export const GET = frames(async () => {

    const question = "What's your favorite feature?";
    const options = ["Ease of use", "Security", "Customizability", "Integration"];

    return {
        image: (
            <div tw="bg-purple-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                <h2 tw="text-lg mb-4">{question}</h2>
                <div tw="flex flex-col items-center">
                    {options.map((option, index) => (
                        <p key={index} tw="text-sm mb-2">{option}</p>
                    ))}
                </div>
            </div>
          ),
        // buttons: [
        //     <Button action="post" target={{pathname: "/vote", query: {
        //         vote: 0,
        //       }}}>
                
        //       </Button>,
        //     // Without query params
        //     <Button action="post" target="/route2">
        //         Go to route 2
        //     </Button>,
        // ],
    };
});