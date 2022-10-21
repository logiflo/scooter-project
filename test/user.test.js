const User = require('../src/user');

describe('Test user class', () => {
  const user1 = new User('Lorena', 'password', 30);

  test('Test username', () =>{
    expect(user1.username).toBe('Lorena');
  });

  test('Test user password', () =>{
    expect(user1.password).toBe('password');
  });

  test('Test user age', () =>{
    expect(user1.age).toBe(30);
  });
});
