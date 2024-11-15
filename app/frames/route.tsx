/* eslint-disable react/jsx-key */
// import { button } from "frames.js/core";
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async () => {
    const question = "What's your favorite feature?";
    // const options = ["Ease of use", "Security", "Customizability", "Integration"];

    return {
        image: (
            <div tw="bg-purple-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                <h2 tw="text-4xl font-bold mb-8 text-center">{question}</h2>
            </div>
        ),
        buttons: [<Button action="post" target={{pathname: "/actions/create-poll",
            
        }}>
            check
        </Button>]
        // options.map((option, index) => (
        //     <Button
        //         key={index}
        //         action="post"
        //         target={{
        //             pathname: "/voteResult",
        //             query: { selectedOption: option, voteIndex: index },
        //         }}

        //     >
        //         {option}
        //     </Button>
        // )),
        
    };
});

export const GET = handleRequest;
export const POST = handleRequest;

// composer action url https://invoice.com/~/add-cast-action/frames/actions/create-poll