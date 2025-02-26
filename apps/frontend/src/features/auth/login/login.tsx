'use client'

import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

import AntButton from '@/components/ui/button'
import AntInput from '@/components/ui/input/input'
import AntPasswordInput from '@/components/ui/input/input-password'
import { LoginFormType } from '@/features/types/user.types'

const loginSchema = z.object({
  username: z.string().min(6, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })
    if (res?.error) {
      toast.error(res.error)
    } else {
      router.push('/')
    }
    setIsLoading(false)
  }
  return (
    <div className="bg-white p-6 py-12  rounded-md w-[500px] text-black">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <AntInput
              placeholder="Username"
              size="large"
              prefix={<UserOutlined />}
              {...field}
            />
          )}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <AntPasswordInput
              placeholder="Password"
              size="large"
              prefix={<LockOutlined />}
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <AntButton
          disabled={isLoading}
          htmlType="submit"
          size="large"
          className="bg-gradient-to-tr from-sky-500 to-purple-500 font-semibold text-white !duration-200 hover:!bg-gradient-to-tr hover:!from-sky-600 hover:!to-purple-600 hover:!text-white "
        >
          Sign In
        </AntButton>
      </form>
      <hr className="my-6" />
      <AntButton
        onClick={() => signIn('google')}
        className="w-full"
        size="large"
      >
        <GoogleOutlined /> Google
      </AntButton>
      <Link href={'/auth/register'}>
        <AntButton htmlType="button" className="w-full mt-6" size="large">
          Sign up
        </AntButton>
      </Link>
    </div>
  )
}

export default Login
