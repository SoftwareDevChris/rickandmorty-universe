/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "rickandmortyapi.com",
      // "https://rickandmortyapi.com/api/character/avatar/",
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     domains: ["rickandmortyapi.com"],
//   },
// };
