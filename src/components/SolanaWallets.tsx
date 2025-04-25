import { useState, useEffect } from "react";
import { SolanaWallet } from "../hooks/useGenerateWallet";
import { Eye, EyeOff } from "lucide-react";

interface SolanaWalletsProps {
    solanaWallets: SolanaWallet[];
}

export default function SolanaWallets({ solanaWallets }: SolanaWalletsProps) {
    const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);

    // Update visibility array when wallets change
    useEffect(() => {
        setVisiblePrivateKeys(Array(solanaWallets.length).fill(false));
    }, [solanaWallets]);

    const togglePrivateKeyVisibility = (index: number) => {
        setVisiblePrivateKeys((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    if (solanaWallets.length === 0) return null;

    return (
        <div className="mt-8 space-y-4 w-full px-2 sm:px-0">
            {solanaWallets.map((wallet, index) => (
                <div
                    key={index}
                    className="border border-neutral-700 rounded-xl p-4 bg-neutral-900 text-white shadow-sm"
                >
                    <div className="mb-2 text-sm text-neutral-400">Solana Wallet #{index + 1}</div>

                    <div className="mb-2">
                        <div className="text-sm text-neutral-300">Public Key</div>
                        <div className="break-all font-mono">{wallet.publicKey}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-neutral-300">Private Key</div>
                            <div className="break-all font-mono">
                                {visiblePrivateKeys[index]
                                    ? wallet.privateKey
                                    : "••••••••••••••••••••••••••••••••••"}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => togglePrivateKeyVisibility(index)}
                            className="ml-4 text-neutral-400 hover:text-white transition"
                            aria-label="Toggle private key visibility"
                        >
                            {visiblePrivateKeys[index] ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
