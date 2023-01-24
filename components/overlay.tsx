import { motion } from "framer-motion";
import styles from "@/styles/Home.module.scss"

export const Overlay = ({children, onClick}:any) => (
  <motion.div
    className={styles.overlay}
    onClick={onClick}
    initial = {{ scale: 0}}
    animate = {{ scale: 1}}
    transition = {{duration: 0.3}}
    exit = {{ scale: 0}}
  >
    {children}
  </motion.div>
);

export default Overlay