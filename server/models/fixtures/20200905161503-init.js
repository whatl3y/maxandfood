'use strict'

const { v4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('accounts', [
      {
        id: v4(),
        plan_type: 'basic',
        domain_name: process.env.URL.replace('http://', '').replace(
          'https://',
          ''
        ),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const [[account]] = await queryInterface.sequelize.query(
      `SELECT id from accounts;`
    )
    const accountId = account.id

    queryInterface.bulkInsert('users', [
      {
        id: v4(),
        email: process.env.SEED_EMAIL,
        current_account_id: accountId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const [[user]] = await queryInterface.sequelize.query(
      `SELECT id from users;`
    )
    const userId = user.id

    await Promise.all([
      queryInterface.bulkInsert('account_users', [
        {
          id: v4(),
          account_id: accountId,
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]),
      queryInterface.bulkInsert('account_images', [
        {
          id: v4(),
          account_id: accountId,
          image_name: 'maxheadup_andme.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'maxhead.png',
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-smile2.png',
          is_enabled: true,
          position: 'topleft',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-smile2-sm.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-smile.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-shirtless.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-papoose.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-lookup.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-hands-crossed.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-hands-crossed-sm.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-daily.png',
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          account_id: accountId,
          image_name: 'max-daily-sm.png',
          is_enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.bulkDelete('account_users', null, {}),
      queryInterface.bulkDelete('account_images', null, {}),
    ])

    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('accounts', null, {})
  },
}
