let animating = false;

window.addEventListener("load", () => {
  const marker = document.querySelector("a-marker");
  const footer = document.getElementById("footer");
  const scan = document.getElementById("scan-here");
  const textContainer = document.querySelector("#tap-text-container");

  let timeoutID;

  marker.addEventListener("markerFound", () => {
    // console.log("marker found");
    footer.style.display = "block";
    scan.style.display = "none";

    if (timeoutID) clearTimeout(timeoutID);

    if (!animating) textContainer.setAttribute("visible", "true");

    timeoutID = setTimeout(() => {
      textContainer.setAttribute("visible", "false");
    }, 5000);
  });
  marker.addEventListener("markerLost", () => {
    // console.log("marker Lost");
    footer.style.display = "none";
    scan.style.display = "flex";
  });
});

AFRAME.registerComponent("click-handler", {
  init: function () {
    const el = this.el;

    const animations = ["Dance3", "Waving", "Wave2", "Dance4", "Dance5"];

    const nextAnimation = () => {
      const currentClip = el.getAttribute("animation-mixer")?.clip;
      //   console.log(currentClip);
      if (currentClip !== "StandIdle") return;

      animating = true;

      const randomAnimation =
        animations[Math.floor(Math.random() * animations.length)];

      // Change the animation of the avatar
      el.setAttribute(
        "animation-mixer",
        `clip: ${randomAnimation}; loop: once; crossFadeDuration: 0.4;`
      );
      console.log(`Random animation selected: ${randomAnimation}`);
    };

    document.getElementById("body").onclick = () => {
      //   console.log("Clicked");
      nextAnimation();
    };

    el.addEventListener("animation-finished", (event) => {
      //   console.log("Animation finished");
      animating = false;
      const finishedAnimation = event.detail.action._clip.name; // Name of the finished animation

      // Transition to "StandIdle" after "Dance3" or "Waving"
      if (animations.includes(finishedAnimation)) {
        el.setAttribute(
          "animation-mixer",
          "clip: StandIdle; crossFadeDuration: 0.4; loop: repeat;"
        );
        console.log(`Animation transitioned to: StandIdle`);
      }
    });
  },
});
