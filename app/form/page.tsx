"use client";

// import type { ComposerActionState } from "frames.js/types";

// pass state from frame message
export default function CreatePollForm({
}) {
  // const composerActionState = JSON.parse(
  //   searchParams.state
  // ) as ComposerActionState;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // normally you would send the request to server, do something there, etc
        // this is only for demonstration purposes
        console.log("i am here on newFrame url")
        const newFrameUrl = new URL(
          "/frames",
          window.location.href
        );

        // newFrameUrl.searchParams.set(
        //   "number",
        //   formData.get("number")!.toString()
        // );

        window.parent.postMessage(
          {
            type: "createCast",
            data: {
              cast: {
                // ...composerActionState,
                text: formData.get("cast-text")!.toString(),
                // always append to the end of the embeds array
                // embeds: [...composerActionState.embeds, newFrameUrl.toString()],
                embeds: [ newFrameUrl.toString()],
              },
            },
          },
          "*"
        );
      }}
    >
      <label htmlFor="dialog-cast-text-editor" className="font-semibold">
        Cast text
      </label>
      <span className="text-slate-400 text-sm">
        Optionally you can modify the cast text from composer action
      </span>
      <textarea
        defaultValue={"mohit testing default value"}
        className="resize-none w-full p-2 rounded border border-slate-800"
        name="cast-text"
        id="dialog-cast-text-editor"
        placeholder="Type a cast here and submit the form..."
        rows={3}
      />
      <label className="font-semibold" htmlFor="game-number">
        Enter a random number
      </label>
      <input
        className="rounded border border-slate-800 p-2"
        id="game-number"
        name="number"
        placeholder="0-9"
        min={0}
        max={9}
        required
        type="number"
      />
      <button className="rounded bg-slate-800 text-white p-2" type="submit">
        Create Game
      </button>
    </form>
  );
}
