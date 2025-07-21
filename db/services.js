import db from './db.js';       // Now process.env.DBNAME will be defined
import * as queries from './queries.js';


// Insert new row
export async function insertItem(...values) {
  const [result] = await db.execute(INSERT, values);
  return result.insertId;
}

// Get single row by ID
export async function getItemById(id) {
  const [rows] = await db.execute(GET_BY_ID, [id]);
  return rows[0];
}

// Update row by ID (last value should be the ID)
export async function updateItemById(...values) {
  const [result] = await db.execute(UPDATE_BY_ID, values);
  return result.affectedRows > 0;
}

// Delete row by ID
export async function deleteItemById(id) {
  const [result] = await db.execute(DELETE_BY_ID, [id]);
  return result.affectedRows > 0;
}

// Get all rows
export async function getAllItems() {
  const [rows] = await db.execute(GET_ALL);
  return rows;
}

// Upsert (insert or update if exists)
export async function upsertItem(...values) {
  const [result] = await db.execute(UPSERT, values);
  return result.insertId || result.affectedRows > 0;
}


// Admin
export async function GET_BY_EMAIL(email) {
  const [rows] = await db.execute(queries.GET_BY_EMAIL, [email]);
  return rows[0];
}

export async function VERIFY_AUTH(token) {
  const [results] = await db.execute(queries.VERIFY_AUTH, [token]);
  return results[0];
}


export async function UPDATE_AUTH_TOKEN(token, id) {
  const [result] = await db.execute(queries.UPDATE_AUTH_TOKEN, [token, id]);
  return result.affectedRows > 0;
}

export async function GET_ALL_BARANGAYS() {
  const [rows] = await db.execute(queries.GET_ALL_BARANGAYS);
  return rows;
}


export async function EDIT_BARANGAY_BY_ID(name, lat, lng, population, id) {
  const [result] = await db.execute(queries.EDIT_BARANGAY_BY_ID, [name, lat, lng, population, id]);
  return result.affectedRows > 0;
}

export async function GET_FACEBOOK_CONFIG() {
  const [rows] = await db.execute(queries.GET_FACEBOOK_CONFIG);
  return rows;
}

export async function GET_ALL_FACEBOOK_POSTS() {
  const [rows] = await db.execute(queries.GET_ALL_FACEBOOK_POSTS);
  return rows;
}

export async function INSERT_FACEBOOK_LOG(content, status) {
  const [result] = await db.execute(queries.INSERT_FACEBOOK_LOG, [content, status]);
  return result.insertId;
}

//users
export async function VERIFY_AUTH_USER(token) {
  const [results] = await db.execute(queries.VERIFY_AUTH_USER, [token]);
  return results[0];
}

export async function GET_BY_EMAIL_USER(email) {
  const [rows] = await db.execute(queries.GET_BY_EMAIL_USER, [email]);
  return rows[0];
}

export async function GET_USER_BY_ID(id) {
  const [rows] = await db.execute(queries.GET_USER_BY_ID, [id]);
  return rows[0];
}


export async function UPDATE_USER_FORM_DATA(form_data, id) {
  const [result] = await db.execute(queries.UPDATE_USER_FORM_DATA, [form_data, id]);
  return result.affectedRows > 0;
}

export async function UPDATE_USER_ACC_DATA(email, password, id) {
  const [result] = await db.execute(queries.UPDATE_USER_ACC_DATA, [email, password, id]);
  return result.affectedRows > 0;
}

export async function UPDATE_AUTH_TOKEN_USER(token, id) {
  const [result] = await db.execute(queries.UPDATE_AUTH_TOKEN_USER, [token, id]);
  return result.affectedRows > 0;
}

// api
export async function INSERT_SUBMISSION(data, email, password) {
  const [result] = await db.execute(queries.INSERT_SUBMISSION, [JSON.stringify(data), email, password]);
  return result.insertId;
}

export async function GET_ALL_SUBMISSIONS() {
  const [rows] = await db.execute(queries.GET_ALL_SUBMISSIONS);
  return rows;
}
