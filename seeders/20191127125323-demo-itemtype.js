'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ItemTypes', [{
        itemType: 'Computer'
      }, {
        itemType: 'Keyboard'
      }, {
        itemType: 'Mouse'
      }, {
        itemType: 'Backpack'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ItemTypes', null, {});
  }
};
