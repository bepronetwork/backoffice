
function AddressConcat(string){
    return  `${string.substring(0, 6)}...${string.substring(string.length - 2)}`;
}


export { AddressConcat }