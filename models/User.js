"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class User extends _sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      old_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      school: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      school_district: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      state: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      grade: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      subject: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      created_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      token: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      hear_about_us: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      transportation_access: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      switch_to_guest_access_on: {
        type: DataTypes.DATE,
        allowNull: true
      },
      oauth_client: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      oauth_client_id: {
        type: DataTypes.STRING(256),
        allowNull: true
      },
      is_bookmark_on: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      last_visited_page: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      gdrive_folder_id: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [{
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{
          name: 'user_id'
        }]
      }]
    });
    return User;
  }

  static associate(models) {
    this.hasMany(models.UserRole, {
      foreignKey: 'user_id'
    });
  }

}

var _default = (sequelize, DataTypes) => User.init(sequelize, DataTypes);

module.exports = _default;
