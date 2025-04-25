import { SolanaWallet } from "../hooks/useGenerateWallet"

interface SolanaWalletsProps {
    solanaWallets: SolanaWallet[]
}

export default function SolanaWallets({ solanaWallets }: SolanaWalletsProps) {
    return (
        <div>
            {
                solanaWallets.map((wallet, index) => (
                    <div className="flex gap-x-2" key={index}>
                        <span>{index + 1}. </span>
                        <div>{wallet.publicKey}</div>
                    </div>
                ))
            }
        </div>
    )
}