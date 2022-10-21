const Scooter = require('../src/scooter');
const User = require('../src/user');
const ScooterApp = require('../src/scooterApp');
const { scooterSessions } = require('../src/scooterApp');


describe('Test scooterApp class', () => {
  beforeEach(() => {
    app = new ScooterApp();
    user1 = new User('Lorena', 'pass', 30);
    user2 = new User('Pepe', 'pp', 45);
    scooter1 = new Scooter('Manhattan', 'Lorena');
    scooter2 = new Scooter('Manhattan', 'Pepe');
    scooter3 = new Scooter('Bronx', 'Lorena');
  });

  test('Check scooterApp object instance', () => {
    expect(app).toBeInstanceOf(ScooterApp);
  });

  test('Check properties when scooterApp instance is initialized.', () => {
    expect(app).toEqual(expect.objectContaining({
      stations: {
        'Manhattan': {},
        'Brooklyn': {},
        'Queens': {},
        'Bronx': {},
        'StatenIsland': {}
      },
      registeredUsers: {}
    }));

    ScooterApp.scooterSessions.forEach((session) => {
      expect(session).toBeInstanceOf(ScooterApp);
    });
  });

  test('Throw error if the user is alredy registered',() => {
    app.register(user1);
    expect(() => { app.register(user1); }).toThrow('already registered!');
  });

  test('Throw error if the user is younger than 17.', () => {
    user1.age = 15;
    expect(() => { app.register(user1); }).toThrow('too young to register!');
  });

  test('Test if the user has been registered successfully', () => {
    expect(app.register(user1)).toEqual('user has been registered');
    expect(app.registeredUsers).toHaveProperty(user1.username, {
      password: user1.password,
      age: user1.age,
      loggedIn: false,
      accountChange: 0
    });
  });

  test('Throw error when logging in if the user is not registered', () => {
    expect(() => { app.logIn('Lorena', 'pass'); }).toThrow('Username or password is incorrect');
  });

  test('Throw error when logging in if the password is iscorrect', () => {
    app.register(user1);
    expect(() => { app.logIn('Lorena', 'pp'); }).toThrow('Username or password is incorrect');
  });

  test('Throw error when logging in if the password is iscorrect', () => {
    app.register(user1);
    expect(app.logIn('Lorena', 'pass')).toEqual('User has logged in successfully.');
    expect(app.registeredUsers[user1.username].loggedIn).toBe(true);
  });

  test('Throw error when location or/and scooter is not added to the function', () => {
    expect(() => { app.addScooter('Manhattan'); }).toThrow('Enter location and scooter object');
    expect(() => { app.addScooter(scooter1); }).toThrow('Enter location and scooter object');
    expect(() => { app.addScooter(); }).toThrow('Enter location and scooter object');
  });


  test('Throw error when location is not valid', () => {
    expect(() => { app.addScooter('Spain', scooter1); }).toThrow('Invalid location');
  });

  test('Throw error if scooter is already added.', () => {
    app.addScooter('Manhattan',scooter1);
    expect(() => { app.addScooter('Manhattan', scooter1); }).toThrow('Scotter already added');
  });

  test('Check if the scooter has been added to the location successfully',() => {
    app.addScooter('Bronx',scooter1);
    expect(scooter1.station).toEqual('Bronx');
    expect(app.stations[scooter1.station]).toHaveProperty(`${scooter1.serial}`);
    expect(app.availableScooters).toHaveProperty(`${scooter1.serial}`, scooter1);
  });
  test('Throw error if the scooter is not located when removing a scooter', () => {
    expect(() => { app.removeScooter(scooter2); }).toThrow('Scooter serial is not located in Manhattan');
  });

  test('Remove a scooter', () => {
    app.addScooter('Bronx',scooter1);
    app.addScooter('Bronx',scooter2);
    app.removeScooter(scooter2);
    expect(app.stations[scooter2.station]).not.toHaveProperty(`${scooter2.serial}`);
    expect(app.availableScooters).not.toHaveProperty(`${scooter2.serial}`);
  });

  test('Set broken a scooter', () => {
    app.setBroken(scooter2);
    expect(scooter2.isBroken).toBe(true);
    expect(app.availableScooters).not.toHaveProperty(`${scooter2.serial}`);
    expect(app.scootersToRepair).toHaveProperty(`${scooter2.serial}`);
  });


});

// ScooterApp tests here

// register user

// log in

// add scooter

// remove scooter
