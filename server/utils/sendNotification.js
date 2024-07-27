import { Vonage } from '@vonage/server-sdk';
import dotenv from "dotenv"
dotenv.configDotenv();


const { VOYAGE_API_KEY, VOYAGE_API_SECRET } = process.env;
const vonage = new Vonage({
  apiKey: VOYAGE_API_KEY,
  apiSecret: VOYAGE_API_SECRET
})
const from = "ServiceBridge"
const to = "917303616561"

export default async function sendSMS(to, test) {
  await vonage.sms.send({ to, from, text })
    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


