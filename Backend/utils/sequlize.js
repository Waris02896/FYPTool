const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: true, // to print log messages (sql queries) in console
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

db.TaskCategories = require('../data/models/task/taskCategories')(sequelize, DataTypes);
db.Users = require('../data/models/Auth/users')(sequelize, DataTypes);
db.Projects = require('../data/models/project/project')(sequelize, DataTypes);
db.ProcessCard = require('../data/models/project/process')(sequelize, DataTypes);
db.Team = require('../data/models/project/team')(sequelize, DataTypes);

//Relations
// db.Users.belongsToMany(
//     db.Projects,
//     {
//         through: "teams",
//         unique: false,
//         foreignKey:"user_id"
//     }
// );
// db.Projects.belongsToMany(
//     db.Users,
//     {
//         through: "teams",
//         unique: false,
//         foreignKey: "project_id"
//     }
// );

db.sequelize.sync({
    force: false
});

module.exports = {
    findAllQuery,
    db
}