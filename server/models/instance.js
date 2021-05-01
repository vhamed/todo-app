module.exports = (sequelize, DataTypes) => {
  const Instance = sequelize.define("instance", {
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    finishTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    overdue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "start", "pause", "done", "failed"],
      allowNull: false,
      defaultValue: "pending"
    }
  });

  return Instance;
};
