module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
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

  return Task;
};
