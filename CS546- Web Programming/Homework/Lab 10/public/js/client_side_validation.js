// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

document.addEventListener('DOMContentLoaded', function() {
    const form= document.getElementById('registration-form');
    const er= document.getElementById('error-container');
    if (!er) {
        console.error('Error container not found on the page. Please add an element with the id "error-container".');
        return;
    }

    form.addEventListener('submit', function(ev) {
        
        let allE= [];
        const fN= document.getElementById('firstName').value.trim();
        const lN= document.getElementById('lastName').value.trim();
        const un= document.getElementById('username').value.trim();
        const pss= document.getElementById('password').value;
        const cP= document.getElementById('confirmPassword').value;
        const fQ= document.getElementById('favoriteQuote').value.trim();
        const theme= document.getElementById('themePreference').value.trim();
        const rle= document.getElementById('role').value.trim();
        if (!fN) {
            allE.push("First name is required.");
        }
        if (!lN) {
            allE.push("Last name is required.");
        }
        if (!un) {
            allE.push("Username is required.");
        }
        if (!pss) {
            allE.push("Password is required.");
        }
        if (!cP) {
            allE.push("Confirm password is required.");
        }
        if (!fQ) {
            allE.push("Favorite quote is required.");
        }
        if (!theme) {
            allE.push("Theme preference is required.");
        }
        if (!rle) {
            allE.push("Role is required.");
        }

        if (!/^[a-zA-Z]{2,25}$/.test(fN)) {
            allE.push("Invalid first name. Only alphabetic characters allowed, and must be 2 to 25 characters long.");
        }
        if (!/^[a-zA-Z]{2,25}$/.test(lN)) {
            allE.push("Invalid last name. Only alphabetic characters allowed, and must be 2 to 25 characters long.");
        }
        if (!/^[a-zA-Z0-9]{5,10}$/.test(un)) {
            allE.push("Invalid username. Must be 5 to 10 characters long and can include numbers.");
        }
        if (pss !== cP) {
            allE.push("Passwords do not match.");
        }
        const pp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!pp.test(pss)) {
            allE.push("Invalid password, as it is not at least 8 characters long with one uppercase letter, one lowercase letter, one number, or one special character.");
        }
        const vT= ['light', 'dark'];
        const curr= theme.toLowerCase();
        if (!vT.includes(curr)) {
            if (curr=== '') {
                allE.push("Theme preference cannot be empty.");
            }
            else {
                allE.push(`Invalid theme preference. Must be 'light' or 'dark'. Your input was '${curr}'.`);
            }
        }
        const vR= ['admin', 'user'];
        const userRole= rle.toLowerCase();
        if (!vR.includes(userRole)) {
            if (userRole=== '') {
                allE.push("Role cannot be empty.");
            }
            else {
                allE.push(`Invalid role. Must be 'admin' or 'user'. Your input was '${userRole}'.`);
            }
        }
        if (allE.length> 0) {
            ev.preventDefault();
            er.innerHTML= '';
            er.classList.add('visible');
            const ul= document.createElement('ul');
            allE.forEach(function(error) {
                const li= document.createElement('li');
                li.textContent= error;
                ul.appendChild(li);
            });
            er.appendChild(ul);
        } else {
            er.classList.remove('visible');
        }
    });
});
