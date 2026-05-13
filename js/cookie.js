const cookiePopup = document.getElementById("cookiePopup");
const acceptCookies = document.getElementById("acceptCookies");

setTimeout(() => {
  if (!localStorage.getItem("cookiesAccepted")) {
    cookiePopup.style.display = "block";
  }
}, 5000);

acceptCookies &&
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookiePopup.style.display = "none";
  });
