
import axios from "axios";
import { useState } from "react";
import server from "../environment";

export default function TextSummarize() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await axios.post(`${server.prod}/api/summarize`, { text });
      setSummary(response.data.summary);
    } catch (err) {
      setError("Error summarizing text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-[#f23064] mb-6">Text Summarization</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-[#f23064]">
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f23064]"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full mt-4 bg-[#f23064] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#d91d52] transition-all"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-[#f23064]">
          <h2 className="text-xl font-semibold text-[#f23064] mb-2">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
}

