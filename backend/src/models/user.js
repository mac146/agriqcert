module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user",{

        name: {
            type:DataTypes.STRING,
            allowNull:false
        },

        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },

        password: {
            type:DataTypes.STRING,
            allowNull:false
        },

        phone:{
            type:DataTypes.STRING,
        },

        companyName:{
            type:DataTypes.STRING,
        },

        role:{
            type: DataTypes.ENUM("exporter", "importer", "qa"),
            allowNull: false
        }
    });

    return User;
};