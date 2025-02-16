import { AbstractPostStore } from "./AbstractPostStore.js";
import mysql from 'mysql';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect();

db.query(`CREATE TABLE IF NOT EXISTS posts (
  \`id\` INTEGER PRIMARY KEY AUTO_INCREMENT,
  picture VARCHAR(2048) NOT NULL,
  title VARCHAR(255) NOT NULL,
  text VARCHAR(5000) NOT NULL,
  datePosted DATETIME NOT NULL
)`);

export class MySqlPostStore extends AbstractPostStore {
    constructor() {
        super();
    }

    async create(item) {
        return await new Promise((resolve, reject) => {
            // TODO: Fix date
            db.query(`INSERT INTO posts (picture , title, text, datePosted) VALUES(?, ?, ?, ?);`,
                [item.picture, item.title, item.text, "2020-01-01 15:10:10"],
                (err, res) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(res);
                })
        })
    }

    read(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts WHERE id = ?;', id, (err, rows) => {
                if (err) {
                    return reject(err)
                }

                return resolve(rows[0]);
            })
        })
    }

    async update(item) {
        return await new Promise((resolve, reject) => {
            // TODO: Fix date
            db.query(`UPDATE posts SET picture = ?, title = ?, text = ?, datePosted = ? WHERE id = ?;`,
                [item.picture, item.title, item.text, "2020-01-01 15:10:10", item.id],
                (err, res) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(res);
                })
        })
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM posts WHERE id = ?;', id, (err) => {
                if (err) {
                    return reject(err)
                }

                return resolve(id);
            })
        })
    }

    async list(start = 0, end = 6) {
        return await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(id) OVER () as totalSize, id, picture, title, text, datePosted FROM posts GROUP BY id LIMIT ? OFFSET ?;',
                [end - start, start],
                (err, rows) => {
                    if (err) {
                        return reject(err)
                    }

                    console.log(rows);

                    return resolve({
                        posts: rows,
                        totalSize: rows[0]?.totalSize ?? 0
                    })
                })
        })
    }
}
