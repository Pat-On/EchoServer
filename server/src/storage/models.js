const { DataTypes } = require("sequelize");

function defineModels(sequelize) {
  var EchoMessage = sequelize.define("EchoMessage", {
    fullUrl: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    requestIps: DataTypes.STRING,
    method: DataTypes.STRING,
    requestQuery: DataTypes.STRING,
    body: DataTypes.STRING,
  });

  // 1-m relationship
  var Header = sequelize.define("Header", {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
  });

  EchoMessage.hasMany(Header, { as: "headers" });
}

function syncDb(sequelize) {
  defineModels(sequelize);
  (() => {
    sequelize.sync().then((res) => {
      console.log(res);
    });
  })();
}

module.exports.syncDb = syncDb;
