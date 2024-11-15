import { composerAction, composerActionForm, error } from "frames.js/core";
// import { NextRequest } from "next/server";
import { frames } from "../../../../app/frames/frames";

export const GET = async () => {
    return composerAction({
        action: {
            type: "post",
        },
        icon: "poll",
        name: "Create a Poll",
        aboutUrl: `${new URL(
            "/frames/actions/create-poll",
            process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000"
        )}`,
        description: "Create polls.",
        imageUrl: "https://framesjs.org/logo.png",
    })
}

export const POST = frames(async (ctx) => {
    const walletAddress = await ctx.walletAddress();

    const createPollFormUrl = new URL(
        "/form",
        process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
    );

    if (walletAddress) {
        createPollFormUrl.searchParams.set("uid", walletAddress);
    } else {
        return error("Must be authenticated");
    }

    console.log(createPollFormUrl)
    // if (!ctx.message?.state) {
    //     return error("Must be called from composer");
    // }
    
    // createPollFormUrl.searchParams.set(
    //     "state",
    //     JSON.stringify(ctx.composerActionState)
    // );
    // This is the state of the chat. This is to be paased in the serialized string format. First define a type for this state, then send the values  according to that type from the invoice app(when the user click on a composer action). 
    // To be implemented later after all the basic implementations.

    return composerActionForm({
        title: "Create a Poll",
        url: createPollFormUrl.toString(),
    })
});