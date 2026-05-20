/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // গুগলের মেইন প্রোফাইল পিকচার ডোমেইন
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com', // সেফটি হিসেবে গুগলের সেকেন্ডারি ডোমেইন
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
