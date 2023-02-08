const storage = document.querySelector(".storage");
const transfer = document.querySelector(".transfer");
const storageLabel = document.querySelector("#storageLabel");
const transferLabel = document.querySelector("#transferLabel");
const graph = document.querySelector("#graph");

//
renderCost();
//

//
storage.addEventListener("input", storageChange);
transfer.addEventListener("input", transferChange);

//
function storageChange(e) {
  e.preventDefault();
  const buttonSsd = document.querySelector(".bunnyButtonSsd");
  const buttonHdd = document.querySelector(".bunnyButtonHdd");
  const buttonSingle = document.querySelector(".scalewaySingle");
  const buttonMulti = document.querySelector(".scalewayMulti");
  renderStorageLabel(e.currentTarget.value);
  if (
    buttonHdd.hasAttribute("disabled") &&
    buttonSingle.hasAttribute("disabled")
  ) {
    renderCost("Hdd", "single");
  }
  if (
    buttonHdd.hasAttribute("disabled") &&
    buttonMulti.hasAttribute("disabled")
  ) {
    renderCost("Hdd", "multi");
  }
  if (
    buttonSsd.hasAttribute("disabled") &&
    buttonSingle.hasAttribute("disabled")
  ) {
    renderCost("Ssd", "single");
  }
  if (
    buttonSsd.hasAttribute("disabled") &&
    buttonMulti.hasAttribute("disabled")
  ) {
    renderCost("Ssd", "multi");
  }
}
//
function transferChange(e) {
  e.preventDefault();
  const buttonSsd = document.querySelector(".bunnyButtonSsd");
  const buttonHdd = document.querySelector(".bunnyButtonHdd");
  const buttonSingle = document.querySelector(".scalewaySingle");
  const buttonMulti = document.querySelector(".scalewayMulti");
  renderTransferLabel(e.currentTarget.value);
  if (
    buttonHdd.hasAttribute("disabled") &&
    buttonSingle.hasAttribute("disabled")
  ) {
    renderCost("Hdd", "single");
  }
  if (
    buttonHdd.hasAttribute("disabled") &&
    buttonMulti.hasAttribute("disabled")
  ) {
    renderCost("Hdd", "multi");
  }
  if (
    buttonSsd.hasAttribute("disabled") &&
    buttonSingle.hasAttribute("disabled")
  ) {
    renderCost("Ssd", "single");
  }
  if (
    buttonSsd.hasAttribute("disabled") &&
    buttonMulti.hasAttribute("disabled")
  ) {
    renderCost("Ssd", "multi");
  }
}
//
function renderStorageLabel(value) {
  storageLabel.innerHTML = "";
  const inputValue = `<p>Storage: ${value}</p>`;
  storageLabel.innerHTML = inputValue;
}
//
function renderTransferLabel(value) {
  transferLabel.innerHTML = "";
  const inputValue = `<p>Transfer: ${value}</p>`;
  transferLabel.innerHTML = inputValue;
}
//
function renderCost(typeHardDisk = "Hdd", subscription = "single") {
  graph.innerHTML = "";
  //
  let backblaze;
  backblaze = storage.value * 0.005 + transfer.value * 0.01;
  if (Number(backblaze) <= 7) {
    backblaze = 7;
  }
  //
  let bunnyCost;
  let bunnyHtml;
  if (typeHardDisk == "Hdd") {
    bunnyCost = storage.value * 0.01 + transfer.value * 0.01;
    bunnyHtml = `<button class="bunnyButtonHdd button" type="button" disabled>HDD</button>
<button class="bunnyButtonSsd button" type="button">SSD</button>`;
  }
  if (typeHardDisk == "Ssd") {
    bunnyCost = storage.value * 0.02 + transfer.value * 0.01;
    bunnyHtml = `<button class="bunnyButtonHdd button" type="button" >HDD</button>
<button class="bunnyButtonSsd button" type="button" disabled>SSD</button>`;
  }

  if (bunnyCost >= 10) {
    bunnyCost = 10;
  }

  //
  let transferCost;
  let multy;
  let single;
  //
  if (transfer.value <= 75) {
    transferCost = 0;
  } else {
    transferCost = (transfer.value - 75) * 0.02;
  }
  //
  if (storage.value <= 75) {
    multy = 0;
    single = 0;
  } else {
    multy = (storage.value - 75) * 0.06;
    single = (storage.value - 75) * 0.03;
  }
  //
  let scalewayCost;
  let scalewayHtml;
  //
  if (subscription == "single") {
    scalewayCost = multy + transferCost;
    scalewayHtml = `<button class="scalewaySingle button" type="button" disabled>single</button>
<button class="scalewayMulti button" type="button">multi</button>`;
  }
  if (subscription == "multi") {
    scalewayCost = single + transferCost;
    scalewayHtml = `<button class="scalewaySingle button" type="button" >single</button>
<button class="scalewayMulti button" type="button" disabled>multi</button>`;
  }
  //

  let vultr;
  vultrCost = storage.value * 0.01 + transfer.value * 0.01;
  if (Number(vultr) <= 5) {
    vultr = 5;
  }
  const graphCost = `<section>
    <ul>
    <li>
    <p class="before">backblaze.com</p>
    <p class="backblaze" style="width:${backblaze * 3}px"></p>
    <p>${backblaze.toFixed(2)}$</p>
    </li>
    <li>${bunnyHtml}<p class="before">bunny.net</p>
     <p class="bunny" style="width:${
       bunnyCost * 3
     }px"></p><p>${bunnyCost.toFixed(2)}$</p></li>
    <li>${scalewayHtml}<p class="before">scaleway.com</p>
    <p class="scaleway" style="width:${
      scalewayCost * 3
    }px"></p><p>${scalewayCost.toFixed(2)}$</p></li>
    <li><p class="before">vultr.com</p>
    <p class="vultr" style="width:${
      vultrCost * 3
    }px"></p><p>${vultrCost.toFixed(2)}$</p></li>
    </ul>
    </section>`;
  graph.innerHTML = graphCost;
  //
  compareCost(backblaze, bunnyCost, scalewayCost, vultrCost);
  //
  const buttonSsd = document.querySelector(".bunnyButtonSsd");
  const buttonHdd = document.querySelector(".bunnyButtonHdd");
  buttonHdd.addEventListener("click", buttonHddEvent);
  buttonSsd.addEventListener("click", buttonSsdEvent);
  //
  const buttonSingle = document.querySelector(".scalewaySingle");
  const buttonMulti = document.querySelector(".scalewayMulti");
  buttonSingle.addEventListener("click", buttonSingleEvent);
  buttonMulti.addEventListener("click", buttonMultiEvent);
  function buttonHddEvent(e) {
    e.preventDefault();
    if (buttonSingle.hasAttribute("disabled")) {
      renderCost("Hdd", "single");
    } else {
      renderCost("Hdd", "multi");
    }
  }
  function buttonSsdEvent(e) {
    e.preventDefault();
    if (buttonSingle.hasAttribute("disabled")) {
      renderCost("Ssd", "single");
    } else {
      renderCost("Ssd", "multi");
    }
  }
  function buttonSingleEvent(e) {
    if (buttonHdd.hasAttribute("disabled")) {
      renderCost("Hdd", "single");
    } else {
      renderCost("Ssd", "single");
    }
  }
  function buttonMultiEvent(e) {
    if (buttonHdd.hasAttribute("disabled")) {
      renderCost("Hdd", "multi");
    } else {
      renderCost("Ssd", "multi");
    }
  }
}
//
function compareCost(backblaze, bunnyCost, scalewayCost, vultrCost) {
  if (
    backblaze > bunnyCost &&
    backblaze > scalewayCost &&
    backblaze > vultrCost
  ) {
    const backblaze = document.querySelector(".backblaze");
    backblaze.classList.add("chip");
  }
  if (
    bunnyCost > backblaze &&
    bunnyCost > scalewayCost &&
    bunnyCost > vultrCost
  ) {
    const bunny = document.querySelector(".bunny");
    bunny.classList.add("chip");
  }
  if (
    scalewayCost > backblaze &&
    scalewayCost > bunnyCost &&
    scalewayCost > vultrCost
  ) {
    const scaleway = document.querySelector(".scaleway");
    scaleway.classList.add("chip");
  }
  if (
    vultrCost > backblaze &&
    vultrCost > bunnyCost &&
    vultrCost > scalewayCost
  ) {
    const vultr = document.querySelector(".vultr");
    vultr.classList.add("chip");
  }
}
