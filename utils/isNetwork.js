export default isNetwork = (n) => {
    if (n === 'none' || n === 'unknown' || n === 'undefined') {
        return false;
    }
    return true;
}