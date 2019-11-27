'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [{
        roleName: 'Admin',
        description: 'Administrator of site'
      }, {
        roleName: 'Manager',
        description: 'Manager of inventory'
      }, {
        roleName: 'User',
        description: 'A typical employee'
      }, {
        roleName: 'Warehouse',
        description: 'Works in the warehouse'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
  }
};
