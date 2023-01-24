import { motion } from "framer-motion";
import styles from "../styles/Modal.module.scss"
import Overlay from "./overlay";

interface ModalProps {
  handleClose: any,
  url: string,
  title: string
}

export const Modal:React.FunctionComponent<ModalProps> = ({ handleClose, url, title }) => (
  <Overlay onClick={handleClose}>
    <span className={styles.close}>X</span>
    <p className={styles.title}>{title}</p>
    <motion.img
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
      initial = {{ scale: 0}}
      animate = {{ scale: 1}}
      transition = {{duration: 0.3}}
      exit = {{ scale: 0}}
      src = {url}
      alt = {title}
    >

    </motion.img>
  </Overlay>
);
export default Modal