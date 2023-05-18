module.exports = (sequlize, DataTypes) => {
    const Task = sequlize.define("tasks", {
        id: {
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "taskCategory_id is required"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "taskCategory_id is required"
                }
            }
        },
        process_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            // validate:{
            //     notNull:{
            //         msg: "taskCategory_icon is required"
            //     }
            // }
        }
    });
    return Task;
}