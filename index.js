looker.plugins.visualizations.add({
  id: "dashboard_buttons",
  label: "Dashboard Buttons",
  options: {
    numButtons: {
      type: "number",
      label: "Number of Buttons",
      section: "Buttons",
      default: 2
    },
    button1Label: {
      type: "string",
      label: "Button 1: Label",
      section: "Button 1",
      default: "Dashboard 1"
    },
    button1DashboardId: {
      type: "string",
      label: "Button 1: Dashboard ID",
      section: "Button 1",
      default: "2717"
    },
    button1Bg: {
      type: "string",
      label: "Button 1: Background Color",
      section: "Button 1",
      default: "#FA3C00"
    },
    button1Color: {
      type: "string",
      label: "Button 1: Text Color",
      section: "Button 1",
      default: "#FFFFFF"
    },
    button2Label: {
      type: "string",
      label: "Button 2: Label",
      section: "Button 2",
      default: "Dashboard 2"
    },
    button2DashboardId: {
      type: "string",
      label: "Button 2: Dashboard ID",
      section: "Button 2",
      default: "1234"
    },
    button2Bg: {
      type: "string",
      label: "Button 2: Background Color",
      section: "Button 2",
      default: "#FA3C00"
    },
    button2Color: {
      type: "string",
      label: "Button 2: Text Color",
      section: "Button 2",
      default: "#FFFFFF"
    },
    containerBg: {
      type: "string",
      label: "Container: Background Color",
      section: "Container",
      default: "#350051"
    },
    containerPadding: {
      type: "string",
      label: "Container: Padding",
      section: "Container",
      default: "24px"
    },
    containerBorderRadius: {
      type: "string",
      label: "Container: Border Radius",
      section: "Container",
      default: "12px"
    },
    containerBoxShadow: {
      type: "string",
      label: "Container: Box Shadow",
      section: "Container",
      default: "0 4px 16px rgba(53,0,81,0.10)"
    },
    buttonWidth: {
      type: "string",
      label: "Button Width (e.g. 100%, 220px, auto)",
      section: "Button Style",
      default: "100%"
    },
    buttonHeight: {
      type: "string",
      label: "Button Height (e.g. auto, 50px)",
      section: "Button Style",
      default: "auto"
    },
    buttonOrientation: {
      type: "string",
      label: "Button Layout",
      section: "Button Style",
      display: "select",
      values: [
        {"Vertical (default)": "vertical"},
        {"Horizontal": "horizontal"}
      ],
      default: "vertical"
    }
  },

  create: function(element, config) {
    element.innerHTML = "";
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    const numButtons = Math.max(1, Math.min(10, config.numButtons || 2));
    const orientation = config.buttonOrientation || "vertical";
    const flexDirection = orientation === "horizontal" ? "row" : "column";
    const gap = orientation === "horizontal" ? "20px" : "16px";
    const logoUrl = "https://media.ffycdn.net/eu/mobile-de-gmbh/7MzGm13UnVynqPwoWPiF.svg";

    // Clean up previous event listeners by clearing the element
    element.innerHTML = "";

    // Build container
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.background = config.containerBg;
    container.style.padding = config.containerPadding;
    container.style.borderRadius = config.containerBorderRadius;
    container.style.boxShadow = config.containerBoxShadow;
    container.style.width = "100%";
    container.style.boxSizing = "border-box";

    // Logo
    const logo = document.createElement("img");
    logo.src = logoUrl;
    logo.alt = "Logo";
    logo.style.width = "120px";
    logo.style.maxWidth = "100%";
    logo.style.height = "auto";
    logo.style.marginBottom = "24px";
    container.appendChild(logo);

    // Button group
    const btnGroup = document.createElement("div");
    btnGroup.style.display = "flex";
    btnGroup.style.flexDirection = flexDirection;
    btnGroup.style.gap = gap;
    btnGroup.style.justifyContent = "center";
    btnGroup.style.alignItems = "center";
    btnGroup.style.width = "100%";

    // Add buttons
    for (let i = 1; i <= numButtons; i++) {
      const label = config[`button${i}Label`] || `Dashboard ${i}`;
      const dashId = config[`button${i}DashboardId`] || "2717";
      const bg = config[`button${i}Bg`] || "#FA3C00";
      const color = config[`button${i}Color`] || "#FFFFFF";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.setAttribute("data-dash-id", dashId);

      // Style the button
      btn.style.width = config.buttonWidth || "100%";
      btn.style.minWidth = "120px";
      btn.style.maxWidth = "100%";
      btn.style.height = config.buttonHeight || "auto";
      btn.style.minHeight = "40px";
      btn.style.background = bg;
      btn.style.color = color;
      btn.style.border = "none";
      btn.style.borderRadius = "6px";
      btn.style.fontSize = "1.1em";
      btn.style.fontFamily = "inherit";
      btn.style.fontWeight = "700";
      btn.style.letterSpacing = "0.5px";
      btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
      btn.style.transition = "background 0.2s";
      btn.style.margin = "0";
      btn.style.cursor = "pointer";
      btn.style.flex = "1 1 0%";
      btn.style.boxSizing = "border-box";

      // Mouse events for hover effect
      btn.addEventListener("mouseenter", function() {
        btn.style.background = "#d22c00";
      });
      btn.addEventListener("mouseleave", function() {
        btn.style.background = bg;
      });

      // Click event for dynamic URL and console log
      btn.addEventListener("click", function() {
        // Get URL params at click time, preferring parent window if allowed
        let params = "";
        try {
          params = window.parent.location.search || "";
          console.log("parent:", params);
        } catch (e) {
          params = window.location.search || "";
          console.log("locale:", params);
        }
        const url = `https://moblooker.cloud.looker.com/dashboards/${dashId}${params}`;
        
        console.log("Data:", data[0]);
        const dim = data[0]['sales_team'].value;
         console.log("Data:", dim);
        
        console.log("Dashboard link:", url);
        console.log("Params:", params);
        window.open(url, "_blank");
      });

      btnGroup.appendChild(btn);
    }

    container.appendChild(btnGroup);
    element.appendChild(container);

    done();
  }
});
