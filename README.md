# CrowdCoin

A simple Ethereum crowd funding dApp inspired by Kickstarter and built with React.js. Users can create, view and contribute to crowd funding campaigns. The smart contract includes an approval system where contributors must approve payment requests before funds can be withdrawn.

This is an educational project that I built while completing Stephen Grider's Udemy course: [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide)

## Getting Started

These steps will get you up and running with a local installation. Some of the dependencies are way outdated as this was written ~6 months ago, so the current build will allow:
* creating new campaigns
* creating payment requests for your campaigns
* contributing to any campaign
* approving payment requests for campaigns you've contributed towards

Once I've updated the dependencies, I'll add instructions to compile and deploy your own smart contract.

### Prerequisites

You'll need [Node.js (npm or yarn)](https://www.npmjs.com/get-npm) installed to build the app.

You will also need MetaMask (Ether wallet) installed as a browser extension. MetaMask should be using the Rinkeby test network and have a bit of Ether split between two addresses.

Rinkeby Ether can be received from [this faucet](https://faucet.rinkeby.io/).

### Installing

After cloning the repo, cd into the directory and run the installer

Install (npm):
```
cd crowdcoin && npm install
```

Install (yarn):
```
cd crowdcoin && yarn install
```

Once installed, run the Next.js server with:

Run Next.js server (npm)
```
npm run dev
```

Run Next.js server (yarn)
```
yarn dev
```

Once your server is running, you should see a prompt in your terminal to visit localhost:3000 to see the application. You're all set! You should now be prompted to connect your MetaMask wallet. After which, you can view, contribute, approve payments and create your own campaigns!

## Running the tests

Automated tests can be run using:

(npm)
```
npm run test
```

or

(yarn)
```
yarn test
```

## Built With

* [React.js](https://reactjs.org/docs/getting-started.html) - The web framework used
* [Web3.js](https://web3js.readthedocs.io/en/v1.2.4/) - Connects to Ethereum network
* [Next.js](https://nextjs.org/docs) - Server side rendering and routing
* [Ganache-cli](https://github.com/trufflesuite/ganache-cli) - Ethereum development tools

## Contributing

Feel free to submit pull requests. This is an educational project and I can't guarantee regular updates, so it's probably best to fork the project and blaze your own trail forward :)

## Authors

* **Eric Breuers** - *Initial work* - [br3wb0n1k](https://github.com/br3wb0n1k)

See also the list of [contributors](https://github.com/br3wb0n1k/CrowdCoin/contributors) who participated in this project.

## License

This project is licensed under the DWYWPL License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Huge thanks to Stephen Grider for the in-depth course and inspirational project!
* Shout out to you, for making it here! Learn blockchain, it's refreshing and exciting :)

