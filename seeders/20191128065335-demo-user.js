'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@gmail.com',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Adam',
        lastName: 'Sandler',
        email: 'adamsand@gmail.com',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'George',
        lastName: 'Carlin',
        email: 'georgecarlin@gmail.com',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Crap',
        lastName: 'Bag',
        email: 'crapbag@gmail.com',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
