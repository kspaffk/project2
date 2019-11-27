'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Departments', [{
        name: 'Sales',
        description: 'A group that sales stuff'
      }, {
        name: 'HR',
        description: 'The people that control destiny'
      }, {
        name: 'Finance',
        description: 'Wanna get paid?'
      }, {
        name: 'IT',
        description: 'THE helpdesk'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Departments', null, {});
  }
};
