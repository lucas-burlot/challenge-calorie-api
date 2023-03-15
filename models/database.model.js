const fs = require('fs');

class Database {
    constructor(filename) {
        this.filename = filename;
        this.data = [];
    }

    // Load data from file
    load() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8');
            this.data = JSON.parse(data);
        } catch (error) {
            this.data = [];
        }
    }

    // Save data to file
    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data));
    }

    // Find all items
    find(query) {
        return this.data.filter((item) => {
            let found = true;
            for (let key in query) {
                if (item[key] !== query[key]) {
                    found = false;
                }
            }
            return found;
        });
    }

    // Create a new item
    create(item) {
        this.data.push(item);
        this.save();
    }

    // Update an item
    update(id, newItem) {
        const index = this.data.findIndex((el) => el.id === id);
        if (index !== -1) {
            this.data[index] = {...this.data[index], ...newItem};
            this.save();
        }
    }

    // Delete an item
    delete(id) {
        this.data = this.data.filter((item) => item.id !== id);
        this.save();
    }
}

module.exports = Database;
