const { DataTypes } = require("sequelize");

// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize) => {
  sequelize.define(
    "Diets",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
