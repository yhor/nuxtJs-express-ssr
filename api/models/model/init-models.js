var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _documents = require("./documents");
var _files = require("./files");
var _member = require("./member");
var _member_group = require("./member_group");
var _member_group_roles = require("./member_group_roles");
var _member_roles = require("./member_roles");
var _menus = require("./menus");
var _modules = require("./modules");
var _popupbanner = require("./popupbanner");
var _role = require("./role");
var _trash = require("./trash");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var documents = _documents(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var member_group = _member_group(sequelize, DataTypes);
  var member_group_roles = _member_group_roles(sequelize, DataTypes);
  var member_roles = _member_roles(sequelize, DataTypes);
  var menus = _menus(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var popupbanner = _popupbanner(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var trash = _trash(sequelize, DataTypes);


  return {
    comments,
    documents,
    files,
    member,
    member_group,
    member_group_roles,
    member_roles,
    menus,
    modules,
    popupbanner,
    role,
    trash,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
