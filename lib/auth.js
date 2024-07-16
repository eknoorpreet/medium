import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12); //12 - number of salting rounds (can't be reverse-engineered)
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  //validate password
  let isValidPassword = await bcrypt.compare(password, hashedPassword);
  return isValidPassword;
}
