"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class Role extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      role_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'role',
      timestamps: false,
      indexes: [{
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'role_id'
        }]
      }, {
        name: 'role_id_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'role_id'
        }]
      }]
    });
    return Role;
  }

  static associate(models) {
    this.hasMany(models.UserRole, {
      foreignKey: 'role_id'
    });
  }

}

var _default = (sequelize, DataTypes) => Role.init(sequelize, DataTypes);

module.exports = _default;
