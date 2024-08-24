/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "images.pexels.com"
      },
      {
        protocol: 'https',
        hostname: "media.istockphoto.com"
      },
      {
        protocol: 'https',
        hostname: "eu.schluter.com"
      },
      {
        protocol: 'https',
        hostname: "img.clerk.com"
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com"
      }
      // Here you can add another domain for the external images. 
    ]
  }
};

export default nextConfig;
