const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false, // to print log messages (sql queries) in console
    port: process.env.DB_PORT,
});

try {
    sequelize.authenticate();
    console.log("Connection established");
} catch (error) {
    console.log("Connection failed");
}


let defineQuery = (options) => {
    try {
        sequelize.define(
            options.table,
            options.model,
        )
        console.log("error")
    } catch (err) {
        return err
    }

};

let findAllQuery = async (options) => {
    console.log(options)
    try {
        // let data = await defineQuery(options).findAll();
        let data = await sequelize.define(


        ).findAll(options);
        return data;

    } catch (error) {
        console.log(error);
    }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.TaskCategories = require('../data/models/task/taskCategories')(sequelize, DataTypes);
db.Users = require('../data/models/Auth/users')(sequelize, DataTypes);

db.sequelize.sync({
    force: true
});

module.exports = {
    findAllQuery,
    db
}