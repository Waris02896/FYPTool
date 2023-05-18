module.exports = (sequlize, DataTypes) => {
    const Projects = sequlize.define("projects", {
        project_id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg : "Project Id is not provided"
                }
            }
        },
        user_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            // references: {
            //     model: 'users',
            //     key: 'user_id'
            // },
            validate:{
                notNull: {
                    msg: "User Id cannot be null"
                }
            }
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate:{
                notNull:{
                    msg: "Project name is not provided"
                }
            }
        },
        description:{
            type: DataTypes.STRING(),
            allowNull: true
        },
        type:{
            type:DataTypes.STRING(100),

        }
    });
    return Projects
}