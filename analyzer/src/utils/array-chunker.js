/**
 * 
 * @param { Array<T> } arr - array of items 
 * @param { number } n - max number of items per chunk
 * 
 * @returns { Array<Array<T>> } - Splits the array into smaller arrays, each with n elements.
 *                                If the number of alements is not divisible by 100, the last array contains the remaining elements.
 */
const splitIntoChunks = (arr, n) => {

    const groupsOfN = []

    while (arr.length) {
        groupsOfN.push(arr.splice(0, n))
    }

    return groupsOfN
}

module.exports = {
    splitIntoChunks
}