module.exports = (sequlize, DataTypes) => {
    const Team = sequlize.define("team", {
        project_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Project Id cannot be null"
                }
            }
        },
        user_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                notNull: {
                    msg: "Project Id cannot be null"
                }
            }
        },
        rights:{
            type:DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull:{
                    msg: "Right are not provided to the user"
                }
            }
        }
    });
    return Team;
}

