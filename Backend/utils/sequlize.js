const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
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
            

        ).findAll();
        return data;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    findAllQuery
}