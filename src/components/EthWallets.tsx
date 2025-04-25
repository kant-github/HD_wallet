import { useState, useEffect } from "react";
import { EthWallet } from "../hooks/useGenerateWallet";
import { Eye, EyeOff } from "lucide-react";

interface EthWalletsProps {
    ethWallets: EthWallet[];
}

export default function EthWallets({ ethWallets }: EthWalletsProps) {
    const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);

    // Sync the visibility array when the ethWallets change
    useEffect(() => {
        setVisiblePrivateKeys(Array(ethWallets.length).fill(false));
    }, [ethWallets]);

    const togglePrivateKeyVisibility = (index: number) => {
        setVisiblePrivateKeys((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    if (ethWallets.length === 0) return null;

    return (
        <div className="mt-8 space-y-4">

            {ethWallets.map((wallet, index) => (
                <div
                    key={index}
                    className="border border-neutral-700 rounded-xl p-4 bg-neutral-900 text-white shadow-sm"
                >
                    <div className="mb-2 text-sm text-neutral-400">Wallet #{index + 1}</div>

                    <div className="mb-2">
                        <div className="text-sm text-neutral-300">Address</div>
                        <div className="break-all font-mono">{wallet.address}</div>
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
