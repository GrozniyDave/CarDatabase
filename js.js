"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("Ready");
  get();
}
//posting to database
function post(newCar) {
  fetch("https://cardatabase-95e9.restdb.io/rest/cars", {
    method: "post",
    body: JSON.stringify(newCar),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceacccac6621685acbac7",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      //IMPORTANT! enables button when the data was
      //  POSTED(yeah,right here)
      form.elements.submit.disabled = false;
      showCar(data);
    });
}
//getting data and initiate show function
function get() {
  fetch("https://cardatabase-95e9.restdb.io/rest/cars", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceacccac6621685acbac7",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach(showCar);
      document.querySelector(".fullscreen").remove();
    });
}
//displays car database on page
function showCar(car) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = car.company.toUpperCase();
  clone.querySelector("h2").textContent = "Model: " + car.model.toUpperCase();
  clone.querySelector("h3").textContent = "Color: " + car.color.toUpperCase();
  clone.querySelector("p").textContent = car.horse_power + " HorsePower";
  clone.querySelector("article").dataset.id = car.id;
  clone
    .querySelector(".carImg")
    .setAttribute("src", "images/" + car.company.toLowerCase() + ".png");
  clone.querySelector(".remove").addEventListener("click", e => {
    e.target.parentElement.remove();
    remove(car._id);
  });
  document.querySelector("main").appendChild(clone);
}

//removes item(car) from database and show on site
function remove(id) {
  fetch("https://cardatabase-95e9.restdb.io/rest/cars/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceacccac6621685acbac7",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
//posting new car from filled form
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true;
  e.preventDefault();
  console.log("Submitted");
  const payload = {
    company: form.elements.cardealer.value,
    model: form.elements.carmodel.value,
    horse_power: form.elements.carpower.value,
    release_date: form.elements.caryear.value,
    color: form.elements.carcolor.value
  };
  console.log(payload);
  post(payload);
});

// function updateTextInput(val) {
//   document.getElementById("textInput").value = "You have chosen: " + val;
// }
// let email = document.getElementById("mail");

// email.addEventListener("input", function(event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I expect an e-mail, darling!");
//   } else {
//     email.setCustomValidity("");
//   }
// });

// // There are many ways to pick a DOM node; here we get the form itself and the email
// // input box, as well as the span element into which we will place the error message.

// var form = document.getElementsByTagName("form")[0];
// var email = document.getElementById("mail");
// var error = document.querySelector(".error");

// email.addEventListener(
//   "input",
//   function(event) {
//     // Each time the user types something, we check if the
//     // email field is valid.
//     if (email.validity.valid) {
//       // In case there is an error message visible, if the field
//       // is valid, we remove the error message.
//       error.innerHTML = ""; // Reset the content of the message
//       error.className = "error"; // Reset the visual state of the message
//     }
//   },
//   false
// );
// form.addEventListener(
//   "submit",
//   function(event) {
//     // Each time the user tries to send the data, we check
//     // if the email field is valid.
//     if (!email.validity.valid) {
//       // If the field is not valid, we display a custom
//       // error message.
//       error.innerHTML = "I expect an e-mail, darling!";
//       error.className = "error active";
//       // And we prevent the form from being sent by canceling the event
//       event.preventDefault();
//     }
//   },
//   false
// );
