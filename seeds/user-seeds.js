const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "Bond",
    password: "thepassword",
  },
  {
    username: "Bobofet",
    password: "thepassword",
  },
  {
    username: "Darthmal",
    password: "thepassword",
  },
  {
    username: "Frosty",
    password: "thepassword",
  },
  {
    username: "Uranus",
    password: "thepassword",
  },
  {
    username: "Qanon",
    password: "thepassword",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
