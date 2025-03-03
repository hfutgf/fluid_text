const nextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'ssl.gstatic.com'],
  },
}

export default nextConfig
