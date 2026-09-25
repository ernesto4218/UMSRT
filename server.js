import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js";
import adminRouter from "./routes/admin.js";
import expressjslayout from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  GET_ALL_SUBMISSIONS,
  GET_ALL_BARANGAYS,
  VERIFY_AUTH,
  VERIFY_AUTH_USER,
  GET_USER_BY_ID,
  GET_FACEBOOK_CONFIG,
  GET_ALL_FACEBOOK_POSTS,
  VERIFY_AUTH_EMPLOYER,
  GET_EMPLOYER_BY_ID,
  GET_UNEMPLOYED_CANDIDATES,
} from "./db/services.js";
import {
  generateAuthToken,
  hashPassword,
  formatDate,
} from "./routes/helpers.js";
import {
  buildSearchTerms,
  scoreCandidate,
  SKILL_CLUSTERS,
  SKILL_OPTIONS,
  COURSE_CLUSTERS,
  COURSE_OPTIONS,
  SORT_OPTIONS,
} from "./routes/match.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "50mb" })); // allow up to 50MB payload
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(cookieParser());

// EJS setup
app.use(expressjslayout);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(verifyAuth);

// Routes
app.get("/admin/login", (req, res) => {
  const data = {
    title: "Login",
  };
  res.render("admin/login", data);
});

app.get("/users/login", async (req, res) => {
  const data = {
    title: "Login",
    date: formatDate(new Date()),
  };

  console.log(data);
  console.log("users/login");
  res.render("users/login", data);
});

app.get("/users/home", async (req, res) => {
  const userdata = await GET_USER_BY_ID(req.user_id);
  userdata.form_data = JSON.parse(userdata.form_data);
  userdata.date_added = formatDate(userdata.date_added);
  const data = {
    title: "Home",
    date: formatDate(new Date()),
    userdata: userdata,
  };

  console.log(data);
  res.render("users/home", data);
});

app.get("/admin/dashboard", async (req, res) => {
  const allsubmissions = await GET_ALL_SUBMISSIONS();

  const countSubmissionsWithCurrentEmployment = allsubmissions.reduce(
    (count, submission) => {
      const formData = JSON.parse(submission.form_data);
      const hasCurrentEmployment =
        formData.data.current_employment_1?.trim() !== "" ||
        formData.data.current_employment_2?.trim() !== "";
      return hasCurrentEmployment ? count + 1 : count;
    },
    0,
  );

  const countSubmissionsWithNoCurrentEmployment = allsubmissions.reduce(
    (count, submission) => {
      const formData = JSON.parse(submission.form_data);
      const hasCurrentEmployment =
        formData.data.current_employment_1?.trim() !== "" ||
        formData.data.current_employment_2?.trim() !== "";
      return !hasCurrentEmployment ? count + 1 : count;
    },
    0,
  );

  const barangayStats = {};
  const submissionresult = {};

  allsubmissions.forEach((submission) => {
    const formData = JSON.parse(submission.form_data);
    const barangayField = formData.data.barangay || "Unknown";
    const date = new Date(submission.date_added).toISOString().split("T")[0];

    const employed =
      formData.data.current_employment_1?.trim() !== "" ||
      formData.data.current_employment_2?.trim() !== "";

    // Split multiple barangays by '/' and trim spaces
    const barangays = barangayField.split("/").map((b) => b.trim());

    barangays.forEach((barangay) => {
      // --- Barangay employment stats ---
      if (!barangayStats[barangay]) {
        barangayStats[barangay] = { employed: 0, unemployed: 0 };
      }
      employed
        ? barangayStats[barangay].employed++
        : barangayStats[barangay].unemployed++;

      // --- Submission result ---
      if (!submissionresult[barangay]) {
        submissionresult[barangay] = {
          total: 0,
          employed: 0,
          unemployed: 0,
          byDate: {},
        };
      }

      submissionresult[barangay].total++;
      employed
        ? submissionresult[barangay].employed++
        : submissionresult[barangay].unemployed++;

      if (!submissionresult[barangay].byDate[date]) {
        submissionresult[barangay].byDate[date] = 0;
      }
      submissionresult[barangay].byDate[date]++;
    });
  });

  const allBarangays = await GET_ALL_BARANGAYS();
  allBarangays.forEach((barangay) => {
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
    allsubmissionsdata: submissionresult,
    allsubmissionsResident: allsubmissions,
  };

  console.log(allsubmissions);
  res.render("admin/dashboard", data);
});

app.get("/admin/submissions", async (req, res) => {
  const allsubmissions = await GET_ALL_SUBMISSIONS();
  console.log(allsubmissions);

  allsubmissions.forEach((submission) => {
    submission.form_data = JSON.parse(submission.form_data);
  });
  const data = {
    title: "Submissions",
    date: formatDate(new Date()),
    allsubmissions: allsubmissions,
  };

  console.log(data);
  res.render("admin/submissions", data);
});

app.get("/admin/facebook", async (req, res) => {
  const config = await GET_FACEBOOK_CONFIG();
  const allposts = await GET_ALL_FACEBOOK_POSTS();

  allposts.forEach((post) => {
    post.date_added = formatDate(post.date_added);
  });

  allposts.sort((a, b) => b.id - a.id);

  const data = {
    title: "Facebook posts",
    date: formatDate(new Date()),
    config: config,
    allposts: allposts,
  };

  // console.log(allposts);
  res.render("admin/facebook", data);
});

app.get("/admin/barangays", async (req, res) => {
  const allBarangays = await GET_ALL_BARANGAYS();
  const allsubmissions = await GET_ALL_SUBMISSIONS();

  const barangayStats = {};

  allsubmissions.forEach((submission) => {
    const formData = JSON.parse(submission.form_data);
    const barangay = formData.data.barangay || "Unknown";
    const employed =
      formData.data.current_employment_1?.trim() !== "" ||
      formData.data.current_employment_2?.trim() !== "";

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
  allBarangays.forEach((barangay) => {
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

  console.log(data);
  res.render("admin/barangays", data);
});

app.get("/admin/form", async (req, res) => {
  const data = {
    title: "Form Builder",
    date: formatDate(new Date()),
  };

  console.log(data);
  res.render("admin/form", data);
});

// employer
app.get("/employer/login", (req, res) => {
  const data = {
    title: "Login",
  };
  res.render("employer/login", data);
});

app.get("/employer/createacc", (req, res) => {
  const data = { title: "Employer Sign Up" };
  res.render("employer/createacc", data);
});

app.get("/employer/dashboard", async (req, res) => {
  const PAGE_SIZE = 20;
  const currentPage = Math.max(1, parseInt(req.query.page) || 1);

  // 1. Who is logging in
  const employer = await GET_EMPLOYER_BY_ID(req.employer_id);

  // 2. Only unemployed candidates (SQL already filters on current_employment_*)
  const rows = await GET_UNEMPLOYED_CANDIDATES();

  const unemployed = rows.map((r) => ({
    id: r.id,
    name: [r.first_name, r.middle_name, r.last_name].filter(Boolean).join(" "),
    email: r.email || "",
    age: Number(r.age) || null,
    barangay: r.barangay || "",
    college: r.college || "",
    course: r.course || "",
    skills: r.skills || "",
    prev_job_1: r.prev_job_1 || "",
    prev_job_2: r.prev_job_2 || "",
    want_job_1: r.want_job_1 || "",
    want_job_2: r.want_job_2 || "",
    date_added: r.date_added,
  }));

  // 3. Read filters
  const q = {
    search: (req.query.search || "").toString().toLowerCase().trim(),
    barangay: (req.query.barangay || "").toString().trim(),
    min_age: req.query.min_age ? Number(req.query.min_age) : null,
    max_age: req.query.max_age ? Number(req.query.max_age) : null,
    course: (req.query.course || "").toString().trim(), // cluster key
    skill: (req.query.skill || "").toString().trim(), // cluster key
    job: (req.query.job || "").toString().trim(),
    matchmode: req.query.matchmode === "any" ? "any" : "all",
    has_exp: (req.query.has_exp || "").toString().trim(), // "", "yes", "no"
    sort: (req.query.sort || "relevance").toString().trim(),
  };

  const hasAnyFilter = Boolean(
    q.search ||
    q.barangay ||
    q.min_age != null ||
    q.max_age != null ||
    q.course ||
    q.skill ||
    q.job ||
    q.has_exp,
  );

  // 4. Build search terms once (only when there's a job query)
  const terms = q.job ? buildSearchTerms(q.job) : null;

  // 5. Filter + score
  let filtered = unemployed;

  if (hasAnyFilter) {
    filtered = unemployed
      .map((c) => {
        // --- Hard filters ---
        if (q.search && !c.name.toLowerCase().includes(q.search)) return null;
        if (q.barangay && c.barangay !== q.barangay) return null;
        if (q.min_age != null && (c.age ?? 0) < q.min_age) return null;
        if (q.max_age != null && (c.age ?? 999) > q.max_age) return null;

        // Course cluster — matches course_taken + college
        if (q.course && COURSE_CLUSTERS[q.course]) {
          const blob = `${c.course} ${c.college}`.toLowerCase();
          const hit = COURSE_CLUSTERS[q.course].some((k) => blob.includes(k));
          if (!hit) return null;
        }

        // Skill cluster — matches your_skills only
        if (q.skill && SKILL_CLUSTERS[q.skill]) {
          const blob = (c.skills || "").toLowerCase();
          const hit = SKILL_CLUSTERS[q.skill].some((k) => blob.includes(k));
          if (!hit) return null;
        }

        // Previous experience
        if (q.has_exp === "yes" && !c.prev_job_1 && !c.prev_job_2) return null;
        if (q.has_exp === "no" && (c.prev_job_1 || c.prev_job_2)) return null;

        // --- Job/skill keyword scoring ---
        if (terms) {
          const result = scoreCandidate(c, terms);

          if (q.matchmode === "all") {
            if (result.matchedBase.length < terms.baseTokens.length)
              return null;
          } else {
            if (result.matchedBase.length === 0) return null;
          }

          return {
            ...c,
            _matchScore: result.score,
            _matchPct: result.matchPct,
            _matchReasons: result.reasons,
            _matchTerms: result.matchedBase,
          };
        }

        return {
          ...c,
          _matchScore: 0,
          _matchPct: 0,
          _matchReasons: [],
          _matchTerms: [],
        };
      })
      .filter(Boolean);
  }

  // 6. Sort
  if (q.sort === "newest") {
    filtered.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
  } else if (q.sort === "age_asc") {
    filtered.sort((a, b) => (a.age ?? 999) - (b.age ?? 999));
  } else if (q.sort === "age_desc") {
    filtered.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
  } else if (terms) {
    // "relevance" — by match score when a job search is active
    filtered.sort((a, b) => (b._matchScore || 0) - (a._matchScore || 0));
  }

  // 7. Pagination
  const totalMatched = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalMatched / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const candidates = filtered.slice(start, start + PAGE_SIZE);

  // 8. Barangay dropdown — from ALL unemployed, not just this page
  const barangays = [
    ...new Set(unemployed.map((c) => c.barangay).filter(Boolean)),
  ].sort();

  // 9. Query string for pagination links (preserves filters)
  const baseParams = new URLSearchParams();
  Object.entries(req.query).forEach(([k, v]) => {
    if (k !== "page" && v) baseParams.append(k, v);
  });
  const qs = baseParams.toString();
  const pageUrl = (n) => `/employer/dashboard?${qs ? qs + "&" : ""}page=${n}`;

  // 10. Render
  res.render("employer/dashboard", {
    title: "Dashboard | Employer",
    date: formatDate(new Date()),
    employer,
    candidates,
    totalUnemployed: unemployed.length,
    totalMatched,
    barangays,
    filters: {
      ...q,
      search: req.query.search || "",
      job: req.query.job || "",
    },
    hasAnyFilter,
    page,
    totalPages,
    pageSize: PAGE_SIZE,
    pageUrl,
    // dropdown data for the view
    skillOptions: SKILL_OPTIONS,
    courseOptions: COURSE_OPTIONS,
    sortOptions: SORT_OPTIONS,
  });
});

app.get("/employer/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.redirect("/employer/login");
});

app.get("/employer/candidates/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.redirect("/employer/dashboard");

  const all = await GET_ALL_SUBMISSIONS();
  const row = all.find((s) => s.id === id);
  if (!row) return res.redirect("/employer/dashboard");

  const d = JSON.parse(row.form_data).data;

  // Block employers from viewing employed people (business rule)
  const hasJob =
    d.current_employment_1?.trim() || d.current_employment_2?.trim();
  if (hasJob) return res.redirect("/employer/dashboard");

  const candidate = {
    id: row.id,
    first_name: d.first_name || "",
    middle_name: d.middle_name || "",
    last_name: d.last_name || "",
    name: [d.first_name, d.middle_name, d.last_name].filter(Boolean).join(" "),
    email: d.email || "",
    age: Number(d.age) || null,
    date_of_birth: d.date_of_birth || "",
    barangay: d.barangay || "",
    skills: d.your_skills || "",
    prev_job_1: d.previous_employment_1 || "",
    prev_job_2: d.previous_employment_2 || "",
    want_job_1: d.future_employment_1 || "",
    want_job_2: d.future_employment_2 || "",
    elementary_education: d.elementary_education || "",
    high_school_education: d.high_school_education || "",
    college_education: d.college_education || "",
    course_taken: d.course_taken || "",
    date_added: row.date_added,
  };

  res.render("employer/candidate", {
    title: candidate.name + " | Employer",
    date: formatDate(new Date()),
    employer: await GET_EMPLOYER_BY_ID(req.employer_id),
    candidate,
  });
});

app.get("/form", async (req, res) => {
  const data = {
    title: "Submission Form",
    date: formatDate(new Date()),
  };

  res.render("admin/partials/submissionform", data);
});

app.get("/home", async (req, res) => {
  const data = {
    title: "Home",
    date: formatDate(new Date()),
  };

  res.render("home", data);
});

app.get("/", async (req, res) => {
  return res.redirect("/home");
});

//logout
app.get("/users/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.redirect("/users/login");
});

app.get("/admin/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.redirect("/admin/login");
});

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

// cdn
app.use("/cdn/", express.static(path.join(__dirname, "node_modules/")));
app.use(
  "/capturedincident/",
  express.static(path.join(__dirname, "captured_incident/")),
);

async function verifyAuth(req, res, next) {
  const excludedPaths = [
    "/home",
    "/admin/login",
    "/createacc",
    "/login",
    "/api/login",
    "/users/login",
    "/form",
    "/api/submitform",
    "/employer/login",
    "/employer/createacc",
  ];

  const normalize = (path) => path.replace(/\/+$/, "");
  const fullPath = normalize(req.baseUrl + req.path);
  console.log("Full Path:", fullPath);

  if (
    fullPath.includes("/api") ||
    excludedPaths.some((path) => fullPath.startsWith(normalize(path)))
  ) {
    return next();
  }

  // Skip auth for excluded paths
  if (excludedPaths.some((path) => fullPath.startsWith(normalize(path)))) {
    return next();
  }

  const token = req.cookies?.auth_token;
  console.log("Token:", token);

  if (!token) {
    console.log("No token found.");
    return respondUnauthorized(req, res);
  }

  let verify = await VERIFY_AUTH_USER(token);
  let role = verify ? "user" : null;
  console.log("Verify (User):", verify);

  if (!verify) {
    verify = await VERIFY_AUTH(token);
    if (verify) role = "admin";
    console.log("Verify (Admin):", verify);
  }

  if (!verify) {
    verify = await VERIFY_AUTH_EMPLOYER(token);
    if (verify) role = "employer";
    console.log("Verify (Employer):", verify);
  }

  if (!verify || !verify.id) {
    return respondUnauthorized(req, res);
  }

  // admin-only gate
  if (req.path.includes("/admin") && role !== "admin") {
    console.log("Access denied: non-admin tried to access admin page.");
    return res.redirect("/home");
  }

  // employer-only gate
  if (
    req.path.includes("/employer") &&
    role !== "employer" &&
    role !== "admin" &&
    !req.path.includes("/employer/login") &&
    !req.path.includes("/employer/createacc")
  ) {
    console.log("Access denied: non-employer tried to access employer page.");
    return res.redirect("/employer/login");
  }

  req.user_id = verify.id;
  req.employer_id = role === "employer" ? verify.id : null;
  req.role = role;
  next();
}

function respondUnauthorized(req, res) {
  if (
    req.method === "POST" ||
    req.xhr ||
    req.headers.accept?.includes("application/json")
  ) {
    return res.status(401).json({ message: "Invalid authentication" });
  }
  return res.redirect("/home");
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
