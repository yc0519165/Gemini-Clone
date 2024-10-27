import { useContext } from "react";
import { assets } from "../../assets/assets";
import styles from "/src/componentStyle/mainStyle/main.module.css";
import { Context } from "../../context/Context";
export const Main = () => {
  const {
    onSent,
    recentPromt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <>
      <div className={`${styles.main}`}>
        <div className={`${styles.nav}`}>
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className={`${styles.mainContainer}`}>
          {!showResult ? (
            <>
              <div className={`${styles.mainHading}`}>
                <p>
                  <span>Hello Yuvraj.</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className={`${styles.cards}`}>
                <div className={`${styles.card}`}>
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className={`${styles.card}`}>
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className={`${styles.card}`}>
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className={`${styles.card}`}>
                  <p>Tell me about React js and React native</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className={`${styles.result}`}>
              <div className={`${styles.resultTitle}`}>
                <img src={assets.user_icon} alt="" />
                <p>{recentPromt}</p>
              </div>
              <div className={`${styles.resultData}`}>
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className={`${styles.loader}`}>
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className={`${styles.mainBottom}`}>
            <div className={`${styles.searchBar}`}>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a promt here"
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              </div>
            </div>
            <p className={`${styles.info}`}>
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
