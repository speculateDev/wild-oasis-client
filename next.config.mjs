/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // output: "export",
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "krihlnkxzmopshqaripr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
