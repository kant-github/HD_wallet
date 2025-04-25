interface props {
    mnemonic: string
}


export default function Mnemonic({ mnemonic }: props) {
    console.log("mnemonic are : ", mnemonic);
    return (
        <>
            <div className="max-w-lg w-full p-6 border border-neutral-800 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Your Mnemonic Phrase:</h2>
                <div className="grid grid-cols-3 gap-3">
                    {mnemonic.split(" ").map((mnemonic, index) => (
                        <div key={index} className="p-2 border border-neutral-800 rounded bg-neutral-800 text-white text-center">
                            <span className="text-neutral-300 mr-1">{index + 1}.</span>{mnemonic}
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-sm text-red-600 font-medium">
                    Important: Never share your mnemonic phrase with anyone!
                </p>
            </div>
        </>
    )
}