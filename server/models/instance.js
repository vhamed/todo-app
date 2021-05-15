module.exports = (sequelize, DataTypes) => {
  const Instance = sequelize.define("instance", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    doneAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toISOString()
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "paused", "completed"],
      allowNull: false,
      defaultValue: "pending"
    }
  });

  return Instance;
};
