const sum = require("../sum");

test("La suma de 4 y 5 debe dar 9", () => {
  // Arrange
  const a = 5;
  const b = 4;
  // Act
  const result = sum(a, b);
  // Assert
  expect(result).toBe(9);
});

test("La suma de un string '10' y 15 debe dar undefined", () => {
  // Arrange
  const a = "10";
  const b = 15;
  //Act
  const result = sum(a, b);
  //Assert
  expect(result).toBeUndefined();
});

test("Si se manda uno o todos los parametros vacios deberia devolver null", () => {
  const a = null;
  const b = 7;

  const result = sum(a, b);
  expect(result).toBeNull();
});
