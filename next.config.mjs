/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'cdn.jsdelivr.net',
      'www.vectorlogo.zone',
      'www.kali.org',
      'portswigger.net',
      'nmap.org',
      'www.wireshark.org',
      'www.tenable.com',
      'upload.wikimedia.org',
      'www.openwall.com',
      'hashcat.net',
      'tools.kali.org',
      'cirt.net',
      'sqlmap.org',
      'www.maltego.com',
      'help.shodan.io',
      'www.zaproxy.org'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Optimize bundle
  experimental: {
    optimizeCss: true,
  },
  // Performance optimizations
  swcMinify: true,
}

export default nextConfig