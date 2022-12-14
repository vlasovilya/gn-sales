"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class UserRole extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_old_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'user_role',
      timestamps: false,
      indexes: [{
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'id'
        }]
      }]
    });
    return UserRole;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    this.belongsTo(models.Role, {
      foreignKey: 'role_id'
    });
  }

}

var _default = (sequelize, DataTypes) => UserRole.init(sequelize, DataTypes);

module.exports = _default;
