import { AbstractPostStore } from "./AbstractPostStore.js";
import fs from 'fs/promises';

const DATA_LOCATION = './data/posts.json';

/**
 * Read JSON data from a file and convert to js array.
 * @returns {Promise<Array>} The posts array.
 */
async function readData() {
    let buff = await fs.readFile(DATA_LOCATION);
    let json = buff.toString();
    return JSON.parse(json);
}

/**
 * Store the post data to JSON file.
 * @param {Array} data The posts data.
 */
async function writeData(data) {
    let fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(DATA_LOCATION, fileContent);
}

let posts = await readData();

export class FSPostStore extends AbstractPostStore {
    _posts;

    constructor() {
        super();
        this._posts = posts;
    }

    async create(item) {
        item.id = Date.now().toString();
        this._posts.push(item);
        await writeData(this._posts);
        return item;
    }

    read(id) {
        let matches = this._posts.filter((post) => post.id === id);

        if (matches.length === 0) {
            throw new Error('No such id');
        }

        return matches[0];
    }

    async update(item) {
        let post = this.read(item.id);
        let index = this._posts.findIndex(p => p.id === post.id);

        this._posts[index] = item;
        await writeData(this._posts);
        return item;
    }

    async delete(id) {
        let index = this._posts.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('No such id');
        }

        this._posts.splice(index, 1);
        await writeData(this._posts);
        return id;
    }

    list(offset = 0, limit = 6) {
        let posts = structuredClone(this._posts).map((p) => {
            // let post = structuredClone(p);
            p.text = p.text.split(' ').slice(0, 5).join(' ');
            return p;
        });

        return {
            posts: posts.slice(offset, offset + limit),
            totalSize: posts.length
        };
    }
}
