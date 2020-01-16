export default function generateSerial() {
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const serialLength = 10;
  let randomSerial = 'SN';
  let randomNumber = 0;
  for (let i = 0; i < serialLength; i += 1) {
    randomNumber = Math.floor(Math.random() * chars.length);
    randomSerial += chars.substring(randomNumber, randomNumber + 1);
  }
  console.log('serial', randomSerial);
  return randomSerial;
}
