module.exports = (sequelize, DataTypes) => {
  const RecurringTask = sequelize.define("recurringTask", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cronExpression: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return RecurringTask;
};
