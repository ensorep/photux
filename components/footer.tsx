import styles from "../styles/Footer.module.scss"


export const Footer = () => (
  <div className={styles.footer}>
    <a href="/api/auth/logout">Logout</a>
  </div> 
)

export default Footer