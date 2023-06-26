'use client'

import { useForm } from 'react-hook-form'
import styles from './Login.module.scss'
import { useFirebaseContext } from '@components/context/FirebaseContext'
import Link from 'next/link'
import type { LoginForm } from '../../../types/LoginForm'

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>()
  const { handleSignIn } = useFirebaseContext()

  const onSubmit = (data: LoginForm) => {
    data.email = data.email.toLowerCase()
    handleSignIn(data.email)
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Login</h2>
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
      <div className={styles.authWrapper}>
        <Link href="/register">
          <p className={styles.authLink}>Want a wholesaler account? </p>
        </Link>
      </div>
    </div>
  )
}

export default Login
