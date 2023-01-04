// Esto sirve como una 'interfaz' para tu módulo y facilita los cambios futuros sin romper el contrato
// De lo contrario: Cambiar la estructura interna de los archivos o la firma puede romper la interfaz con los clientes.

module.exports.mongoDbConfig = require("./mongodb.config.js");
module.exports.mongoMigrationConfig = require("./mongo.migration.config.js.js");
