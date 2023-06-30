'use client'

import { useForm } from 'react-hook-form'
import styles from './Register.module.scss'
import { RegisterForm } from '../../../types/RegisterForm'
import Link from 'next/link'

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>()

  const onSubmit = async (data: RegisterForm) => {
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
          <Link className={styles.authWrapper} href={'/login'}>
            <p className={styles.authLink}>Already have an account? </p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Register
