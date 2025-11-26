// List of all barangays in Pagadian City
const barangays = [
  "Alegria", "Balangasan", "Balintawak", "Baloyboan", "Banale", "Bogo", "Bomba",
  "Buenavista", "Bulatok", "Bulawan", "Dampalan", "Danlugan", "Dao", "Datagan",
  "Deborok", "Ditoray", "Dumagoc", "Gatas", "Gubac", "Gubang", "Kagawasan",
  "Kahayagan", "Kalasan", "Kawit", "La Suerte", "Lala", "Lapidian", "Lenienza",
  "Lizon Valley", "Lordes", "Lower Sibatang", "Lumad", "Lumbia", "Macasing",
  "Manga", "Muricay", "Napolan", "Palpalan", "Pedulonan", "Poloyagan", "San Francisco",
  "San Jose", "San Pedro", "Santiago", "Sta. Lucia", "Sta. Maria", "Sto. Niño",
  "Tawagan Sur", "Tiguma", "Tuburan", "Tulangan", "Tulawas", "Upper Sibatang", "White Beach"
];

// Simple arrays for names and skills
const firstNames = ["Juan", "Maria", "Pedro", "Ana", "Luis", "Carmen", "Rico", "Liza", "Mark", "Sophia"];
const lastNames = ["Cruz", "Santos", "Diaz", "Torres", "Mendoza", "Lopez", "Reyes", "Garcia", "Velasco", "Torres"];
const skills = ["Typing", "Cooking", "Customer Service", "Driving", "N/A"];
const courses = ["BS Information Systems", "BS Education", "BS Social Work", "BS Nursing", "BS Agriculture"];
const colleges = ["WMSU", "Southern Mindanao College", "Our Lady of Triumph Institute"];
const employments = ["", "DSWD", "Online seller", "Teacher", "Farmer", "Cashier", "Driver", "IT Support", "Nurse", "Manager"];

// Function to generate a random integer in a range
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Keep track of used emails
const usedEmails = new Set();

// Function to generate a fake submission
function generateSubmission() {
  let firstName, lastName, email;
  do {
    firstName = firstNames[randInt(0, firstNames.length - 1)];
    lastName = lastNames[randInt(0, lastNames.length - 1)];
    email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`;
  } while (usedEmails.has(email));
  usedEmails.add(email);

  const middleName = firstNames[randInt(0, firstNames.length - 1)];
  const dob = `${randInt(1970, 2005)}-${randInt(1,12).toString().padStart(2,'0')}-${randInt(1,28).toString().padStart(2,'0')}`;
  const age = randInt(20, 50);
  const barangay = barangays[randInt(0, barangays.length - 1)];
  const previousEmployment = employments[randInt(0, employments.length - 1)];
  const currentEmployment = employments[randInt(0, employments.length - 1)];
  const futureEmployment = employments[randInt(0, employments.length - 1)];
  const skill = skills[randInt(0, skills.length - 1)];
  const elementary = `${barangay} Elementary School`;
  const highSchool = `${barangay} High School`;
  const college = colleges[randInt(0, colleges.length - 1)];
  const course = courses[randInt(0, courses.length - 1)];
  const password = `pass${randInt(1000,9999)}`;
  
  const formData = {
    data: {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      date_of_birth: dob,
      age: age.toString(),
      barangay: barangay,
      previous_employment_1: previousEmployment,
      previous_employment_2: "",
      current_employment_1: currentEmployment,
      current_employment_2: "",
      future_employment_1: futureEmployment,
      future_employment_2: "",
      your_skills: skill,
      elementary_education: elementary,
      high_school_education: highSchool,
      college_education: college,
      course_taken: course,
      email: email,
      password: password
    }
  };

  return `(NULL, '${Math.random().toString(36).substring(2, 15)}', '${JSON.stringify(formData)}', '${email}', '${password}', NOW(), NOW())`;
}

// Generate multiple entries
const N = 100; // Number of rows
const entries = [];
for (let i = 0; i < N; i++) {
  entries.push(generateSubmission());
}

// Build full SQL INSERT statement
const sql = `INSERT INTO \`submissions\` (\`id\`, \`auth_token\`, \`form_data\`, \`email\`, \`password\`, \`date_modified\`, \`date_added\`) VALUES\n${entries.join(",\n")};`;

console.log(sql);
