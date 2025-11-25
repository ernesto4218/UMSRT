// Get a single row by ID
export const GET_BY_ID = 'SELECT * FROM table_name WHERE id = ?';

// Insert a new row
export const INSERT = 'INSERT INTO table_name (column1, column2) VALUES (?, ?)';

// Update a row by ID
export const UPDATE_BY_ID = 'UPDATE table_name SET column1 = ?, column2 = ?, date_updated = NOW() WHERE id = ?';

// Delete a row by ID
export const DELETE_BY_ID = 'DELETE FROM table_name WHERE id = ?';

// Get all rows
export const GET_ALL = 'SELECT * FROM table_name';

//login
// admin
export const GET_BY_EMAIL = 'SELECT * FROM users WHERE email = ?';
export const VERIFY_AUTH = "SELECT * FROM users WHERE auth_token = ?";
export const UPDATE_AUTH_TOKEN = 'UPDATE users SET auth_token = ? WHERE id = ?';
export const GET_ALL_BARANGAYS = 'SELECT * FROM barangays ORDER by name ASC';
export const EDIT_BARANGAY_BY_ID = 'UPDATE barangays SET name = ?, lat = ?, lng = ?, population = ? WHERE id = ?';
export const GET_FACEBOOK_CONFIG = 'SELECT * FROM facebook_post_config';
export const INSERT_FACEBOOK_LOG = 'INSERT INTO facebook_post (content, status) VALUES (?, ?)';
export const GET_ALL_FACEBOOK_POSTS = 'SELECT * FROM facebook_post';

//users
export const VERIFY_AUTH_USER = "SELECT * FROM submissions WHERE auth_token = ?";
export const GET_BY_EMAIL_USER = 'SELECT * FROM submissions WHERE email = ?';
export const UPDATE_AUTH_TOKEN_USER = 'UPDATE submissions SET auth_token = ? WHERE id = ?';
export const GET_USER_BY_ID = 'SELECT id, form_data, date_added FROM submissions WHERE id = ?';
export const UPDATE_USER_FORM_DATA = 'UPDATE submissions SET form_data = ? WHERE id = ?';
export const UPDATE_USER_ACC_DATA = 'UPDATE submissions SET email = ?, password = ? WHERE id = ?';

// api
export const INSERT_SUBMISSION = 'INSERT INTO submissions (form_data, email, password) VALUES (?, ?, ?)';
export const GET_ALL_SUBMISSIONS = 'SELECT * FROM submissions ORDER by id DESC';

export const CHECK_SUBMISSION_EXISTED =   `SELECT * FROM submissions 
   WHERE (LOWER(JSON_UNQUOTE(JSON_EXTRACT(form_data, '$.data.first_name'))) = LOWER(?)
          AND LOWER(JSON_UNQUOTE(JSON_EXTRACT(form_data, '$.data.middle_name'))) = LOWER(?)
          AND LOWER(JSON_UNQUOTE(JSON_EXTRACT(form_data, '$.data.last_name'))) = LOWER(?))`