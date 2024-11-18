"use client";

export default function CreatePollForm() {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Log form data for demonstration purposes
        console.log("Poll data:", {
          question: formData.get("poll-question"),
          options: [
            formData.get("option-1"),
            formData.get("option-2"),
            formData.get("option-3"),
            formData.get("option-4"),
          ].filter(Boolean), // Filter out any empty options
        });

        // Create new URL for the poll frame
        const newFrameUrl = new URL("/frames", process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000");

        // Example message for creating a new poll cast (modify as needed)
        window.parent.postMessage(
          {
            type: "createPoll",
            data: {
              question: formData.get("poll-question")!.toString(),
              options: [
                formData.get("option-1")!.toString(),
                formData.get("option-2")!.toString(),
                formData.get("option-3")!.toString(),
                formData.get("option-4")!.toString(),
              ].filter(Boolean),
            },
          },
          "*"
        );
      }}
    >
      <label htmlFor="poll-question" className="font-semibold">
        Poll Question
      </label>
      <input
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="poll-question"
        id="poll-question"
        placeholder="Enter your question here"
        required
      />

      <label htmlFor="option-1" className="font-semibold">
        Option 1
      </label>
      <input
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="option-1"
        id="option-1"
        placeholder="Enter option 1"
        required
      />

      <label htmlFor="option-2" className="font-semibold">
        Option 2
      </label>
      <input
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="option-2"
        id="option-2"
        placeholder="Enter option 2"
        required
      />

      <label htmlFor="option-3" className="font-semibold">
        Option 3 (optional)
      </label>
      <input
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="option-3"
        id="option-3"
        placeholder="Enter option 3"
      />

      <label htmlFor="option-4" className="font-semibold">
        Option 4 (optional)
      </label>
      <input
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="option-4"
        id="option-4"
        placeholder="Enter option 4"
      />

      <button className="rounded bg-slate-800 text-white p-2" type="submit">
        Create Poll
      </button>
    </form>
  );
}
