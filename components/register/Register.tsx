'use client'

import { useForm } from 'react-hook-form'
import styles from './Register.module.scss'
import { useLocalContext } from '@components/context/LocalContext'
import { useEffect } from 'react'

export interface FormData {
  businessName: string
  address: string
  email: string
  phoneNumber: string
  tin: string
}

const Register = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const { isLoginOverlay, setIsLoginOverlay, setIsRegisterOverlay } =
    useLocalContext()

  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.className === styles.wrapper) {
        setIsRegisterOverlay(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const onSubmit = async (data: FormData) => {
    if (
      !data ||
      !data.businessName ||
      !data.email ||
      !data.phoneNumber ||
      !data.address ||
      !data.tin
    )
      return alert('Missing Required Fields')

    data.email = data.email.toLowerCase()
    await fetch('/api/post/firebase/newRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData: data }),
    }).then((res) => {
      if (res.status === 200) {
        alert(
          'Registration Successful. Please come back and login after you have been approved.'
        )
        setIsRegisterOverlay(false)
        setIsLoginOverlay(true)
      } else {
        alert('Registration Failed')
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Create an Account</h1>
          <div className={styles.formInputsWrapper}>
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
              type="text"
              placeholder="TIN"
              {...register('tin')}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.btn}>
            Register
          </button>
          <div className={styles.authWrapper}>
            <p className={styles.authLink}>Already have an account? </p>
            <input
              type="button"
              value="Login"
              className={styles.loginBtn}
              onClick={() => {
                setIsLoginOverlay(!isLoginOverlay)
                setIsRegisterOverlay(false)
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
