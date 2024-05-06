const log = console.log;
let queue = [];
let currentFloor = 1;

const floorButton = document.querySelectorAll(".el-button");
const goToButtons = document.querySelectorAll(".go-to");
const elevator = document.querySelector(".elevator");

for (const button of floorButton) {
  button.addEventListener("click", async function () {
    const floorNumber = parseInt(this.getAttribute("data-floor"));
    await goToFloor(floorNumber);
  });
}

for (const goTo of goToButtons) {
  goTo.addEventListener("click", function () {
    const floorNumber = parseInt(this.getAttribute("data-go"));
    queue.push(floorNumber);
    sortQueue();
  });
}

async function goToFloor(floorNumber) {
  const elPosition = (250 * floorNumber) - 250 + 4;
  elevator.style.bottom = `${elPosition}px`;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  currentFloor = floorNumber;
}

function sortQueue() {
  queue.sort((a, b) => {
    const currentDistanceA = Math.abs(currentFloor - a);
    const currentDistanceB = Math.abs(currentFloor - b);
    return currentDistanceA - currentDistanceB;
  });
}

setInterval(async () => {
  if (queue.length > 0) {
    const nextFloor = queue.shift();
    await goToFloor(nextFloor);
    sortQueue();
  }
}, 2000);
