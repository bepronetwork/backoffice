
function AddressConcat(string){
    return  `${string.substring(0, 6)}...${string.substring(string.length - 2)}`;
}

function compareIDS(id1, id2){
    return (new String(id1).toString().toLowerCase() == new String(id2).toString().toLowerCase());
}
export { AddressConcat, compareIDS }