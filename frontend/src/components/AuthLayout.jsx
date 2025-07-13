import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: (direction) => ({
    x: direction === "left" ? 100 : -100,
    opacity: 0,
    scale: 0.98,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    x: direction === "left" ? -100 : 100,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  }),
};

const AuthLayout = () => {
  const location = useLocation();
  const direction = location.pathname === "/signup" ? "right" : "left";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-5xl"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
