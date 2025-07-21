import express from 'express';
import { generateAuthToken, hashPassword } from './helpers.js';
import { GET_BY_EMAIL, UPDATE_AUTH_TOKEN } from '../db/services.js';
import bcrypt from 'bcrypt';


const router = express.Router();

// console.log(await hashPassword('password'));
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const acc = await GET_BY_EMAIL(email);
    if (!acc || !(await bcrypt.compare(password, acc.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = await generateAuthToken();
    await UPDATE_AUTH_TOKEN(token, acc.id);

    res.cookie('auth_token', token, {
      httpOnly: true,      // Prevents JS access to cookie (good for security)
      secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      sameSite: 'lax'      // Adjust based on your cross-site cookie policy
    });
    
    res.status(200).json({ success: true, token, message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

router.get('/dashboard', async (req, res) => {

  const data = {
    title: "Dashboard",
    accident_logs: parsedLogs
  }
  
  console.log(data);
  
  res.render('TMIDA/dashboard', data);
});

router.get('/submissions', async (req, res) => {

  const logs = await GET_ALL_ACCODENT_LOG();
  const parsedLogs = logs.map(log => {
  try {
    return {
      ...log,
      json_string_data: JSON.parse(log.json_string_data),
    };
  } catch (e) {
    console.error('Failed to parse JSON string for log id', log.id, e);
    return {
      ...log,
      json_string_data: null,
    };
  }
});

  const data = {
    title: "Dashboard",
    accident_logs: parsedLogs
  }
  
  console.log(data);
  
  res.render('TMIDA/dashboard', data);
});

// router.post('/', async (req, res) => {
//   const { param } = req.body;

//   try {
    
//   } catch (error) {
//     console.error('AI error:', error);
//     res.status(500).json({ error: 'Failed to generate response' });
//   }
// });

export default router;
