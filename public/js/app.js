console.log("hii meezan mallick");

const getWeather = (location = "america") => {
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          document.getElementById("loading").style.display = "none";
          document.getElementById("output").innerHTML =
            "Temperature : " +
            data.forecast +
            "°C<br> Location : " +
            data.location;
        }
      });
    }
  );
};

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");

searchForm.addEventListener("submit", (e) => {
  document.getElementById("loading").style.display = "block";
    
  e.preventDefault();

  const location = searchInput.value;
  getWeather(location);
});
