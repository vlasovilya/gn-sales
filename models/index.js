"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Config = require('../config.json');

const basename = _path.default.basename(__filename);
const env = process.env.NODE_ENV || 'DEV';
const config = Config.db;
const db = {};
const sequelize = new _sequelize.default(config.database, config.username, config.password, config);

const models = [];

_fs.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  models.push(file); // eslint-disable-next-line global-require

  const model = require(_path.default.join(__dirname, file))(sequelize, _sequelize.default.DataTypes);

  db[model.name] = model;
});

const cacheObj = {//User: { ttl: 1 },
};
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  cacheObj[modelName] = {};
}); //console.log('cacheObj', cacheObj)

db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
db.Op = _sequelize.default.Op;
var _default = db;
//exports.default = _default;
module.exports = _default;
