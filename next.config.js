/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  axios: {
    proxy: true
  },
  proxy: {
    'https://api.chefkoch.de/v2/recipes': {
      target: 'https://www.chefkoch.de/rezepte/',
    }
}
}

module.exports = nextConfig
