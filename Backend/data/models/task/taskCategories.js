module.exports = (sequlize, DataTypes) =>{
    const taskCategories = sequlize.define("taskCategories", {
        taskCategory_id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate:{
                notNull:{
                    msg: "taskCategory_id is required"
                }
            }
        },
        taskCategory_name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull:{
                    msg: "taskCategory_id is required"
                }
            }
        },
        taskCategory_icon:{
            type: DataTypes.STRING,
            // allowNull: false,
            // validate:{
            //     notNull:{
            //         msg: "taskCategory_icon is required"
            //     }
            // }
        },
        taskCategory_color:{
            type: DataTypes.STRING,
            // allowNull: false,
            // validate:{
            //     notNull:{
            //         msg: "taskCategory_color is required"
            //     }
            // }
        }
    });
    return taskCategories;
}