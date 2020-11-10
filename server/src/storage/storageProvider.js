const { Sequelize } = require("sequelize");

function StorageProvider() {
  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    return false;
  }

  async function storeEchoMessage(echoMessage) {
    const EchoMessageModel = sequelize.models.EchoMessage;

    let echoMessageForStorage = {
      ...echoMessage,
      requestIps: echoMessage.requestIps.join(","),
      requestQuery: JSON.stringify(echoMessage.requestQuery),
      body: JSON.stringify(echoMessage.body),
      headers: JSON.stringify(echoMessage.headers),
    };

    const txn = await sequelize.transaction();
    try {
      const echoMessageModel = await EchoMessageModel.create(
        echoMessageForStorage,
        { transaction: txn }
      );

      await txn.commit();
    } catch (error) {
      console.log(error);
      await txn.rollback();
    }
  }

  function connect() {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "db.sqlite",
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });

    require("./models").syncDb(sequelize);

    return sequelize;
  }

  return {
    connect: connect,
    testConnection: testConnection,
    storeEchoMessage: storeEchoMessage,
  };
}

module.exports = StorageProvider;
