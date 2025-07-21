// post-to-facebook.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PAGE_ACCESS_TOKEN = process.env.UMSRT_PAGE_ACCESS_TOKE;
const PAGE_ID = process.env.UMSRT_PAGE_ID;

const postToFacebook = async () => {
  try {
    await axios.post('https://hook.eu2.make.com/fx0939ckn4xgeg4u73o68m8prdhdnm4p', {
      message: 'Ernesto',
      age: 22,
      role: 'teacher'
    });

  } catch (error) {
    console.error('❌ Error posting to Facebook:', error.response?.data || error.message);
  }
};

postToFacebook();
