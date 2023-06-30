'use client'

import { useMemo, memo, createContext, useContext, useEffect } from 'react'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import { auth } from 'utils/firebaseClient'
import { useLocalContext } from './LocalContext'

interface Props {
  children: React.ReactNode
}

export interface FirebaseContextScope {
  handleSignIn: (email: string) => void
}

export const FirebaseContext = createContext<FirebaseContextScope | null>(null)

export const FirebaseContextProvider = (props: Props) => {
  const { children } = props
  const { setWholesaler } = useLocalContext()

  useEffect(() => {
    if (!auth) return
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn')

            setWholesaler(true)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    if (auth.currentUser) setWholesaler(true)
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
    }),
    [handleSignIn]
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
