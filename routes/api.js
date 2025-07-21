import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url';
import {GET_ALL_SUBMISSIONS, INSERT_SUBMISSION, EDIT_BARANGAY_BY_ID, GET_BY_EMAIL, GET_BY_EMAIL_USER, UPDATE_AUTH_TOKEN_USER, GET_USER_BY_ID, UPDATE_USER_FORM_DATA, UPDATE_USER_ACC_DATA, GET_FACEBOOK_CONFIG, INSERT_FACEBOOK_LOG } from '../db/services.js';
import { generateAuthToken, hashPassword, formatDate } from './helpers.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    const acc = await GET_BY_EMAIL(email);
    console.log(acc);
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


router.post('/submitform', async (req, res) => {
  const data = req.body; 

  try {
    console.log('Received form data:', data);
    console.log('Received form email:', data.data.email);
    console.log('Received form password:', data.data.password);


    await INSERT_SUBMISSION(data, data.data.email, data.data.password);
    res.status(200).json({success: true, message: 'Form submitted successfully', data });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ message: 'Failed to handle form submission' });
  }
});

router.post('/edit-barangay', async (req, res) => {
  const formdata = req.body; 
  const data = formdata.data;
  console.log(data);
  
  try {
    await EDIT_BARANGAY_BY_ID(data.name, data.latitude, data.longitude, data.population, data.id);
    res.status(200).json({success: true, message: 'Barangay edited successfully'});
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ message: 'Failed to handle form submission' });
  }
});

router.post('/login-user', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    const acc = await GET_BY_EMAIL_USER(email);
    console.log(acc);

    if (password !== acc.password){
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    
    const token = await generateAuthToken();
    await UPDATE_AUTH_TOKEN_USER(token, acc.id);

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

router.post('/update-user-personal', async (req, res) => {
  const { first_name, middle_name, last_name, date_of_birth, age } = req.body;
  console.log(first_name);
  console.log(middle_name);
  console.log(last_name);
  console.log(date_of_birth);
  console.log(age);
  console.log(req.user_id);

  try {
    const userdata = await GET_USER_BY_ID(req.user_id);
    userdata.form_data = JSON.parse(userdata.form_data);
    userdata.form_data.data.first_name = first_name;
    userdata.form_data.data.middle_name = middle_name;
    userdata.form_data.data.last_name = last_name;
    userdata.form_data.data.age = age;

    console.log(userdata);

    await UPDATE_USER_FORM_DATA(JSON.stringify(userdata.form_data), req.user_id);

    res.status(200).json({ success: true, message: 'Update successful.' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/update-user-job', async (req, res) => {
  const { previous_employment_1, previous_employment_2, current_employment_1, current_employment_2, future_employment_1, future_employment_2 } = req.body;
  console.log(previous_employment_1);
  console.log(previous_employment_2);
  console.log(current_employment_1);
  console.log(current_employment_2);
  console.log(future_employment_1);
  console.log(future_employment_2);

  console.log(req.user_id);

  try {
    const userdata = await GET_USER_BY_ID(req.user_id);
    userdata.form_data = JSON.parse(userdata.form_data);
    userdata.form_data.data.previous_employment_1 = previous_employment_1;
    userdata.form_data.data.previous_employment_2 = previous_employment_1;
    userdata.form_data.data.current_employment_1 = current_employment_1;
    userdata.form_data.data.current_employment_2 = current_employment_2;
    userdata.form_data.data.future_employment_1 = future_employment_1;
    userdata.form_data.data.future_employment_2 = future_employment_2;

    console.log(userdata);

    await UPDATE_USER_FORM_DATA(JSON.stringify(userdata.form_data), req.user_id);

    res.status(200).json({ success: true, message: 'Update successful.' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/update-user-education', async (req, res) => {
  const { elementary_education, high_school_education, college_education, course_taken } = req.body;
  console.log(elementary_education);
  console.log(high_school_education);
  console.log(college_education);
  console.log(course_taken);
  console.log(req.user_id);

  try {
    const userdata = await GET_USER_BY_ID(req.user_id);
    userdata.form_data = JSON.parse(userdata.form_data);
    userdata.form_data.data.elementary_education = elementary_education;
    userdata.form_data.data.high_school_education = high_school_education;
    userdata.form_data.data.college_education = college_education;
    userdata.form_data.data.course_taken = course_taken;
    
    console.log(userdata);

    await UPDATE_USER_FORM_DATA(JSON.stringify(userdata.form_data), req.user_id);

    res.status(200).json({ success: true, message: 'Update successful.' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/update-user-account', async (req, res) => {
  const { email, account_password } = req.body;
  console.log(email);
  console.log(account_password);
 
  try {
    const userdata = await GET_USER_BY_ID(req.user_id);
    userdata.form_data = JSON.parse(userdata.form_data);
    userdata.form_data.data.email = email;
    userdata.form_data.data.password = account_password;
    

    console.log(userdata);

    await UPDATE_USER_FORM_DATA(JSON.stringify(userdata.form_data), req.user_id);
    await UPDATE_USER_ACC_DATA(email, account_password, req.user_id);

    res.status(200).json({ success: true, message: 'Update successful.' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/facebook-results', async (req, res) => {
  try {
    const config = await GET_FACEBOOK_CONFIG();
    const allsubmissions = await GET_ALL_SUBMISSIONS();
    const barangayCount = {};

    // Count submissions per barangay
    for (const row of allsubmissions) {
      try {
        const formData = JSON.parse(row.form_data);
        const barangay = formData.data?.barangay;

        if (barangay) {
          barangayCount[barangay] = (barangayCount[barangay] || 0) + 1;
        }
      } catch (err) {
        console.error('Invalid JSON in form_data:', err);
      }
    }

    // Sort and get top 10
    const sortedBarangays = Object.entries(barangayCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Format as lines
    const barangayText = sortedBarangays
      .map(([barangay, count]) => `🏘️ Barangay ${barangay}: ${count} submissions`)
      .join('\n');

    // Replace placeholders
    let message = config[0].message
      .replace('${date}', formatDate(new Date()))
      .replace('${barangay}', barangayText);

    console.log(message);

    const post = await axios.post('https://hook.eu2.make.com/78mo5ah1hchymqm1uyyd5ejr9xl4b0i0', {
      message: message,
    });

    // console.log(post);
    await INSERT_FACEBOOK_LOG(config[0].message, 'Success');
    res.status(200).json({ success: true, message: 'Posted successful.' });
  } catch (error) {
    console.error('❌ Error posting to Facebook:', error.response?.data || error.message);
    await INSERT_FACEBOOK_LOG(
      typeof error.response?.data === 'string' 
        ? error.response.data 
        : error.message || "Failed to post.", 
      'Failed'
    );
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/facebook-form', async (req, res) => {
  try {
    const config = await GET_FACEBOOK_CONFIG();

    const post = await axios.post('https://hook.eu2.make.com/78mo5ah1hchymqm1uyyd5ejr9xl4b0i0', {
      message: config[1].message,
    });

    // console.log(post);
    await INSERT_FACEBOOK_LOG(config[0].message, 'Success');
    res.status(200).json({ success: true, message: 'Posted successful.' });
  } catch (error) {
    console.error('❌ Error posting to Facebook:', error.response?.data || error.message);
    await INSERT_FACEBOOK_LOG(
      typeof error.response?.data === 'string' 
        ? error.response.data 
        : error.message || "Failed to post.", 
      'Failed'
    );
    res.status(500).json({ error: 'Server error.' });
  }
});
export default router;
