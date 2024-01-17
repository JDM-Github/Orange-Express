particlesJS("particles", {
    particles: {
        number: {
        value: 30,
        density: {
          	enable: true,
          	value_area: 400
        }
      },
      color: {
        	value: "#555555"
      },
      shape: {
            type: "none"
      },
      line_linked: {
            enable: true,
        	distance: 150,
        	color: "#3388ff",
        	opacity: 0.5,
        	width: 1
      }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false
            },
            onclick: {
                enable: false
            },
            resize: false
        }
    }
});
