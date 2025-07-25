function isAnagram(wordOne, wordTwo) {
    // Convertir ambas palabras a minúsculas para una comparación sin distinción de mayúsculas/minúsculas
    const lowerWordOne = wordOne.toLowerCase();
    const lowerWordTwo = wordTwo.toLowerCase();

    // Si las palabras son exactamente iguales (ignorando mayúsculas/minúsculas), no son anagramas
    // (un anagrama es una palabra formada reordenando las letras de otra palabra, no la misma palabra)
    if (lowerWordOne === lowerWordTwo) {
        return false;
    }

    // Convertir cada palabra en un array de caracteres, ordenar los arrays
    // y luego comparar si los arrays ordenados son iguales.
    // Si lo son, significa que tienen las mismas letras y por lo tanto son anagramas.
    const sortedWordOne = lowerWordOne.split('').sort().join('');
    const sortedWordTwo = lowerWordTwo.split('').sort().join('');

    return sortedWordOne === sortedWordTwo;
}