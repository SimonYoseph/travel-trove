import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({

    providers: [
        CredentialsProvider({
            session: {
                strategy: "jwt",
            },
            credentials: {
                email: { },
                password: { }
            },
            async authorize(credentials, req) {

                const response = await sql`
                    SELECT * FROM users WHERE email = ${credentials?.email}`;
                    const user = response.rows[0];

                    const passwordValid = await compare(
                        credentials?.password || "", 
                        user.password);

                    if (passwordValid) {
                        return {
                            id: user.id,
                            email: user?.email };
                    }
                return null;
            }
        })
    ]
});

export {handler as GET, handler as POST};