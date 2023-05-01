'use client'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import styles from '../../styles/register.module.scss'

interface FormData {
  businessName: string
  address: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const Register: any = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const [authData, setAuthData] = useState({
    authRequests: 0,
    formData: {
      email: '',
    },
  })

  const onSubmit = async (formData: any) => {
    if (authData.authRequests < 20) {
      setAuthData({
        formData: formData,
        authRequests: authData.authRequests + 1,
      })
    } else {
      console.log('Error: Too many requests.')
    }
  }

  useEffect(() => {
    const email = authData.formData.email

    const actionCodeSettings = {
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'example.page.link',
    }

    sendSignInLinkToEmail(auth, 'email', actionCodeSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', email)
    })
  }, [authData.authRequests])

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
            <Link href="/login">Login</Link>
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