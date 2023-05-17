module.exports = (sequlize, DataTypes) => {
    const team = sequlize.define("processCard", {
        project_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'projects',
                key: 'project_id'
            },
            validate:{
                notNull: {
                    msg: "Project Id cannot be null"
                }
            }
        },
        User_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: 'projects',
                key: 'project_id'
            },
            validate:{
                notNull: {
                    msg: "Project Id cannot be null"
                }
            }
        }
    });
    return team;
}