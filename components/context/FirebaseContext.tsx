'use client'

import { useMemo, memo, createContext, useContext, useState, useEffect } from 'react'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import { auth } from 'utils/firebaseClient'

interface Props {
  children: React.ReactNode
}

export interface FirebaseContextScope {
  handleSignIn: (email: string) => void
  loggedIn?: boolean
}

export const FirebaseContext = createContext<FirebaseContextScope | null>(null)

export const FirebaseContextProvider = (props: Props) => {
  const { children } = props
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn')

            setLoggedIn(true)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    if (auth.currentUser) setLoggedIn(true)
  }, [auth])

  const handleSignIn = async (email: string) => {
    await fetch('/api/post/firebase/isApproved', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(async (res) => {
      if (res.status === 200) {
        const actionCodeSettings = {
          url: 'https://main-st-shoppe.com',
          handleCodeInApp: true,
        }
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem('emailForSignIn', email)
            alert(
              'An email has been sent to you. Please click the link in the email to login.'
            )
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('You are not an approved wholesaler. Please wait for approval.')
      }
    })
  }

  const contextValue = useMemo<FirebaseContextScope | null>(
    () => ({
      handleSignIn,
      loggedIn,
    }),
    [handleSignIn, loggedIn]
  )

  return (
    <FirebaseContext.Provider value={contextValue as FirebaseContextScope}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default memo(FirebaseContextProvider)

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error(
      'useFirebaseContext must be used within a FirebaseContextProvider'
    )
  }
  return context
}
