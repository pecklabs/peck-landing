const stages = [
  {
    name: "Egg",
    approvals: "0 of 3 approvals",
    text: "Waiting for the first review.",
    description: "A fresh PR is waiting for reviewers.",
    image: "assets/mascots/egg.png",
    alt: "Egg approval stage"
  },
  {
    name: "Chick",
    approvals: "1 of 3 approvals",
    text: "The first approval just landed.",
    description: "The PR hatched into a chick.",
    image: "assets/mascots/chick.png",
    alt: "Chick approval stage"
  },
  {
    name: "Chicken",
    approvals: "2 of 3 approvals",
    text: "One more approval before merge.",
    description: "Almost grown. Peck keeps watching for blockers.",
    image: "assets/mascots/chicken.png",
    alt: "Chicken approval stage"
  },
  {
    name: "Fried chicken",
    approvals: "3 of 3 approvals",
    text: "Fully approved and ready to merge.",
    description: "Done. The PR became chicken.",
    image: "assets/mascots/friedchicken.png",
    alt: "Fried chicken approval stage"
  }
];

const mascotImage = document.querySelector("#mascotImage");
const approvalLabel = document.querySelector("#approvalLabel");
const approvalText = document.querySelector("#approvalText");
const approvalStage = document.querySelector("#approvalStage");
const stageTitle = document.querySelector("#stageTitle");
const stageDescription = document.querySelector("#stageDescription");
const timelineSteps = [...document.querySelectorAll(".timeline-step")];

let currentStage = 0;

function renderStage(index) {
  const stage = stages[index];

  mascotImage.src = stage.image;
  mascotImage.alt = stage.alt;
  mascotImage.style.animation = "none";
  mascotImage.offsetHeight;
  mascotImage.style.animation = "";

  approvalLabel.textContent = stage.approvals;
  approvalText.textContent = stage.text;
  approvalStage.textContent = stage.name;
  stageTitle.textContent = stage.name;
  stageDescription.textContent = stage.description;

  timelineSteps.forEach((step, stepIndex) => {
    step.classList.toggle("done", stepIndex < index);
    step.classList.toggle("current", stepIndex === index);
  });
}

window.setInterval(() => {
  currentStage = (currentStage + 1) % stages.length;
  renderStage(currentStage);
}, 2200);
