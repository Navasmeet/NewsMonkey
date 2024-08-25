import React, {useState} from 'react'
import axios from "axios";
import ReactMarkdown from "react-markdown";


export default function ChatB(props) {
const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  

  async function generateAnswer(e) {
    e.preventDefault(); // Prevent form submission
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... \n It might take upto 10 seconds");

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBtr7ZwhqABQwbWy1Qk6LozJX20vV7NGzg',
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }



   
    

  return (
    <>
     <div className=" from-blue-50 to-blue-100 min-h-screen p-3 my-2 flex flex-col justify-center items-center"></div>
    <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
      >
        <a
        //   href="https://github.com/Navasmeet"
        //   target="_blank"
        //   rel="noopener noreferrer"
        >
          <h1 className="text-4xl p-4 font-bold text-blue-500 mb-4 animate-bounce">
            YOUR PERSONAL NEWS ASSISTANT
          </h1>
        </a>
        <textarea
          required
          className="form-control"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className={`bg-blue text-black m-3 p-1 rounded hover:bg-blue-600 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Generate answer"}
        </button>
      </form>
      <div className="">
        <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
      </div>


</>
  )
}
