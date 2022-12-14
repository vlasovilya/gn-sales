"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class File extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      originalname: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mime: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      s3_filename: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      s3_url: {
        type: DataTypes.STRING(511),
        allowNull: true
      },
      s3_bucket: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'file',
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'id'
        }]
      }]
    });
    return File;
  }

  static associate(models) {}

}

var _default = (sequelize, DataTypes) => File.init(sequelize, DataTypes);

module.exports = _default;
