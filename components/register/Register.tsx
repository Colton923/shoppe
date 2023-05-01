'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import styles from './Register.module.scss'
import { useLocalContext } from '@components/context/LocalContext'

export interface FormData {
  businessName: string
  address: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const { isLoginOverlay, setIsLoginOverlay, setIsRegisterOverlay } =
    useLocalContext()

  const onSubmit = async (data: FormData) => {
    if (!data || !data.businessName || !data.email)
      return alert('Missing Required Fields')
    await fetch('/api/post/firebase/newRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert('Registration Successful')
      } else {
        alert('Registration Failed')
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create an Account</h1>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Business Name"
            {...register('businessName')}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Address"
            {...register('address')}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Phone Number"
            {...register('phoneNumber')}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={styles.input}
          />
          <p className={styles.authLink}>
            Already have an account?&nbsp;
            <input
              type="button"
              value="Login"
              onClick={() => {
                setIsLoginOverlay(!isLoginOverlay)
                setIsRegisterOverlay(false)
              }}
            />
          </p>
          <button type="submit" className={styles.btn}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
