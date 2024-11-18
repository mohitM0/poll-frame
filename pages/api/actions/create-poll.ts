// import { frames } from "../../../../app/frames/frames";
import { composerAction, composerActionForm } from "frames.js/core";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const createPollFormUrl = new URL(
        "/form",
        process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
    );

    if (req.method === "GET") {
        try {
            const response = composerAction({
                action: {
                    type: "post",
                },
                icon: "poll",
                name: "Create a Poll",
                aboutUrl: process.env.VERCEL_URL
                    ? `https://${process.env.VERCEL_URL}`
                    : "http://localhost:3000",
                description: "Create polls.",
                imageUrl: "https://framesjs.org/logo.png",
            });

            // Consume the Response and send back JSON
            const action = await response.json();
            res.status(200).json(action);
        } catch (error) {
            console.error("Error in GET handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        try {
            const response = composerActionForm({
                title: "Create a Poll",
                url: createPollFormUrl.toString(),
            });
            const action = await response.json();
            res.status(200).json(action);
        } catch (error) {
            console.error("Error in POST handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
