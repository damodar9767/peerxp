'use client'

import { SessionProvider } from 'next-auth/react'

export default function Authpovider({children}) {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}