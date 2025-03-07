import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'spu9x3zjmexofpkc.public.blob.vercel-storage.com',
				port: '',
			},
		],
	},
};

export default nextConfig;

