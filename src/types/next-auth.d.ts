import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id ?: String;
        isVerifed ?: boolean;
        isAcceptingMessage : boolean;
        username ?: string;
    }

    interface Session {
        user : {
            _id ?: String;
            isVerifed ?: boolean;
            isAcceptingMessage : boolean;
            username ?: string;
        } & DefaultSession['user'];
    }
}