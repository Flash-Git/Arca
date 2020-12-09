# Arca - The Ethereum Trading Platform

Ethereum ÐApp ~~live~~ **UNDER MAINTENANCE** on the Rinkeby and Goerli testnets at [etharca.com.](https://etharca.com)

Arca lets anyone open a trading box with any other Ethereum address and safely atomically trade multiple different tokens at a time directly from your wallet.
Currently supports both ERC20 and ERC721 tokens.

## Ongoing Development

This was written as my first React project and hooks had not even been fully released yet.
In response to this, a full rewrite of the front end is ongoing at my discretion.

- Arca's front end is being [rewritten](https://github.com/Flash-Git/Arca/tree/hooks). (400+ Commits)
- Arca's contract is being rewritten to support meta transactions following the Gas Station Network Alliance specification

## Usage Instructions

Find someone you want to trade tokens following the ERC20 or ERC721 standards with.

- Add your address and theirs as inputs

- Add the contract address and balance/id of a token you want to trade and repeat this until you have added them all

- Approve the trade once both you and your trade partner are satisfied with the outcome

The swap will happen atomically.

## Developer Instructions

Download the source code from the git repository:

```bash
git clone git@github.com:Flash-Git/Arca.git
```

Navigate to the root of the project and install the dependencies for both the client and server:

```bash
cd Arca
yarn devInstall
```

Start both the client and server:

```bash
yarn dev
```

Open your browser and navigate to your local address on port 3000:

<http://localhost:3000/>

To interact with the Ethereum Blockchain you will need to inject a Web3 Provider into the page. This is most often done with [Metamask](https://metamask.io/download.html).

## Contributing

Pull requests are welcome. Please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
