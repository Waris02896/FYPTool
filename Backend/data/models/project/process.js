module.exports = (sequlize, DataTypes) => {
    const ProcessCard = sequlize.define("processCard", {
        process_id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Process Card Id cannot be null"
                }
            }
        },
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
        name:{
            type:DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Process Card name cannot be null"
                }
            }
        },
        priority:{
            type:DataTypes.INTEGER(20),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Priority cannot be null"
                }
            }
        },
    });
    return ProcessCard;
}