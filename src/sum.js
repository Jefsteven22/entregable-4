// para sumar dos numeros

function sum(a, b) {
  // verificar que a y b sean numeros
  if (!a || !b) {
    return null;
  }
  if (typeof a !== "number" || typeof b !== "number") {
    return undefined;
  }
  // si alguno no es numero regreso un NaN

  return a + b;
}

module.exports = sum;
