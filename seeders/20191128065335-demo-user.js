'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Bob',
        lastName: 'Barker',
        username: 'bobbarker',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Adam',
        lastName: 'Sandler',
        username: 'adamsand',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'George',
        lastName: 'Carlin',
        username: 'georgecarlin',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Crap',
        lastName: 'Bag',
        username: 'crapbag',
        password: 'youknowit',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
