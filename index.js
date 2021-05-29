const { Plugin } = require("powercord/entities");

module.exports = class PowerDj extends Plugin {
  async startPlugin() {
    window.player = require("./player");
  }
  async pluginWillUnload() {}
};
