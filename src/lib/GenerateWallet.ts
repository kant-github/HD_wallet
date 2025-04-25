import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";


export default class GenerateWallet {
    public currentSolanaWalletIndex: number = 0;
    public currentEthWalletIndex: number = 0;
    public mnemonics: string;

    constructor() {
        this.mnemonics = this.generateMnemonic();
    }

    public async generateSolanaWallet() {
        const path = `m/44'/501'/${this.currentSolanaWalletIndex}'/0'`;
        const seedBuffer = await this.mnemonicToSeed(this.mnemonics);
        const seedHex = Buffer.from(seedBuffer).toString('hex');
        const derivedSeed = derivePath(path, seedHex).key;
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const wallet = Keypair.fromSecretKey(keypair.secretKey);

        this.currentSolanaWalletIndex++;
        return {
            publicKey: wallet.publicKey.toString(),
            privateKey: Buffer.from(wallet.secretKey).toString('hex')
        };
    }

    public async generateEthWallet() {
        const fullPath = `m/44'/60'/0'/0/${this.currentEthWalletIndex}`;

        const seed = await this.mnemonicToSeed(this.mnemonics);
        const hdNode = HDNodeWallet.fromSeed(seed);
        const childNode = hdNode.derivePath(fullPath);
        const privateKey = childNode.privateKey;
        const wallet = new Wallet(privateKey);
        this.currentEthWalletIndex++;

        return {
            address: wallet.address,
            privateKey: wallet.privateKey
        };
    }

    public generateMnemonic(): string {
        return generateMnemonic();
    }

    private async mnemonicToSeed(mnemonic: string): Promise<Buffer> {
        return await mnemonicToSeed(mnemonic);
    }
}