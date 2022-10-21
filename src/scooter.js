class Scooter{
  constructor(station, user) {
    this.station = station;
    this.user = user;
    this.serial = parseInt(Math.random() * 1000);
    this.charge = parseInt(Math.random() * 100);
    this.range = parseInt(this.charge/100 * 32);
    this.isBroken = false;
    this.docked = true;
  }

  rent() {
    if (this.user.age < 18) throw new Error('You must have 18 years old to rent a scooter.');
    if (this.isBroken) throw new Error('Scooter is broken, please send a repair request.');
    // if (this.charge <= 20) throw new Error('Scooter low on battery, please charge.');
    if (this.charge < 100) throw new Error('Scooter is not fully charged.');

    this.docked = false;
    return 'Enjoy the ride!';
  }

  dock(newStation) {
    if (!newStation) throw new Error('Docking station required!');

    this.docked = true;
    this.station = newStation;
    this.user = '';
    return 'Scooter has been docked successfully.';
  }

  async recharge() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.charge = 100;
    this.range = 32;

    return 'Scooter has been charged successfully.';
  }

  async requestRepair() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.isBroken = false;

    return 'Scooter has been repaired successfully.';
  }
}


module.exports = Scooter;
