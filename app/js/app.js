// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// COUNTDOWN HANDLE
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`July 01 ${currentYear} 00:00:00`);

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
}

// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// HANDLE API CONTENT PROTFILIO 
const renderContentPortfolio = async (API) => {
  try {
    const portfolioCardContainer = document.getElementById("portfolio-card");
    const renderPortfolioCart = (
      order,
      desc,
      name,
      avatar
    ) => `<div class="card-${order}1">
            <div class="bg18"></div>
            <img
              class="icoutline-format-quote-icon"
              alt=""
              src="./public/icoutlineformatquote.svg"
            />

            <div class="tincidunt-id-nibh6">
              ${desc}
            </div>
            <div class="profile">
              <div class="cameron-williamson-parent">
                <div class="cameron-williamson">Cameron Williamson</div>
                <div class="fx-trader">${name}</div>
              </div>
              <img
                class="profile-child"
                alt=""
                src="${avatar}"
              />
            </div>
          </div>`;
    const jsonData = await API.get("comments");

    // get 3 item first
    const listCart = jsonData?.slice(0, 3)?.map((ele, index) => {
      return renderPortfolioCart(
        index + 1,
        ele.description,
        ele.name,
        ele.avatar
      );
    });
    portfolioCardContainer.innerHTML = "";
    portfolioCardContainer.insertAdjacentHTML("afterbegin", listCart.join(""));
  } catch (error) {
    console.log(error);
  }
};
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// HANDLE API AVAILABLE CRYPTOS 
const renderAvailableCryptos = async (API) => {
  try {
    const availableCryptosSlider = document.getElementById(
      "available-cryptos-slider"
    );
    const renderAvailableCryptosCard = (order, name, desc, price, image) =>
      `<div class="card-${order}">
    <div class="component">
      <div class="bg10"></div>
      <div class="bitcoin5">${name}</div>
      <div class="tincidunt-id-nibh2">
        ${desc}
      </div>
      <div class="button">
        <b class="how-it-works">Trade now</b>
      </div>
    </div>
    <div class="image">
      <img class="bg-icon1" alt="" src="${image}" />

      <div class="bg11"></div>
    </div>
    <b class="k">${price}</b>
  </div>`;
    const availableCryptosData = await API.get("available_cryptos");
    // get 3 item first
    const listCart = availableCryptosData?.map((ele, index) => {
      return renderAvailableCryptosCard(
        index + 1,
        ele.name,
        ele.description,
        ele.price,
        ele.image
      );
    });

    // mock time loading
    setTimeout(() => {
      availableCryptosSlider.innerHTML = "";
      availableCryptosSlider.insertAdjacentHTML(
        "afterbegin",
        listCart.join("")
      );
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// HANDLE API AVAILABLE CRYPTOS 
window.onload = () => {
  const API = new FetchWrapper(
    "https://648b2fd517f1536d65ea8e47.mockapi.io/api/v1/"
  );
  Promise.all([renderContentPortfolio(API), renderAvailableCryptos(API)]);
  setInterval(updateCountdown, 1000);
  // Show spinner before countdown
  setTimeout(() => {
    loading.remove();
    countdown.style.display = "flex";
  }, 1000);
};
