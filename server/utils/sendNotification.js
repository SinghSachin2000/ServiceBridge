import { Vonage } from '@vonage/server-sdk';
import dotenv from "dotenv"
dotenv.configDotenv();


const { VOYAGE_API_KEY, VOYAGE_API_SECRET } = process.env;
const vonage = new Vonage({
  apiKey: VOYAGE_API_KEY,
  apiSecret: VOYAGE_API_SECRET
})
const from = "ServiceBridge"
const to = "918920755078"
const text = "Hi sachin"
export default async function sendSMS() {
  await vonage.sms.send({ to, from, text })
    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


