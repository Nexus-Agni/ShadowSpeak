import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export {default} from 'next-auth/middleware';

export const config = {
    matcher : [
        '/dashboard/:path*',
        '/sign-in',
        '/sign-up',
        '/',
        '/verify/:path*'
    ]
};

export async function middleware(request:NextRequest) {
    const token = await getToken({
        req : request
    });

    const url = request.nextUrl;

    // Redirecting to dashboard if the user is already authenticated and trying to access the signin, signup page. 
    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify')  ||
        url.pathname === '/'
    )) {
        return NextResponse.redirect(new URL ('/dashboard', request.url));
    }

    // Redirecting to signin page if user is not signed in and trying to access the dashboard
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL ('/sign-in', request.url));
    }

    return NextResponse.next();
}