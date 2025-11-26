import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import adminRouter from './routes/admin.js';
import expressjslayout from 'express-ejs-layouts'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { GET_ALL_SUBMISSIONS, GET_ALL_BARANGAYS, VERIFY_AUTH, VERIFY_AUTH_USER, GET_USER_BY_ID, GET_FACEBOOK_CONFIG, GET_ALL_FACEBOOK_POSTS } from './db/services.js';
import { generateAuthToken, hashPassword, formatDate } from './routes/helpers.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '50mb' })); // allow up to 50MB payload
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(cookieParser());

// EJS setup
app.use(expressjslayout);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(verifyAuth)


// Routes
app.get('/admin/login', (req, res) => {
  const data = {
    title: "Login"
  }
  res.render('admin/login', data);
});

app.get('/users/login', async (req, res) => {
  
  const data = {
    title: "Login",
    date: formatDate(new Date())
  }

  console.log(data);
  console.log('users/login');
  res.render('users/login', data);
});

app.get('/users/home', async (req, res) => {
  const userdata = await GET_USER_BY_ID(req.user_id);
  userdata.form_data = JSON.parse(userdata.form_data);
  userdata.date_added = formatDate(userdata.date_added);
  const data = {
    title: "Home",
    date: formatDate(new Date()),
    userdata: userdata
  }

  console.log(data);
  res.render('users/home', data);
});

app.get('/admin/dashboard', async (req, res) => {
  const allsubmissions = await GET_ALL_SUBMISSIONS();
  const countSubmissionsWithCurrentEmployment = allsubmissions.reduce((count, submission) => {
    const formData = JSON.parse(submission.form_data);
    const hasCurrentEmployment = formData.data.current_employment_1?.trim() !== '' || formData.data.current_employment_2?.trim() !== '';
    return hasCurrentEmployment ? count + 1 : count;
  }, 0);

  const countSubmissionsWithNoCurrentEmployment = allsubmissions.reduce((count, submission) => {
    const formData = JSON.parse(submission.form_data);
    const hasCurrentEmployment = formData.data.current_employment_1?.trim() !== '' || formData.data.current_employment_2?.trim() !== '';
    return !hasCurrentEmployment ? count + 1 : count;
  }, 0);

  const barangayStats = {};
  const submissionresult = {};

allsubmissions.forEach(submission => {
  const formData = JSON.parse(submission.form_data);
  const barangayField = formData.data.barangay || 'Unknown';
  const date = new Date(submission.date_added).toISOString().split('T')[0];

  const employed = formData.data.current_employment_1?.trim() !== '' || formData.data.current_employment_2?.trim() !== '';

  // Split multiple barangays by '/' and trim spaces
  const barangays = barangayField.split('/').map(b => b.trim());

  barangays.forEach(barangay => {
    // --- Barangay employment stats ---
    if (!barangayStats[barangay]) {
      barangayStats[barangay] = { employed: 0, unemployed: 0 };
    }
    employed ? barangayStats[barangay].employed++ : barangayStats[barangay].unemployed++;

    // --- Submission result ---
    if (!submissionresult[barangay]) {
      submissionresult[barangay] = {
        total: 0,
        employed: 0,
        unemployed: 0,
        byDate: {}
      };
    }

    submissionresult[barangay].total++;
    employed ? submissionresult[barangay].employed++ : submissionresult[barangay].unemployed++;

    if (!submissionresult[barangay].byDate[date]) {
      submissionresult[barangay].byDate[date] = 0;
    }
    submissionresult[barangay].byDate[date]++;
  });
});




  const allBarangays = await GET_ALL_BARANGAYS();
  allBarangays.forEach(barangay => {
    barangay.date_added = formatDate(barangay.date_added);
    barangay.population = Number(barangay.population);
    barangay.lat = Number(barangay.lat);
    barangay.lng = Number(barangay.lng);

  });

  console.log(submissionresult);

  const data = {
    title: "Dashboard",
    date: formatDate(new Date()),
    allsubmissions: allsubmissions.length.toLocaleString(),
    employed: countSubmissionsWithCurrentEmployment.toLocaleString(),
    unemployed: countSubmissionsWithNoCurrentEmployment.toLocaleString(),
    barangaystats: barangayStats,
    allBarangays: allBarangays,
    allsubmissionsdata: submissionresult
  }

  // console.log(data);
  res.render('admin/dashboard', data);
});

app.get('/admin/submissions', async (req, res) => {
  
  const allsubmissions = await GET_ALL_SUBMISSIONS();
  console.log(allsubmissions);
  
  allsubmissions.forEach(submission => {
    submission.form_data = JSON.parse(submission.form_data);
  });
  const data = {
    title: "Submissions",
    date: formatDate(new Date()),
    allsubmissions: allsubmissions
  }

  console.log(data);
  res.render('admin/submissions', data);
});

app.get('/admin/facebook', async (req, res) => {
  
  const config = await GET_FACEBOOK_CONFIG();
  const allposts = await GET_ALL_FACEBOOK_POSTS();

  allposts.forEach(post => {
    post.date_added = formatDate(post.date_added);
  });

  allposts.sort((a, b) => b.id - a.id);

  const data = {
    title: "Facebook posts",
    date: formatDate(new Date()),
    config: config,
    allposts: allposts
  }

  // console.log(allposts);
  res.render('admin/facebook', data);
});

app.get('/admin/barangays', async (req, res) => {
  const allBarangays = await GET_ALL_BARANGAYS();
  const allsubmissions = await GET_ALL_SUBMISSIONS();

  const barangayStats = {};

  allsubmissions.forEach(submission => {
    const formData = JSON.parse(submission.form_data);
    const barangay = formData.data.barangay || 'Unknown';
    const employed = formData.data.current_employment_1?.trim() !== '' || formData.data.current_employment_2?.trim() !== '';

    if (!barangayStats[barangay]) {
      barangayStats[barangay] = { employed: 0, unemployed: 0 };
    }

    if (employed) {
      barangayStats[barangay].employed++;
    } else {
      barangayStats[barangay].unemployed++;
    }
  });

  // Merge stats into barangay array
  allBarangays.forEach(barangay => {
    barangay.date_added = formatDate(barangay.date_added);

    // Attach stats if available, otherwise default to 0
    const stats = barangayStats[barangay.name];
    barangay.employed = stats ? stats.employed : 0;
    barangay.unemployed = stats ? stats.unemployed : 0;
  });

  const data = {
    title: "Barangays",
    date: formatDate(new Date()),
    allBarangays: allBarangays,
  };

  console.log(data)
  res.render('admin/barangays', data);
});


app.get('/admin/form', async (req, res) => {
  
  const data = {
    title: "Form Builder",
    date: formatDate(new Date())
  }

  console.log(data);
  res.render('admin/form', data);
});

app.get('/form', async (req, res) => {
  const data = {
    title: "Submission Form",
    date: formatDate(new Date())
  }

  res.render('admin/partials/submissionform', data);
});

app.get('/home', async (req, res) => {
  const data = {
    title: "Home",
    date: formatDate(new Date())
  }

  res.render('home', data);
});

app.get('/', async (req, res) => {
  return res.redirect('/home');
});

//logout
app.get('/users/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/', 
  });

  res.redirect('/users/login');

});

app.get('/admin/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/', 
  });
  res.redirect('/admin/login');
});


app.use('/api', apiRouter);
app.use('/admin', adminRouter);

// cdn
app.use('/cdn/', express.static(path.join(__dirname, 'node_modules/')));
app.use('/capturedincident/', express.static(path.join(__dirname, 'captured_incident/')));

async function verifyAuth(req, res, next) {
  const excludedPaths = [
    '/home',
    '/admin/login',
    '/createacc',
    '/login',
    '/api/login',
    '/users/login',
    '/form',
    '/api/submitform'
  ];

  

  const normalize = path => path.replace(/\/+$/, '');
  const fullPath = normalize(req.baseUrl + req.path);
  console.log("Full Path:", fullPath);

  if (fullPath.includes('/api') || excludedPaths.some(path => fullPath.startsWith(normalize(path)))) {
    return next();
  }


  // Skip auth for excluded paths
  if (excludedPaths.some(path => fullPath.startsWith(normalize(path)))) {
    return next();
  }

  const token = req.cookies?.auth_token;
  console.log("Token:", token);

  if (!token) {
    console.log("No token found.");
    return respondUnauthorized(req, res);
  }

  let verify = await VERIFY_AUTH_USER(token);
  let isAdmin = false;
  console.log("Verify (User):", verify);

  if (!verify) {
    verify = await VERIFY_AUTH(token);
    isAdmin = !!verify;
    console.log("Verify (Admin):", verify);
  }

  if (!verify || !verify.id) {
    return respondUnauthorized(req, res);
  }

  // If requesting an /admin path, only allow if verified as admin
  if (req.path.includes('/admin') && !isAdmin) {
    console.log("Access denied: user tried to access admin page.");
    return res.redirect('/home');
  }

  req.user_id = verify.id;
  next();
}

function respondUnauthorized(req, res) {
  if (req.method === 'POST' || req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ message: 'Invalid authentication' });
  }
  return res.redirect('/home');
}



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
