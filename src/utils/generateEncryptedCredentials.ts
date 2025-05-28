import CryptoJS from 'crypto-js';

const secretKey = 'springfallus-admin-secret-2024'; // This is just for generating encrypted values

const email = 'preshak@springfallus.org';
const password = 'springfallus@2025';

const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

console.log('Encrypted Email:', encryptedEmail);
console.log('Encrypted Password:', encryptedPassword); 