// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("loginUsername").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  if (username && password) {
    // Store login state
    sessionStorage.setItem("loggedInUser", username);
    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter valid credentials");
  }
});

// Handle Registration
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let regUsername = document.getElementById("registerUsername").value.trim();
  let regPassword = document.getElementById("registerPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!regUsername || !regPassword) {
    alert("Fill all required fields");
    return;
  }
  if (regPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Store registration data (demo only, normally backend)
  localStorage.setItem("registeredUser", regUsername);
  localStorage.setItem("registeredPass", regPassword);

  sessionStorage.setItem("loggedInUser", regUsername);
  // Redirect to dashboard
  window.location.href = "dashboard.html";
});



// JavaScript for Tab Switching, Login/Register (Username+Password or OTP)

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const formContents = document.querySelectorAll(".form-content");
  const messageDiv = document.getElementById("message");

  // Switch Tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      formContents.forEach((fc) => fc.classList.remove("active"));
      document.getElementById(tab.dataset.tab).classList.add("active");
      clearMessage();
      hideAllOTPContainers();
    });
  });

  // Elements
  const loginForm = document.getElementById("loginForm");
  const loginOTPContainer = document.getElementById("loginOTP");
  const verifyLoginOTPBtn = document.getElementById("verifyLoginOTP");
  const resendLoginOTP = document.getElementById("resendLoginOTP");

  const registerForm = document.getElementById("registerForm");
  const registerOTPContainer = document.getElementById("registerOTP");
  const verifyRegisterOTPBtn = document.getElementById("verifyRegisterOTP");
  const resendRegisterOTP = document.getElementById("resendRegisterOTP");

  // Helpers
  function clearMessage() {
    messageDiv.textContent = "";
    messageDiv.className = "message";
    messageDiv.style.display = "none";
  }
  function showMessage(text, type = "success") {
    messageDiv.textContent = text;
    messageDiv.className = `message show ${type}`;
    messageDiv.style.display = "block";
  }
  function hideAllOTPContainers() {
    loginOTPContainer.classList.remove("active");
    registerOTPContainer.classList.remove("active");
  }
  function collectOTPInputs(container) {
    return [...container.querySelectorAll(".otp-input")]
      .map((i) => i.value.trim())
      .join("");
  }
  function clearOTPInputs(container) {
    container.querySelectorAll(".otp-input").forEach((i) => (i.value = ""));
  }

  // Fake APIs
  function sendOTP(phone, context) {
    console.log(`Sending OTP for ${context} to ${phone}`);
    return new Promise((res) => setTimeout(() => res(true), 800));
  }
  function verifyOTP(phone, otp, context) {
    console.log(`Verifying OTP ${otp} for ${phone} (${context})`);
    return new Promise((res, rej) =>
      setTimeout(() => (otp === "123456" ? res(true) : rej("Invalid OTP")), 800)
    );
  }
  function fakeLogin(username, password) {
    return new Promise((res, rej) =>
      setTimeout(() => {
        if (username === "user" && password === "pass") res(true);
        else rej("Invalid username or password");
      }, 800)
    );
  }

  // Login Handling
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (username && password) {
      try {
        await fakeLogin(username, password);
        showMessage("Login successful via Username/Password!", "success");
      } catch (err) {
        showMessage(err, "error");
      }
    } else {
      showMessage("Enter Username and Password or use OTP option.", "error");
    }
  });

  // OTP Login Button
  document.getElementById("sendLoginOTP").addEventListener("click", async () => {
    clearMessage();
    const phone = document.getElementById("loginPhone").value.trim();
    if (!phone) return showMessage("Enter phone for OTP login", "error");
    const sent = await sendOTP(phone, "login");
    if (sent) {
      loginOTPContainer.classList.add("active");
      clearOTPInputs(loginOTPContainer);
      showMessage("OTP sent. Enter code 123456 to succeed.", "success");
    }
  });
  verifyLoginOTPBtn.addEventListener("click", async () => {
    clearMessage();
    const phone = document.getElementById("loginPhone").value.trim();
    const otp = collectOTPInputs(loginOTPContainer);
    if (otp.length !== 6) return showMessage("Enter the 6-digit OTP", "error");
    try {
      await verifyOTP(phone, otp, "login");
      showMessage("Login successful via OTP!", "success");
    } catch (err) {
      showMessage(err, "error");
    }
  });
  resendLoginOTP.addEventListener("click", async (e) => {
    e.preventDefault();
    const phone = document.getElementById("loginPhone").value.trim();
    if (!phone) return showMessage("Enter phone to resend OTP", "error");
    await sendOTP(phone, "login");
    showMessage("OTP resent successfully.", "success");
  });

  // Register Handling
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();
    const password = document.getElementById("registerPassword").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();
    if (password !== confirm) return showMessage("Passwords do not match", "error");

    showMessage("Registration successful (Username/Password)", "success");
  });

  document.getElementById("sendRegisterOTP").addEventListener("click", async () => {
    clearMessage();
    const phone = document.getElementById("registerPhone").value.trim();
    if (!phone) return showMessage("Enter phone for OTP registration", "error");
    const sent = await sendOTP(phone, "register");
    if (sent) {
      registerOTPContainer.classList.add("active");
      clearOTPInputs(registerOTPContainer);
      showMessage("OTP sent successfully.", "success");
    }
  });
  verifyRegisterOTPBtn.addEventListener("click", async () => {
    clearMessage();
    const phone = document.getElementById("registerPhone").value.trim();
    const otp = collectOTPInputs(registerOTPContainer);
    if (otp.length !== 6) return showMessage("Enter the 6-digit OTP", "error");
    try {
      await verifyOTP(phone, otp, "register");
      showMessage("Registration complete via OTP!", "success");
    } catch (err) {
      showMessage(err, "error");
    }
  });
  resendRegisterOTP.addEventListener("click", async (e) => {
    e.preventDefault();
    const phone = document.getElementById("registerPhone").value.trim();
    if (!phone) return showMessage("Enter phone to resend OTP", "error");
    await sendOTP(phone, "register");
    showMessage("OTP resent successfully.", "success");
  });

  // OTP Auto-advance
  document.querySelectorAll(".otp-input").forEach((input, idx, arr) => {
    input.addEventListener("input", (e) => {
      if (e.target.value && idx < arr.length - 1) arr[idx + 1].focus();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && idx > 0)
        arr[idx - 1].focus();
    });
  });
});
