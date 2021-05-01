module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    finishTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "start", "pause", "done", "failed"],
      allowNull: false,
      defaultValue: "pending"
    }
  });

  return Task;
};
