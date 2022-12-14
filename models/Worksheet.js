"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class Worksheet extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      worksheet_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      file_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING(256),
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true
      },
      google_drive_file_id: {
        type: DataTypes.STRING(256),
        allowNull: true
      },
      version_worksheet_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      worksheet_language_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      sequelize,
      tableName: 'worksheet',
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'worksheet_id'
        }]
      }, {
        name: 'worksheet_id_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'worksheet_id'
        }]
      }, {
        name: 'version_worksheet_id_idx',
        using: 'BTREE',
        fields: [{
          name: 'version_worksheet_id'
        }]
      }, {
        name: 'worksheet_language_id_idx',
        using: 'BTREE',
        fields: [{
          name: 'worksheet_language_id'
        }]
      }]
    });
    return Worksheet;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'file_id'
    });
  }
}

var _default = (sequelize, DataTypes) => Worksheet.init(sequelize, DataTypes);

module.exports = _default;
