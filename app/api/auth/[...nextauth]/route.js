import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";



const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId :process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            type:'credentials',
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials, req) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)

            //   const res = await fetch("/your/endpoint", {
            //     method: 'POST',
            //     body: JSON.stringify(credentials),
            //     headers: { "Content-Type": "application/json" }
            //   })
            //   const user = await res.json()
        
              // If no error and we have user data, return it

              const {email, password} = credentials
              
              if (email == 'jhon@gmail.com' && password =='1234') {
                return {id:'1234',name: 'Jhon', email:'jsmith@gmail.com'}
              }
              // Return null if user data could not be retrieved
              return null
            }
          }),

    ],

    callbacks:{

        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
    
            return session;
            
    
        },
    
        async signIn({profile}) {
    
            try {
                await connectToDB();
                //check if user already exits
                const userExist = await User.findOne({email: profile.email});
    
                // if not, create a new user
                if(!userExist) {
                    await User.create({
                        email:profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true;
                
            } catch (error) {
                console.log(error)
                return false;
                
            }
    
        }
    }
})

export {handler as GET , handler as POST}

// 1:30