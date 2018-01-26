module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8546,
      gas: 15000000,
      test_timeout: 300000,
      network_id: "*" // Match any network id
    }
  }
};
