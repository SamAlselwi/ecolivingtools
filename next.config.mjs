/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theretools.s3.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap', // This matches the dynamic route in the `app` directory
      },
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap', // This matches the dynamic route in the `app` directory
      },
    ];
  },
  async redirects() {
    return [
      // Redirect from old domain (non-www)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'theretools.com',
          },
        ],
        destination: 'https://www.ecolivingtools.com/:path*',
        permanent: true,
      },
      // Redirect from old domain (www)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.theretools.com',
          },
        ],
        destination: 'https://www.ecolivingtools.com/:path*',
        permanent: true,
      },
      // Redirect non-www version of new domain to www version
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ecolivingtools.com',
          },
        ],
        destination: 'https://www.ecolivingtools.com/:path*',
        permanent: true,
      },
      {
        source: '/10-best-smart-home-devices-for-eco-friendly-living-in-2024-an-ultimate-guide-to-living-sustainably',
        destination: '/10-best-smart-home-devices-for-eco-friendly-living', //Best Smart Home Devices for Eco Friendly Living
        permanent: true,
      },
      {
        source: '/smart-home-technology-for-beginners-your-2024-guide-to-a-connected-home',
        destination: '/smart-home-technology-beginners-guide-to-a-connected-home', //Smart Home Technology Beginners Guide to a Connected Home
        permanent: true,
      },
      {
        source: '/the-rise-of-eco-friendly-smart-appliances-in-2024-what-you-need-to-know',
        destination: '/rise-of-eco-friendly-smart-appliances-what-to-know',
        permanent: true,
      },
      {
        source: '/the-environmental-impact-of-smart-home-devices-in-2024-a-comprehensive-life-cycle-analysis',
        destination: '/environmental-impact-of-smart-home-devices-explained-clearly',
        permanent: true,
      },
      {
        source: '/smart-window-treatments-for-better-home-insulation-a-buyers-guide-2024',
        destination: '/modern-window-treatments-for-home-insulation',
        permanent: true,
      },
      {
        source: '/eco-friendly-dry-cleaners-2024s-green-garment-revolution',
        destination: '/eco-friendly-dry-cleaners-revolutionizing-green-garment-care',
        permanent: true,
      },
      {
        source: '/how-to-slash-your-carbon-footprint-with-smart-home-automation-in-2024',
        destination: '/how-to-reduce-carbon-footprint-using-smart-home-automation',
        permanent: true,
      },
      {
        source: '/energy-efficient-smart-lighting-showdown-2024-led-vs-cfl-vs-incandescent',
        destination: '/led-vs-cfl-vs-incandescent-your-efficient-lighting-guide',
        permanent: true,
      },
      {
        source: '/the-10-best-energy-efficient-smart-thermostats-for-eco-conscious-homeowners-in-2024',
        destination: '/top-10-energy-saving-smart-thermostats-for-your-home',
        permanent: true,
      },
      {
        source: '/the-ultimate-guide-to-smart-home-energy-monitoring-devices-in-2024',
        destination: '/top-smart-home-energy-monitoring-devices-ultimate-guide',
        permanent: true,
      },
      {
        source: '/smart-plugs-vs-smart-outlets-which-is-better-for-energy-savings-in-2024',
        destination: '/smart-plugs-vs-smart-outlets-which-one-saves-more-energy',
        permanent: true,
      },
      {
        source: '/top-5-water-saving-smart-shower-systems-for-2024-ultimate-reviews-and-comparisons',
        destination: '/best-water-saving-smart-shower-systems-top-5-picks',
        permanent: true,
      },
      {
        source: '/sustainable-smart-home-hubs-top-5-eco-friendly-options-for-2024',
        destination: '/sustainable-smart-home-hubs-top-5-eco-friendly-options',
        permanent: true,
      },
      {
        source: '/how-to-choose-the-perfect-smart-power-strip-for-energy-savings-in-2024',
        destination: '/smart-power-strips-maximize-home-energy-efficiency',
        permanent: true,
      },
      {
        source: '/7-budget-friendly-diy-smart-home-projects-for-energy-efficiency-in-2024',
        destination: '/7-diy-smart-home-projects-for-better-energy-efficiency',
        permanent: true,
      },
      {
        source: '/best-energy-star-smart-home-products-to-slash-your-bills-in-2024',
        destination: '/best-energy-star-smart-home-products-to-slash-your-bills',
        permanent: true,
      },
      {
        source: '/eco-friendly-thermostat-battle-nest-vs-ecobee-vs-honeywell',
        destination: '/nest-vs-ecobee-vs-honeywell-eco-friendly-thermostat-battle',
        permanent: true,
      },
      {
        source: '/6-reasons-to-switch-to-biodegradable-garbage-bags-in-2024',
        destination: '/reasons-to-switch-to-biodegradable-garbage-bags',
        permanent: true,
      },
      {
        source: '/home-energy-audit-boost-efficiency-and-cut-bills-in-2024',
        destination: '/home-energy-audit-tips-to-boost-efficiency',
        permanent: true,
      },
      {
        source: '/essential-green-computing-tools-for-2024-complete-guide',
        destination: '/essential-tools-for-green-computing-guide',
        permanent: true,
      },
      {
        source: '/13-smart-ways-to-save-energy-in-2024-home-and-wallet-tips',
        destination: '/smart-ways-to-save-energy-upgrade-home-wallet',
        permanent: true,
      },
      {
        source: '/the-10-best-smartwatches-for-fitness-fanatics-in-2024',
        destination: '/top-10-smartwatches-for-fitness-enthusiasts-and-athletes',
        permanent: true,
      },
      {
        source: '/how-to-choose-the-best-wearable-technology-in-2024',
        destination: '/how-to-choose-best-wearable-technology',
        permanent: true,
      },
      {
        source: '/wear-os-2024-best-features-apps-and-smartwatch-tips',
        destination: '/wear-os-best-features-apps-tips-guide',
        permanent: true,
      },
      {
        source: '/top-sleep-trackers-apple-watch-fitbit-garmin-and-more-in-2024',
        destination: '/top-sleep-trackers-apple-watch-fitbit-garmin',
        permanent: true,
      },
      {
        source: '/top-5-affordable-fitness-trackers-under-dollar100-in-2024',
        destination: '/best-affordable-fitness-trackers-under-100',
        permanent: true,
      },
      {
        source: '/the-ultimate-guide-to-bone-conduction-headphones-in-2024',
        destination: '/best-bone-conduction-headphones-guide',
        permanent: true,
      },
      {
        source: '/smart-clothing-in-2024-revolutionizing-fashion-with-technology',
        destination: '/smart-clothing-revolutionizing-fashion-technology',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
