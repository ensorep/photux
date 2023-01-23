
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useUser } from '@auth0/nextjs-auth0/client';

// we are not exporting by default
export async function middleware(req:unknown, ev:unknown) {
  
  
  // const token = req ? req.cookies?.token : null;
  //  const profile = await profile(token);
  // // if profile exists you want to continue. Also
  // // maybe user sends request for log-in, and if a user wants to login, obviously it has no token
  // const { pathname } = req.nextUrl;
  // if (
  //   // false
  //   // whatever your api route for login is
  //   pathname.includes("/api/login") || profile 
  // ) {
  //   return NextResponse.next();
  // }

  
  // if (!profile && pathname !== "/login") {
  //   // since you want to redirect the user to "/"
  //   return NextResponse.redirect("/");
  // }
}