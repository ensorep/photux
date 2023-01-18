import React from "react";
import Link from "next/link";

export const Header = () => (
  <div>
    <p>Photux</p>
    <Link href="/api/auth/login">Login</Link>
      <br/>
    <Link href="/api/auth/logout">Logout</Link>
  </div> 
)

export default Header