const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash passwords
  const hashedPasswordUser = await bcrypt.hash('user1', 10);
  const hashedPasswordVolunteer = await bcrypt.hash('volunteer1', 10);

  // Inserts seed entries
  return knex('users').insert([
    { username: 'user1', password: hashedPasswordUser, role: 'member' },
    { username: 'volunteer1', password: hashedPasswordVolunteer, role: 'volunteer' }
  ]);
};
