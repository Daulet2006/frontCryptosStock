import { useState } from "react";
import axios from "axios";
import Navbar from "./components/NavBar";

export default function ChatbotPage() {
  const [text, setText] = useState("");
  // eslintno-unused-vars;
  const [language, setLanguage] = useState("en");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/chatbot/crypto-advice/",
        {
          text,
          language,
        }
      );
      setResponse(res.data.crypto_advice);
    } catch (err) {
      console.log(err);
      setResponse("Error: Unable to fetch advice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col items-center justify-center">
        <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center h-auto">
          <div className="flex h-10 w-full max-w-96 gap-5 mb-5">
            <textarea
              className="w-full max-w-md p-2 bg-gray-800 rounded"
              placeholder="Enter your question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="px-5 bg-gray-600 rounded "
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </div>
        </div>
        {response ? (
          <div className="w-full max-w-md p-4 bg-gray-800 rounded mt-4">
            <h2 className="text-xl">Response:</h2>
            <p>{response}</p>
          </div>
        ) : (
          <div className="w-full text-center p-4 rounded mt-4">
            <h2 className="text-3xl mb-2 font-semibold">Crypto Bot</h2>
            <p>Ask anything about crypto, trading and web3</p>
          </div>
        ) }
      </div>
    </>
  );
}
