// Layout.jsx
import { motion } from "framer-motion";

const AnimateR = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }} // Short duration for minimal effect
    >
      {children}
    </motion.div>
  );
};

export default AnimateR;