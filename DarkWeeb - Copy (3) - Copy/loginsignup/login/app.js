const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Adding entry animations
document.addEventListener("DOMContentLoaded", function() {
    // Add loading animation class to logo
    const logo = document.querySelectorAll(".logo");
    logo.forEach(logo => {
        logo.classList.add("animate");
    });

    // Animate input fields
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach((field, index) => {
        field.style.animationDelay = `${0.1 * index}s`;
    });
});

// Sign up button event
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    
    // Reset animation for sign up form inputs
    const signUpInputs = document.querySelectorAll(".sign-up-form .input-field");
    signUpInputs.forEach((input, index) => {
        input.style.animation = "none";
        setTimeout(() => {
            input.style.animation = "";
        }, 10);
    });
});

// Sign in button event
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    
    // Reset animation for sign in form inputs
    const signInInputs = document.querySelectorAll(".sign-in-form .input-field");
    signInInputs.forEach((input, index) => {
        input.style.animation = "none";
        setTimeout(() => {
            input.style.animation = "";
        }, 10);
    });
});

// Button animation effect
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
    btn.addEventListener("mousedown", function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Form validation with visual feedback
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.querySelectorAll("input:not([type='submit'])");
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.parentElement.classList.add("error");
                
                // Add shake animation
                input.parentElement.classList.add("shake");
                setTimeout(() => {
                    input.parentElement.classList.remove("shake");
                }, 500);
                
                // Remove error state after a delay
                setTimeout(() => {
                    input.parentElement.classList.remove("error");
                }, 3000);
            } else {
                input.parentElement.classList.remove("error");
            }
        });
        
        if (isValid) {
            // Add success animation
            const btn = this.querySelector(".btn");
            btn.classList.add("success");
            
            // Simulate form submission
            setTimeout(() => {
                btn.classList.remove("success");
                alert("Form submitted successfully!");
                
                // Reset form
                this.reset();
            }, 1500);
        }
    });
});

// Create img directory and anime images if they don't exist
// This is just a placeholder - in a real project, you would have these files
console.log("Make sure to create an 'img' directory with anime-login.png and anime-register.png images");

// Add subtle floating animation to the panels
const panels = document.querySelectorAll(".panel");
panels.forEach(panel => {
    let yPos = 0;
    let direction = 1;
    
    function animatePanel() {
        yPos += 0.05 * direction;
        
        if (yPos > 5) {
            direction = -1;
        } else if (yPos < 0) {
            direction = 1;
        }
        
        panel.style.transform = `translateY(${yPos}px)`;
        requestAnimationFrame(animatePanel);
    }
    
    animatePanel();
}); 