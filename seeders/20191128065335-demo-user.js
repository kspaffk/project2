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
        firstName: 'Happy',
        lastName: 'Gilmore',
        email: 'happygilmore@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Shooter',
        lastName: 'McGavin',
        email: 'shootermcgavin@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Virginia',
        lastName: 'Venit',
        email: 'virginiavenit@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
