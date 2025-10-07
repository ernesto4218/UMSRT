const personalinfoform = document.getElementById('personalinfoform');
const jobform = document.getElementById('jobform');
const educationform = document.getElementById('educationform');
const accountform = document.getElementById('accountform');

const personalbtn = document.getElementById('personalbtn');
personalbtn.onclick = function() {
    hideallforms();
    personalbtn.classList.remove('text-gray-900', 'bg-white');
    personalbtn.classList.add('bg-blue-600', 'text-white');
    personalinfoform.classList.remove('hidden');

    jobbtn.classList.add('text-gray-900', 'bg-white');
    jobbtn.classList.remove('bg-blue-600', 'text-white');
    educationbtn.classList.add('text-gray-900', 'bg-white');
    educationbtn.classList.remove('bg-blue-600', 'text-white');
    accountbtn.classList.add('text-gray-900', 'bg-white');
    accountbtn.classList.remove('bg-blue-600', 'text-white');
};

const jobbtn = document.getElementById('jobbtn');
jobbtn.onclick = function() {
    hideallforms();
    jobform.classList.remove('hidden');

    jobbtn.classList.remove('text-gray-900', 'bg-white');
    jobbtn.classList.add('bg-blue-600', 'text-white');

    personalbtn.classList.add('text-gray-900', 'bg-white');
    personalbtn.classList.remove('bg-blue-600', 'text-white');
    educationbtn.classList.add('text-gray-900', 'bg-white');
    educationbtn.classList.remove('bg-blue-600', 'text-white');
    accountbtn.classList.add('text-gray-900', 'bg-white');
    accountbtn.classList.remove('bg-blue-600', 'text-white');
};

const educationbtn = document.getElementById('educationbtn');
educationbtn.onclick = function() {
    hideallforms();
    educationform.classList.remove('hidden');

    educationbtn.classList.remove('text-gray-900', 'bg-white');
    educationbtn.classList.add('bg-blue-600', 'text-white');

    personalbtn.classList.add('text-gray-900', 'bg-white');
    personalbtn.classList.remove('bg-blue-600', 'text-white');
    jobbtn.classList.add('text-gray-900', 'bg-white');
    jobbtn.classList.remove('bg-blue-600', 'text-white');
    accountbtn.classList.add('text-gray-900', 'bg-white');
    accountbtn.classList.remove('bg-blue-600', 'text-white');
};

const accountbtn = document.getElementById('accountbtn');
accountbtn.onclick = function() {
    hideallforms();
    accountform.classList.remove('hidden');

    accountbtn.classList.remove('text-gray-900', 'bg-white');
    accountbtn.classList.add('bg-blue-600', 'text-white');

    educationbtn.classList.add('text-gray-900', 'bg-white');
    educationbtn.classList.remove('bg-blue-600', 'text-white');
    personalbtn.classList.add('text-gray-900', 'bg-white');
    personalbtn.classList.remove('bg-blue-600', 'text-white');
    jobbtn.classList.add('text-gray-900', 'bg-white');
    jobbtn.classList.remove('bg-blue-600', 'text-white');
};
personalbtn.click();

function hideallforms(){
    jobform.classList.add('hidden');
    personalinfoform.classList.add('hidden');
    educationform.classList.add('hidden');
    accountform.classList.add('hidden');
}


personalinfoform.addEventListener('submit', async function(event) {
    event.preventDefault();

    const first_name = personalinfoform.querySelector('#first_name').value;
    const middle_name = personalinfoform.querySelector('#middle_name').value;
    const last_name = personalinfoform.querySelector('#last_name').value;
    const date_of_birth = personalinfoform.querySelector('#date_of_birth').value;
    const age = personalinfoform.querySelector('#age').value;
    const user_id = personalinfoform.querySelector('#user_id').value;

    const data = {
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        age,
        user_id
    };

    console.log(data);
    try {
        const response = await fetch('/api/update-user-personal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ✅ correct for JSON
            },
            body: JSON.stringify(data) // ✅ convert JS object to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            showToast('error', errorData.message || 'Unknown error');
            console.error('Server error:', errorData);
            return; 
        }

        const result = await response.json();
        showToast('success', result.message);
        console.log('Server response:', result);

        if (result.success){
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        showToast('error', error.message);
        console.error('Submit error:', error);
    }
});

jobform.addEventListener('submit', async function(event) {
    event.preventDefault();

    const previous_employment_1 = jobform.querySelector('#previous_employment_1').value;
    const previous_employment_2 = jobform.querySelector('#previous_employment_2').value;
    const current_employment_1 = jobform.querySelector('#current_employment_1').value;
    const current_employment_2 = jobform.querySelector('#current_employment_2').value;
    const future_employment_1 = jobform.querySelector('#future_employment_1').value;
    const future_employment_2 = jobform.querySelector('#future_employment_2').value;
    const user_id = jobform.querySelector('#user_id').value;

    
    const data = {
        previous_employment_1,
        previous_employment_2,
        current_employment_1,
        current_employment_2,
        future_employment_1,
        future_employment_2,
        user_id
    };

    try {
        const response = await fetch('/api/update-user-job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ✅ correct for JSON
            },
            body: JSON.stringify(data) // ✅ convert JS object to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            showToast('error', errorData.message || 'Unknown error');
            console.error('Server error:', errorData);
            return; 
        }

        const result = await response.json();
        showToast('success', result.message);
        console.log('Server response:', result);

        if (result.success){
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        showToast('error', error.message);
        console.error('Submit error:', error);
    }
});

educationform.addEventListener('submit', async function(event) {
    event.preventDefault();

    const elementary_education = educationform.querySelector('#elementary_education').value;
    const high_school_education = educationform.querySelector('#high_school_education').value;
    const college_education = educationform.querySelector('#college_education').value;
    const course_taken = educationform.querySelector('#course_taken').value;
    const user_id = educationform.querySelector('#user_id').value;

    const data = {
        elementary_education,
        high_school_education,
        college_education,
        course_taken,
        user_id
    };

    try {
        const response = await fetch('/api/update-user-education', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ✅ correct for JSON
            },
            body: JSON.stringify(data) // ✅ convert JS object to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            showToast('error', errorData.message || 'Unknown error');
            console.error('Server error:', errorData);
            return; 
        }

        const result = await response.json();
        showToast('success', result.message);
        console.log('Server response:', result);

        if (result.success){
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        showToast('error', error.message);
        console.error('Submit error:', error);
    }
});

accountform.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = accountform.querySelector('#email').value;
    const account_password = accountform.querySelector('#account_password').value;
    const user_id = accountform.querySelector('#user_id').value;
    const data = {
        email,
        account_password,
        user_id
    };

    try {
        const response = await fetch('/api/update-user-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ✅ correct for JSON
            },
            body: JSON.stringify(data) // ✅ convert JS object to JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            showToast('error', errorData.message || 'Unknown error');
            console.error('Server error:', errorData);
            return; 
        }

        const result = await response.json();
        showToast('success', result.message);
        console.log('Server response:', result);

        if (result.success){
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        showToast('error', error.message);
        console.error('Submit error:', error);
    }
});
const dobInput = document.getElementById('date_of_birth');
const ageInput = document.getElementById('age');

function calculateAge() {
    const dobValue = dobInput.value;

    if (dobValue) {
        const birthday = new Date(dobValue);
        const today = new Date();

        let age = today.getFullYear() - birthday.getFullYear();

        const monthDifference = today.getMonth() - birthday.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        ageInput.value = age >= 0 ? age : '';
    } else {
        ageInput.value = '';
    }
}

dobInput.addEventListener('change', calculateAge);
dobInput.addEventListener('input', calculateAge);

document.addEventListener('DOMContentLoaded', calculateAge);