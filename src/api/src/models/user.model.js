const pool = require('../databases/mysql.db');

class User {
  constructor(city, id, name, address, kub, deltakub) {
    this._city = city;
    this._id = id;
    this._name = name;
    this._address = address;
    this._kub = kub;
    this._deltakub = deltakub;
  }

  get city() {
    return this._city;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (!name) throw new Error('Invalid username value.');

    name = name.trim();
    if (name === '') throw new Error('Invalid username value.');

    this._name = name;
  }

  get address() {
    return this._address;
  }

  set address(address) {
    if (!address) throw new Error('Invalid address.');

    address = address.trim();
    if (address === '') throw new Error('Invalid address.');

    this._address = address;
  }

  get kub() {
    return this._kub;
  }

  set kub(kub) {
    if (kub < 0 || this._kub > kub) throw new Error('Invalid kub value.');
    this._deltakub = kub - this._kub;
    //if (this._deltakub >= 70) throw new Error('Are you sure you entered the correct meter reading?');
    this._kub = kub;
    if (isNaN(this._deltakub)) this._deltakub = 0;
  }

  get deltakub() {
    return this._deltakub;
  }

  async save() {
    const sql = `INSERT INTO workdb.${this._city} (IDF, ФИО, Адрес, 'Показания в кубах', 'Разница за прошлый месяц') VALUES (?, ?, ?, ?, ?)`;
    const params = [this._id, this._name, this._address, this._kub, this._deltakub];
    await pool.execute(sql, params);
  }

static async find(city, address, name) {
  const sql = `SELECT * FROM ${city} WHERE \`Адрес\` LIKE :address AND \`ФИО\` LIKE :name`;
  console.log("Привет ты дошёл до сюда");
  console.log(sql);
  const params = { city, address: `%${address}%`, name: `%${name}%` };
  const [rows, fields] = await pool.promise().execute(sql, params);
  console.log(rows);
  console.log("ПОЛЕ ВЫВОДА ЗАПРОСА: ", rows, fields);
  return [rows, fields];
}
      
      
//в коде ниже нужны исправления в запросах, не забудь их поправить. options я бы вообще убрал, зачем он тут?
    static async findByIdAndUpdate(city, name, address, options) {
        const sql = `UPDATE workdb.${city} SET \`ФИО\` = ?, \`Показания в кубах\` = ?, \`Адрес\` = ? WHERE \`Адрес\` = ? AND \`ФИО\` = ?`;
        const params = [options.name, options.kub, options.address, name, address];
        await pool.promise().execute(sql, params);
    }
  
      

    static async findByIdAndDelete(city, name, address) {
        const sql = `DELETE FROM workdb.${city} WHERE \`ФИО\` = ? AND \`Адрес\` = ?`;
        const params = [name, address];
        await pool.execute(sql, params);
    }
}

module.exports = User;
