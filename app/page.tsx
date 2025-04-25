'use client'
import EthWallets from "@/src/components/EthWallets";
import Mnemonic from "@/src/components/Mnemonic";
import SolanaWallets from "@/src/components/SolanaWallets";
import { useGenerateWallet } from "@/src/hooks/useGenerateWallet";

export default function Home() {

  const { mnemonic, generateEthWallet, generateSolanaWallet, generateMnemonic, solanaWallets, ethWallets } = useGenerateWallet()
  console.log("mnemonic are : ", mnemonic);
  return (
    <div className="w-full h-screen p-6">
      {!mnemonic &&
        <div className="flex flex-col items-center justify-center mt-2">
          <button
            type="button"
            onClick={generateMnemonic}
            className="border border-neutral-800 rounded-md px-6 py-3 hover:bg-neutral-800 transition"
          >
            Generate Mnemonics
          </button>
          <div className="text-yellow-500 font-light text-sm text-center mt-6">
            Click the button to generate a mnemonic phrase
          </div>
        </div>
      }

      {mnemonic && (
        <div className="flex flex-col items-center justify-center mt-6 gap-6">
          <Mnemonic mnemonic={mnemonic} />

          <div className="flex gap-4">
            <button type="button" onClick={generateSolanaWallet} className="border border-blue-500 text-blue-500 rounded-md px-4 py-2 hover:bg-blue-50 transition">
              Generate Solana Wallet
            </button>

            <button type="button" onClick={generateEthWallet} className="border border-purple-500 text-purple-500 rounded-md px-4 py-2 hover:bg-purple-50 transition">
              Generate Ethereum Wallet
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 mx-40 gap-x-10">
        <SolanaWallets solanaWallets={solanaWallets} />
        <EthWallets ethWallets={ethWallets} />
      </div>
    </div>
  );
}