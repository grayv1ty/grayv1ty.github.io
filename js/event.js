window.addEventListener("load", () => {
  const marker = document.querySelector("a-marker");
  const footer = document.getElementById("footer");
  const scan = document.getElementById("scan-here");

  //   const avatar = document.getElementById("avatar");
  //   avatar.setAttribute("animation-mixer", "clip: Dance3;");

  marker.addEventListener("click", () => {
    console.log("test");
  });

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

    const animations = ["StandIdle", "Dance3", "Waving"];
    let currentAnimationIndex = 0;

    document.getElementById("scene").addEventListener("click", () => {
      // Toggle through animations
      currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
      const newAnimation = animations[currentAnimationIndex];

      // Change the animation of the avatar
      el.setAttribute("animation-mixer", `clip: ${newAnimation}`);
      console.log(`Animation changed to: ${newAnimation}`);
    });
  },
});
