const loginform = document.getElementById('loginform');

if (loginform){
    loginform.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = loginform.querySelector('#loginemail').value;
        const password = loginform.querySelector('#loginpassword').value;
        
        const data = {
            email,
            password,
        };

        try {
            const response = await fetch('/admin/login', {
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
            if (result){
                loginform.reset();

                if (result.success){
                    showToast('success', result.message);
                    setTimeout(() => {
                        location.replace('/admin/dashboard');                            
                    }, 500);
                } else {
                    showToast('error', result.message);
                }
            } else {
                showToast('error', 'No result found.');
            }
                        console.log('Server response:', result);
        } catch (error) {
            showToast('error', error.message);
            console.error('Submit error:', error);
        }
    });
}