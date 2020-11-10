const { DataTypes } = require("sequelize");

function defineModels(sequelize) {
  var EchoMessage = sequelize.define("EchoMessage", {
    fullUrl: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    requestIps: DataTypes.STRING,
    method: DataTypes.STRING,
    requestQuery: DataTypes.STRING,
    body: DataTypes.STRING,
    headers: DataTypes.STRING,
  });
}

function syncDb(sequelize) {
  defineModels(sequelize);
  (() => {
    sequelize.sync({ alter: true }).then((res) => {
      console.log(res);
    });
  })();
}

module.exports.syncDb = syncDb;
