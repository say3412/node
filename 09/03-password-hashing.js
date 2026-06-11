// npm i bcryptjs

const bcrypt = require("bcryptjs");

async function main() {
  const password = 'my-screat-1234';
  const hash = await bcrypt.hash(password, 10) // (, hash round) bcrypt가 알아서 salt를 넣어줌
  console.log("평문: ", password);
  console.log("hash: ", hash);

  console.log("올바른 비밀번호: ", await bcrypt.compare(password, hash));
  console.log("잘못된 비밀번호: ", await bcrypt.compare('my-screat-12345', hash));
}

main();

// $2b $10 $pA.KnFs3owhciRrzg8yQMe XieUy0SekTwcX79fBIGm6/khyqYC03m
// $bcrypt $round $22자리salt $hash31자리