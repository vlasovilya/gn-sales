"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class UserWorksheet extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      worksheet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      sequelize,
      tableName: 'user_worksheet_mapping',
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
    return UserWorksheet;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    this.belongsTo(models.Worksheet, {
      foreignKey: 'worksheet_id'
    });
  }

}

var _default = (sequelize, DataTypes) => UserWorksheet.init(sequelize, DataTypes);

module.exports = _default;
