const stages = [
  {
    name: "Egg",
    approvals: "0 of 3 approvals",
    mergeTitle: "Review in progress",
    mergeText: "Peck drafted a verdict — waiting on reviewers.",
    description: "A fresh PR is waiting for reviewers.",
    image: "assets/mascots/egg.png",
    alt: "Egg approval stage"
  },
  {
    name: "Chick",
    approvals: "1 of 3 approvals",
    mergeTitle: "1 approval in",
    mergeText: "First reviewer signed off. Two to go.",
    description: "The PR hatched into a chick.",
    image: "assets/mascots/chick.png",
    alt: "Chick approval stage"
  },
  {
    name: "Chicken",
    approvals: "2 of 3 approvals",
    mergeTitle: "Almost there",
    mergeText: "One more approval before it can merge.",
    description: "Almost grown. Peck keeps watching for blockers.",
    image: "assets/mascots/chicken.png",
    alt: "Chicken approval stage"
  },
  {
    name: "Fried chicken",
    approvals: "3 of 3 approvals",
    mergeTitle: "Ready to merge",
    mergeText: "All reviewers approved. Ship it.",
    description: "Done. The PR became chicken.",
    image: "assets/mascots/friedchicken.png",
    alt: "Fried chicken approval stage"
  }
];

const mascotImage = document.querySelector("#mascotImage");
const approvalLabel = document.querySelector("#approvalLabel");
const stageTitle = document.querySelector("#stageTitle");
const stageDescription = document.querySelector("#stageDescription");
const reviewers = [...document.querySelectorAll(".reviewer")];

let currentStage = 0;

function renderStage(index) {
  const stage = stages[index];

  mascotImage.src = stage.image;
  mascotImage.alt = stage.alt;
  mascotImage.style.animation = "none";
  mascotImage.offsetHeight;
  mascotImage.style.animation = "";

  approvalLabel.textContent = stage.approvals;
  stageTitle.textContent = stage.name;
  stageDescription.textContent = stage.description;

  // Reviewer i has approved once the approval count has passed them.
  reviewers.forEach((reviewer, reviewerIndex) => {
    reviewer.classList.toggle("approved", index > reviewerIndex);
  });
}

renderStage(currentStage);

window.setInterval(() => {
  currentStage = (currentStage + 1) % stages.length;
  renderStage(currentStage);
}, 2200);
