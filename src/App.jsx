import { useEffect, useRef, useState as reactState } from "react";
import useState from "react-usestateref";
import background from "./images/bg.jpg";

import "./App.css";
import Bubble from "./bubble";
import { handleKeyDown } from "./keyDownEvent";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [comment, setcomment, commentRef] = useState("");
  const [bubbles, setBubbles, bubblesRef] = useState([]);
  const [focused, setfocused] = reactState(false);

  const ref_input = useRef(null);
  const bubbles_ref = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      handleKeyDown(event, ref_input, focused, handleSubmit);
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSubmit() {
    if (commentRef.current == "") return;
    const new_bubble = {
      text: commentRef.current,
      fade: false,
      initiate: true,
    };
    const old_bubbles = bubblesRef.current;
    const new_bubbles = [...old_bubbles, new_bubble];
    setBubbles(() => new_bubbles);
    setcomment(() => "");
    setTimeout(() => {
      const b_after_initiate = [...bubblesRef.current];
      const index = b_after_initiate.indexOf(new_bubble);
      b_after_initiate[index].initiate = false;
      setBubbles(() => b_after_initiate);
    }, 200);
    setTimeout(() => {
      const bb = [...bubblesRef.current];
      const index = bb.indexOf(new_bubble);
      bb[index].fade = true;
      setBubbles(() => bb);
      setTimeout(() => {
        const b_after_remove = [...bubblesRef.current].filter(
          (b) => b != new_bubble
        );
        setBubbles(() => b_after_remove);
      }, 200);
    }, 7000);
  }

  return (
    <div
      style={{ height: "100vh", backgroundImage: `url(${background})` }}
      className="d-flex flex-column justify-content-end p-5 App"
    >
      <h1 className="text-white-50 position-absolute top-0">Start typing...</h1>

      {/* bubbles */}
      <div className="bubbles mb-3" ref={bubbles_ref}>
        {bubblesRef.current.map((b) => (
          <Bubble
            text={b.text}
            fade={b.fade}
            initiate={b.initiate}
            key={uuidv4()}
          />
        ))}
      </div>
      <div className="input-container">
        <input
          ref={ref_input}
          onBlur={() => {
            setfocused(false);
          }}
          onFocus={() => {
            setfocused(true);
          }}
          type="text"
          value={commentRef.current}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          autoFocus
        />
        <div
          className={
            comment == ""
              ? "input-bubble input-bubble-empty"
              : "input-bubble input-bubble-active"
          }
        >
          {comment}
        </div>
      </div>
    </div>
  );
};

export default App;
