'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Statuses', [{
        statusName: 'Assigned'
      }, {
        statusName: 'Unassigned'
      }, {
        statusName: 'Retired'
      }, {
        statusName: 'Lost/Stolen'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Statuses', null, {});
  }
};
