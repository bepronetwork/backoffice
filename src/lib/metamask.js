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


export { enableMetamask, getMetamaskAddress };