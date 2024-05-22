var GlobalSlideNo;

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("successMessage").style.display = "block";

    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData.entries()));

    localStorage.setItem("username", formData.get("username"));
    localStorage.setItem("firstname", formData.get("firstname"));
    localStorage.setItem("lastname", formData.get("lastname"));
    localStorage.setItem("email", formData.get("email"));

    setTimeout(function () {
      window.location.href = "movies.html";
    }, 1000);
  });

function NextSlide(SlideNo) {
  event.preventDefault();
  if (!validateSlide(SlideNo)) {
    return;
  }
  GlobalSlideNo = SlideNo;
  if (SlideNo == 1) {
    document.querySelector(".GoBack").style.animation =
      "GoBackBtnVisible 0.25s ease";
    document.querySelector(".GoBack").onanimationend = function () {
      this.style.animation = "";
      this.style.left = "10px";
    };
  }

  document.querySelector("scroller").style.marginLeft =
    parseInt(
      window
        .getComputedStyle(document.querySelector("scroller"))
        .getPropertyValue("margin-left")
    ) -
    478 +
    "px";
  MoveIndicationBar(SlideNo);
}

function validateSlide(SlideNo) {
  let isValid = true;
  clearErrors();

  switch (SlideNo) {
    case 1:
      const username = document.querySelector('[name="username"]').value.trim();
      const firstname = document
        .querySelector('[name="firstname"]')
        .value.trim();
      const lastname = document.querySelector('[name="lastname"]').value.trim();
      if (username === "") {
        document.getElementById("usernameError").innerText =
          "Username is required.";
        isValid = false;
      }
      if (firstname === "") {
        document.getElementById("firstnameError").innerText =
          "First name is required.";
        isValid = false;
      }
      if (lastname === "") {
        document.getElementById("lastnameError").innerText =
          "Last name is required.";
        isValid = false;
      }
      break;
    case 2:
      const email = document.querySelector('[name="email"]').value.trim();
      if (email === "") {
        document.getElementById("emailError").innerText = "Email is required.";
        isValid = false;
      }
      break;
    case 3:
      const password = document.querySelector('[name="password"]').value.trim();
      const confirmPassword = document
        .querySelector('[name="confirm-password"]')
        .value.trim();
      if (password === "") {
        document.getElementById("passwordError").innerText =
          "Password is required.";
        isValid = false;
      }
      if (confirmPassword === "") {
        document.getElementById("confirmPasswordError").innerText =
          "Confirm password is required.";
        isValid = false;
      } else if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText =
          "Passwords do not match.";
        isValid = false;
      }
      break;
    default:
      isValid = false;
  }

  return isValid;
}

function clearErrors() {
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.innerText = ""));
}

IndicatorObj = {
  startVal: 0,
  EndVal: 25,
  currentWidth: 0,
};

function MoveIndicationBar(i) {
  var step = document.querySelectorAll(".steps")[i - 1];
  IndicatorObj.StepNo = i;
  IndicatorObj.EndVal = i * 25;
  ZerotoHeroWidth();
}

function ZerotoHeroWidth() {
  var bar = document.querySelector(".active");
  var step = document.querySelectorAll(".steps")[IndicatorObj.StepNo - 1];
  barStyle = parseInt(window.getComputedStyle(bar).width);
  if (IndicatorObj.currentWidth > IndicatorObj.EndVal / 2) {
    step.classList.add("PassedStep");
  }
  if (IndicatorObj.currentWidth < IndicatorObj.EndVal) {
    IndicatorObj.currentWidth += 1;
    bar.style.width = IndicatorObj.currentWidth + "%";
    window.requestAnimationFrame(ZerotoHeroWidth);
  }
}

function GoBack() {
  event.preventDefault();
  if (GlobalSlideNo < 2) {
    document.querySelector(".GoBack").style.animation =
      "GoBackBtnInvisible 0.25s ease";
    document.querySelector(".GoBack").onanimationend = function () {
      this.style.animation = "";
      this.style.left = "-50px";
    };
  }
  GlobalSlideNo -= 1;
  document.querySelector("scroller").style.marginLeft =
    parseInt(
      window
        .getComputedStyle(document.querySelector("scroller"))
        .getPropertyValue("margin-left")
    ) +
    478 +
    "px";
  document.querySelector(".GoBack").onclick = function () {
    event.preventDefault();
  };
  setTimeout(function () {
    document.querySelector(".GoBack").onclick = GoBack;
  }, 500);
  MoveIndicationBarMinus(GlobalSlideNo);
}

IndicatorObj = {
  startVal: 25,
  EndVal: 0,
  currentWidth: 0,
};

function MoveIndicationBarMinus(i) {
  IndicatorObj.StepNo = i;
  IndicatorObj.EndVal = i * 25;
  HerotoZeroWidth();
}

function HerotoZeroWidth() {
  var bar = document.querySelector(".active");
  var step = document.querySelectorAll(".steps")[IndicatorObj.StepNo - 1];
  barStyle = parseInt(window.getComputedStyle(bar).width);
  if (IndicatorObj.currentWidth > IndicatorObj.EndVal) {
    IndicatorObj.currentWidth -= 1;
    bar.style.width = IndicatorObj.currentWidth + "%";
    window.requestAnimationFrame(HerotoZeroWidth);
  }
}
