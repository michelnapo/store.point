# Store.point

## Installing and running
### Install pointnetwork, point-contracts and pointsdk
IMPORTANT: save all repositories on the same directory (same level).
#### Clone the store.point, pointnetwork, point-contracts and pointsdk repositories:
```console
$ git clone https://github.com/michelnapo/store.point.git
$ git clone https://github.com/pointnetwork/pointnetwork.git
$ git clone https://github.com/pointnetwork/point-contracts.git
$ git clone https://github.com/pointnetwork/pointsdk.git
```
#### Install dependencies:
First, go to the pointnetwork directory and open two terminals there, then on the first terminal:
```console
$ point-dev-install
```
#### Compile contracts:
Open a new terminal, go to the store.point folder and do the following (this command is only needed to be ran once):
```console
$ npm i && npm run build
$ cd ./hardhat
$ npx hardhat compile
$ cp ./contracts/* ../contracts/
$ cp ./contracts/* ../../pointnetwork/hardhat/contracts/
$ cp ./contracts/* ../../point-contracts/contracts/
```
### Start and run the development environment blockchain:
Open a new terminal on pointnetwork and run the following:
```console
$ source .bash_alias
$ point-dev-start
```
Open another terminal on pointnetwork and run the following:
```console
$ source .bash_alias
$ point-dev
```
### Deploy store.point contracts on the development environment:
Open another terminal on pointnetwork and run the following:
```console
$ source .bash_alias
$ point-deploy ../store.point --contracts
```

### Run the app
Open one last terminal on pointnetwork and run the following:
```console
$ source .bash_alias
$ cd ../pointsdk
$ point-browser-owner
```
After the last command, press R on that terminal to reload the browser, then you should be running the store.point zapp on point browser (firefox).

## Stop the development environment:
Open a terminal on pointnetwork
```console
$ source .bash_alias
$ point-dev-stop
```

## Scenarios
- If you change at leat one store.point smart contract, you will need to recompile and redeploy them
- If you already have everything installed, you only need to start, run the development environment blockchain, redeploy the contracts and run the app.
