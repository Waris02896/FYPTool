module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define("users", {
        user_id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "user_id is required"
                }
            }
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                isAlpha: true,
                max: 15
            }
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                isAlpha: true,
                max: 15
            }
        },
        fullname:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                max: 40
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: true,
                isEmail: true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true
            }
        },
        verified:{
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        pic:{
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Users;
}