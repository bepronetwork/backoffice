import ERC20TokenContract from "../controllers/ERC20Contract";

async function enableMetamask(currency) {
    const { ethereum } = window;
  
    switch (currency) {
      case "eth": {
        await ethereum.enable();
        break;
      }
      default: {
        break;
      }
    }
}

async function getMetamaskAddress ()  {
    /* Enable Metamask Auth */
    await enableMetamask("eth");
    let accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}


async function getERC20Contract(tokenAddress){

    let erc20Contract = new ERC20TokenContract({
        contractAddress : tokenAddress
    })

    erc20Contract.__assert();

    return erc20Contract;
}
export { enableMetamask, getMetamaskAddress, getERC20Contract };