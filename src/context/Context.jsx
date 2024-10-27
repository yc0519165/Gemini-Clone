import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPromt, setPrevPromt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delyPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (promt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    // Recent promt click and show the result

    // let response;
    // if (promt !== undefined) {
    //   response = await run(promt);
    //   setRecentPromt(promt);
    // } else {
    //   setPrevPromt((prev) => [...prev, input]);
    //   setRecentPromt(input);
    //   response = await run(input);
    // }

    //Recent promt result only show Sidebar

    setRecentPromt(input);
    setPrevPromt((prev) => [...prev, input]);
    const response = await run(input);

    /* Remove the AI Promts Stars and add the boldness using function */

    let responsiveArray = response.split("**");
    let newresponse = "";
    for (let i = 0; i < responsiveArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newresponse += responsiveArray[i];
      } else {
        newresponse += "<b>" + responsiveArray[i] + "</b>";
      }
    }
    let newReponce2 = newresponse.split("*").join("</br>");

    //  Add Typing Effect

    let newresponseArray = newReponce2.split(" ");
    for (let i = 0; i < newresponseArray.length; i++) {
      const nextWord = newresponseArray[i];
      delyPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  //   onSent("what is react js");

  const contextVlaue = {
    prevPromt,
    setPrevPromt,
    onSent,
    setRecentPromt,
    recentPromt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextVlaue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
