const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash passwords
  const hashedPasswordUser1 = await bcrypt.hash('user1', 10);
  const hashedPasswordUser2 = await bcrypt.hash('user2', 10);
  const hashedPasswordUser3 = await bcrypt.hash('user3', 10);
  const hashedPasswordVolunteer1 = await bcrypt.hash('volunteer1', 10);
  const hashedPasswordVolunteer2 = await bcrypt.hash('volunteer2', 10);

  // Inserts seed entries
  return knex('users').insert([
    { username: 'user1', password: hashedPasswordUser1, role: 'member' },
    { username: 'user2', password: hashedPasswordUser2, role: 'member' },
    { username: 'user3', password: hashedPasswordUser3, role: 'member' },
    { username: 'volunteer1', password: hashedPasswordVolunteer1, role: 'volunteer' },
    { username: 'volunteer2', password: hashedPasswordVolunteer2, role: 'volunteer' }
  ]);
};
