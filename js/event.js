window.addEventListener("load", () => {
  const marker = document.querySelector("a-marker");
  const footer = document.getElementById("footer");
  const scan = document.getElementById("scan-here");

  marker.addEventListener("markerFound", () => {
    console.log("marker found");
    footer.style.display = "block";
    scan.style.display = "none";
  });
  marker.addEventListener("markerLost", () => {
    console.log("marker Lost");
    footer.style.display = "none";
    scan.style.display = "flex";
  });
});

AFRAME.registerComponent("click-handler", {
  init: function () {
    const el = this.el;

    const animations = ["Dance3", "Waving", "Wave2", "Dance4", "Dance5"];

    document.getElementsByTagName("canvas")[0].addEventListener("click", () => {
      const randomAnimation =
        animations[Math.floor(Math.random() * animations.length)];

      // Change the animation of the avatar
      el.setAttribute(
        "animation-mixer",
        `clip: ${randomAnimation}; loop: once;`
      );
      console.log(`Random animation selected: ${randomAnimation}`);
    });

    el.addEventListener("animation-finished", (event) => {
      console.log("Animation finished");
      const finishedAnimation = event.detail.action._clip.name; // Name of the finished animation

      // Transition to "StandIdle" after "Dance3" or "Waving"
      if (animations.includes(finishedAnimation)) {
        el.setAttribute("animation-mixer", "clip: StandIdle;");
        console.log(`Animation transitioned to: StandIdle`);
      }
    });
  },
});
