import { EthWallet } from "../hooks/useGenerateWallet"

interface EthWalletsProps {
    ethWallets: EthWallet[]
}

export default function EthWallets({ ethWallets }: EthWalletsProps) {
    return (
        <div>
            {
                ethWallets.map((wallet, index) => (
                    <div className="flex gap-x-2" key={index}>
                        <span>{index + 1}. </span>
                        <div>{wallet.address}</div>
                    </div>
                ))
            }
        </div>
    )
}