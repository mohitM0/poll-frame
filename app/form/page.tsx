"use client";
import { useState } from "react";

export default function CreatePollForm() {

  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("Poll data:", {
      question: formData.get("poll-question"),
      options: options.filter((option) => option.trim()),
    });

    window.parent.postMessage(
      {
        type: "createPoll",
        data: {
          question: formData.get("poll-question")!.toString(),
          options: options.filter((option) => option.trim()),
        },
      },
      "*"
    );
  };

  return (
    <form
      className="flex flex-col gap-6 p-4 bg-gray-50 rounded shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Poll Question Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-slate-800">Poll Question</h2>
        <label htmlFor="poll-question" className="font-medium text-gray-700">
          Question
        </label>
        <input
          className="resize-none w-full p-3 rounded border border-gray-300 bg-gradient-to-r from-white to-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          name="poll-question"
          id="poll-question"
          placeholder="Enter your question here"
          required
        />
      </div>

      {/* Options Section */}
      {options.map((option, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-700">
            Option {index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <input
              className="resize-none w-full p-3 rounded border border-gray-300 bg-gradient-to-r from-white to-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
              placeholder={`Enter option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              required={index < 2} // First two options are required
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-red-500 font-bold hover:text-red-700"
                title="Remove this option"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Option Button */}
      {options.length < 4 && (
        <button
          type="button"
          onClick={addOption}
          className="self-start text-green-600 font-medium hover:text-green-800"
        >
          + Add Option
        </button>
      )}

      {/* Submit Button */}
      <button className="rounded bg-blue-600 text-white p-3 hover:bg-blue-700 shadow-lg">
        Create Poll
      </button>
    </form>
  );
}
