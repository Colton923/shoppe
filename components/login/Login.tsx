'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import styles from './Login.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useEffect, useState } from 'react'
import { useFirebaseContext } from '@components/context/FirebaseContext'

interface FormData {
  email: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const { setIsLoginOverlay, isLoginOverlay } = useLocalContext()
  const { handleSignIn } = useFirebaseContext()
  const [localVisible, setLocalVisible] = useState<boolean>(false)
  const onSubmit = (data: FormData) => {
    data.email = data.email.toLowerCase()
    handleSignIn(data.email)
    setIsLoginOverlay(false)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const loginOverlay = document.getElementById('loginOverlay')
      const pageContentDiv = document.getElementById('pageContent')
      if (!loginOverlay) return
      if (!pageContentDiv) return
      if (isLoginOverlay) {
        if (e.target === pageContentDiv) {
          if (e.target !== loginOverlay) {
            setIsLoginOverlay(false)
          }
          if (e.target === document.getElementById('loginOverlay')) {
            setIsLoginOverlay(true)
          }
        }
      }
    }
    setLocalVisible(isLoginOverlay)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isLoginOverlay])

  return (
    <div className={styles.formWrapper} id={'loginOverlay'}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Login</h1>
        <input
          type="text"
          placeholder="Email"
          {...register('email')}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
