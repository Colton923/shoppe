'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import styles from './Login.module.scss'

interface FormData {
  email: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={styles.input}
          />
          <p className={styles.authLink}>
            Not a member yet?&nbsp;
            <Link href="/register"> Register</Link>
          </p>
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
