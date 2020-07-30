'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'registrations',
      'canceled_at',
      {
        type: Sequelize.DATE,
      }, 
    )
    
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('registrations', 'canceled_at');
  },
  
};
