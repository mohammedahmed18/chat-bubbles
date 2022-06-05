import { motion } from "framer-motion";

const Bubble = ({ text, fade, initiate }) => {
  return (
    <div
      className={`bubble ${fade ? "hidden" : ""}  ${
        initiate ? "initiate" : ""
      }`}
    >
      {text}
    </div>
  );
};

export default Bubble;
