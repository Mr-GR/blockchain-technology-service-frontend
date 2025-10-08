import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Certification NFT',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [polygon],
  ssr: true,
});
