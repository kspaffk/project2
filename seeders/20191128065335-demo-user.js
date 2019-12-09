'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Bob',
        lastName: 'Barker',
        email: 'bobbarker@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Adam',
        lastName: 'Sandler',
        email: 'adamsand@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'George',
        lastName: 'Carlin',
        email: 'georgecarlin@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Crap',
        lastName: 'Bag',
        email: 'crapbag@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
