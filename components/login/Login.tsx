'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import styles from './Login.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useEffect } from 'react'
import { useFirebaseContext } from '@components/context/FirebaseContext'

interface FormData {
  email: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const { setIsLoginOverlay } = useLocalContext()
  const { handleSignIn } = useFirebaseContext()

  const onSubmit = (data: FormData) => {
    handleSignIn(data.email)
    setIsLoginOverlay(false)
  }

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.className === styles.wrapper) {
        setIsLoginOverlay(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
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
    </div>
  )
}

export default Login
