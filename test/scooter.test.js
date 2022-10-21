const Scooter = require('../src/scooter');
const User = require('../src/user');



//typeof scooter === object
describe('Test scooter class', () => {
  const user1 = new User('Lorena', 'pass', 30);
  const scooter = new Scooter('Manhattan', user1);

  test('Check if scooter is a scooter instance', () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });

  test('Check properties a scooter instance', () => {
    expect(scooter).toEqual(expect.objectContaining({
      station: 'Manhattan',
      user: user1,
      serial: expect.any(Number),
      charge: expect.any(Number),
      range: expect.any(Number),
      isBroken: false,
      docked: true
    }));

    expect(scooter.serial).toBeGreaterThanOrEqual(1);
    expect(scooter.serial).toBeLessThanOrEqual(1000);
    expect(scooter.charge).toBeGreaterThanOrEqual(1);
    expect(scooter.charge).toBeLessThanOrEqual(100);
    expect(scooter.range).toBeGreaterThanOrEqual(0);
    expect(scooter.range).toBeLessThanOrEqual(32);
  });
});

//Method tests
describe('Test scooter methods', () => {
  describe('Test rent method', () => {
    beforeEach(() => {
      user1 = new User('Lorena', 'pass', 30);
      user2 = new User('Pepe', 'pass', 17);
      scooter = new Scooter('Manhattan', user1);
      scooter2 = new Scooter('Manhattan', user2);
    });

    test('Test if a scooter is successfully rented', () => {
      scooter.charge = 100;
      expect(scooter.rent()).toEqual('Enjoy the ride!');
      expect(scooter.docked).toBe(false);
    });

    // test('Test if the low battery error is thrown when scooter has low battery', () => {
    //   scooter.charge = 15;
    //   expect(() => { scooter.rent(); }).toThrow('Scooter low on battery, please charge.');
    //   expect(scooter.docked).toBe(true);
    // });

    test('Test if the battery is not fully charged', () => {
      scooter.charge = 15;
      expect(() => { scooter.rent(); }).toThrow('Scooter is not fully charged.');
      expect(scooter.docked).toBe(true);
    });

    test('Test if the low battery error is thrown when scooter has low battery', () => {
      scooter.isBroken = true;
      expect(() => { scooter.rent(); }).toThrow('Scooter is broken, please send a repair request.');
    });

    test('Test if error is thrown when user is younger than 18', () => {
      expect(() => { scooter2.rent(); }).toThrow('You must have 18 years old to rent a scooter.');
    });
  });

  describe('Test dock method', () => {
    beforeEach(() => {
      const user1 = new User('Lorena', 'pass', 30);
      scooter = new Scooter('Brooklyn', user1);
    });

    test('If no station is passed throw an error', () => {
      expect(() => { scooter.dock(); }).toThrow('Docking station required!');
    });

    test('Check if the scooter is docked', () => {
      expect(scooter.dock('Manhattan')).toEqual('Scooter has been docked successfully.');
      expect(scooter.station).toEqual('Manhattan');
      expect(scooter.docked).toBe(true);
    });
  });

  describe('Test recharge method', () => {
    const scooter = new Scooter('Brooklyn', 'Peter');

    test('Recharge is completed successfully', async () => {
      const response = await scooter.recharge();

      expect(response).toEqual('Scooter has been charged successfully.');
      expect(scooter.charge).toBe(100);
    });
  });

  describe('Test request repair method', () => {
    const scooter = new Scooter('Brooklyn', 'Peter');

    test('Repair is completed successfully', async () => {
      const response = await scooter.requestRepair();

      expect(response).toEqual('Scooter has been repaired successfully.');
      expect(scooter.isBroken).toBe(false);
    });
  });

});
