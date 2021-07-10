const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const button = document.querySelector("button");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

button.addEventListener("click", (event) => {
  event.preventDefault();

  const location = search.value;
  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";
  //`http://localhost:3000/weather?location
  fetch(`/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });
});
