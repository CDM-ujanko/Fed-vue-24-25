import { AbstractPostStore } from "./AbstractPostStore.js";
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect();

db.query(`CREATE TABLE IF NOT EXISTS users (
  \`id\` INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(2048) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  dateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (username)
)`);

export class MySqlUserStore {

    // async create(user) {
    //     return await new Promise((resolve, reject) => {
    //         bcrypt.hash(user.password, Number(process.env.USER_SLAT_ROUNDS), function (err, hash) {

    //             if (err) {
    //                 return reject(err);
    //             }

    //         db.query(`INSERT INTO users (username , password, firstName, lastName) VALUES(?, ?, ?, ?);`,
    //             [user.username, hash, user.firstName, user.lastName],
    //             (err, res) => {
    //                 if (err) {
    //                     return reject(err)
    //                 }

    //                 return resolve(res);
    //             })
    //         })
    //     })
    // }

    async create(user) {
        let hash = await bcrypt.hash(user.password, Number(process.env.USER_SLAT_ROUNDS))

        return await new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (username , password, firstName, lastName) VALUES(?, ?, ?, ?);`,
                [user.username, hash, user.firstName, user.lastName],
                (err, res) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(res);
                })
        })
    }

    read(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?;', username, (err, rows) => {
                if (err) {
                    return reject(err)
                }

                return resolve(rows[0]);
            })
        })
    }

    check(username, password) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?;', username, async (err, rows) => {
                if (err) {
                    return reject(err)
                }

                let match = await bcrypt.compare(password, rows[0].password)
                return resolve(match);
            })
        })
    }
}
