document.addEventListener("DOMContentLoaded", () => {

  // Animate skill bars on scroll
  const skills = document.querySelectorAll(".skill-progress");
  let animated = false;

  function showSkills() {
    if (animated) return;

    skills.forEach(skill => {
      const position = skill.getBoundingClientRect().top;

      if (position < window.innerHeight - 100) {
        skill.style.width = skill.getAttribute("data-width");
        animated = true;
      }
    });
  }

  window.addEventListener("scroll", showSkills);

  // ================= CONTACT FORM =================
  document.getElementById('contactForm').addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    nameInput.classList.remove('input-error');
    emailInput.classList.remove('input-error');
    messageInput.classList.remove('input-error');

    let isValid = true;

    // validation
    if (name === "") {
      nameError.textContent = "Name is required";
      nameInput.classList.add("input-error");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      emailError.textContent = "Email is required";
      emailInput.classList.add("input-error");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Enter a valid email";
      emailInput.classList.add("input-error");
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Message is required";
      messageInput.classList.add("input-error");
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageInput.classList.add("input-error");
      isValid = false;
    }

    if (!isValid) return;

    // API URL (auto switch local / live)
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/api/contact"
        : "https://your-backend-url.onrender.com/api/contact"; // ⚠️ replace after deploy

    const btn = form.querySelector("button");

    try {
      btn.innerText = "Sending...";
      btn.disabled = true;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Failed to send message");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      btn.innerText = "Send Message";
      btn.disabled = false;
    }
  });

});