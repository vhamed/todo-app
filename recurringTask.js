module.exports = (sequelize, DataTypes) => {
  const RecurringTask = sequelize.define("recurringTask", {
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
    cronExpression: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return RecurringTask;
};
