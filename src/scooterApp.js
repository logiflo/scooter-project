const User = require('./user');
const Scooter = require('./scooter');

class ScooterApp {
  static scooterSessions = [];

  constructor() {
    this.stations = {
      'Manhattan': {},
      'Brooklyn': {},
      'Queens': {},
      'Bronx': {},
      'StatenIsland': {}
    };
    this.registeredUsers = {};
    this.availableScooters = {};
    this.scootersToRepair = {};

    ScooterApp.scooterSessions.push(this);
  }

  isValidLocation(location) {
    const possibleLocations = [
      'Manhattan',
      'Brooklyn',
      'Queens',
      'Bronx',
      'StatenIsland'];

    return possibleLocations.includes(location);
  }

  register(user) {
    if (this.registeredUsers.hasOwnProperty(user.username)) throw new Error('already registered!');
    if (user.age < 17) throw new Error('too young to register!');

    this.registeredUsers[user.username] = {
      password: user.password,
      age: user.age,
      loggedIn: false,
      accountChange: 0
    };

    return 'user has been registered';
  }

  logIn(username, password) {
    if (!this.registeredUsers.hasOwnProperty(username) || this.registeredUsers[username].password != password) {
      throw new Error('Username or password is incorrect');
    }
    this.registeredUsers[username].loggedIn = true;
    return 'User has logged in successfully.';
  }

  addScooter(location, scooter) {
    if (!location || !scooter) throw new Error('Enter location and scooter object');
    if (!this.isValidLocation(location)) throw new Error('Invalid location');

    if (this.availableScooters.hasOwnProperty(scooter.serial)) throw new Error('Scotter already added');

    scooter.station = location;

    this.availableScooters[scooter.serial] = scooter;
    this.stations[location][scooter.serial] = {};
  }

  removeScooter(scooterToRemove) {
    if (!this.availableScooters.hasOwnProperty(scooterToRemove.serial)) {
      throw new Error(`Scooter serial is not located in ${scooterToRemove.station}`);
    }

    delete this.stations[scooterToRemove.station][scooterToRemove.serial];
    delete this.availableScooters[scooterToRemove.serial];
  }

  setBroken(scooterBroken) {
    scooterBroken.isBroken = true;
    delete this.availableScooters[scooterBroken.serial];
    this.scootersToRepair[scooterBroken.serial] = scooterBroken;
  }
}


// const app = new ScooterApp();
// const user1 = new User('Lorena', 'pass', 30);
// const user2 = new User('Pepe', 'pp', 45);
// const scooter1 = new Scooter('Manhattan', 'Lorena');
// const scooter2 = new Scooter('Manhattan', 'Pepe');
// const scooter3 = new Scooter('Bronx', 'Lorena');

// app.register(user1);
// app.register(user2);
// app.register(user1);
// app.logIn('Lorena', 'pass');
// app.addScooter('Bronx', scooter2);
// app.addScooter('Manhattan', scooter1);
// app.addScooter('Manhattan', scooter3);

// // console.log(app.registeredUsers);
// // console.log(app.stations['Bronx']);

// app.removeScooter(scooter2);

// // console.log(app.registeredUsers);
// // console.log(app.stations);

// const user3 = new User('Elias', 'eee', 22);
// app.register(user3);
//console.log(ScooterApp.scooterSessions[0].registeredUsers);


module.exports = ScooterApp;
