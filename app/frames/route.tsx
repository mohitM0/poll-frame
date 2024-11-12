/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async () => {

    const question = "What's your favorite feature?";
    const options = ["Ease of use", "Security", "Customizability", "Integration"];
    const optionLabels = ["A", "B", "C", "D"];

    return {
        image: (
            <div tw="bg-purple-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                <h2 tw="text-2xl font-bold mb-6">{question}</h2>
                <div tw="flex flex-col items-center">
                    {options.map((option, index) => (
                        <p key={index} tw="text-lg mb-3">
                            <span tw="font-semibold mr-2">{optionLabels[index]}.</span>
                            {option}
                        </p>
                    ))}
                </div>
            </div>
        ),
        buttons: options.map((_, index) => (
            <Button
                key={index}
                action="post"
                target={{
                    pathname: "/vote",
                    query: { vote: index },
                }}
            >
                {optionLabels[index]}
            </Button>
        )),
    };
});

export const GET = handleRequest;
export const POST = handleRequest;