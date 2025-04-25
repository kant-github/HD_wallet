import { useState, useCallback } from "react";
import GenerateWallet from "../lib/GenerateWallet";

export type SolanaWallet = { publicKey: string; privateKey: string; index: number };
export type EthWallet = { address: string; privateKey: string; index: number };

export const useGenerateWallet = () => {
    const [walletInstance, setWalletInstance] = useState<GenerateWallet | null>(null);
    const [mnemonic, setMnemonic] = useState("");
    const [solanaWallets, setSolanaWallets] = useState<SolanaWallet[]>([]);
    const [ethWallets, setEthWallets] = useState<EthWallet[]>([]);

    const generateMnemonic = useCallback(() => {
        const instance = new GenerateWallet();
        setWalletInstance(instance);
        setMnemonic(instance.mnemonics);
        setSolanaWallets([]);
        setEthWallets([]);
    }, []);

    const generateSolanaWallet = useCallback(async () => {
        if (!walletInstance) {
            throw new Error("Mnemonic not generated yet.");
        }

        const wallet = await walletInstance.generateSolanaWallet();
        console.log("new solana wallet : ", wallet);
        setSolanaWallets((prev) => [
            ...prev,
            { ...wallet, index: walletInstance.currentSolanaWalletIndex - 1 },
        ]);
    }, [walletInstance]);

    const generateEthWallet = useCallback(async () => {
        if (!walletInstance) {
            throw new Error("Mnemonic not generated yet.");
        }

        const wallet = await walletInstance.generateEthWallet();
        setEthWallets((prev) => [
            ...prev,
            { ...wallet, index: walletInstance.currentEthWalletIndex - 1 },
        ]);
    }, [walletInstance]);

    return {
        mnemonic,
        solanaWallets,
        ethWallets,
        generateMnemonic,
        generateSolanaWallet,
        generateEthWallet,
    };
};
