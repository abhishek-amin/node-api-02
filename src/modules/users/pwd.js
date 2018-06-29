const bcrypt = require('bcrypt');

const saltRounds = 10;

const plainTextPwd = 'ilovebacon';

async function hashMyPwd (plainTextPwd, saltRounds) {
  const hashed = await bcrypt.hash(plainTextPwd, saltRounds);
  console.log(hashed);
  const res = await bcrypt.compare('ilovebacon', hashed);
  console.log(res);
}

hashMyPwd(plainTextPwd, saltRounds);