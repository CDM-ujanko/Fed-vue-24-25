export class AbstractPostStore {
    create(item) {
        throw new Error('Create is not implemented');
    }

    read(id) {
        throw new Error('Read is not implemented');
    }

    update(item) {
        throw new Error('Update is not implemented');
    }

    delete(id) {
        throw new Error('Delete is not implemented');
    }

    list(offset, limit) {
        throw new Error('List is not implemented');
    }
}