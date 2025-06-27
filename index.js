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

    // Responsive container and logo
    let html = `
      <div style="display:flex; flex-direction:column; align-items:center; background:${config.containerBg}; padding:${config.containerPadding}; border-radius:${config.containerBorderRadius}; box-shadow:${config.containerBoxShadow}; width:100%; box-sizing:border-box;">
        <img src="${logoUrl}" alt="Logo" style="width:120px; max-width:100%; height:auto; margin-bottom:24px;" />
        <div id="dashboard-button-group" style="display:flex; flex-direction:${flexDirection}; gap:${gap}; justify-content:center; align-items:center; width:100%;">
    `;

    // Buttons
    for (let i = 1; i <= numButtons; i++) {
      const label = config[`button${i}Label`] || `Dashboard ${i}`;
      const dashId = config[`button${i}DashboardId`] || "2717";
      const bg = config[`button${i}Bg`] || "#FA3C00";
      const color = config[`button${i}Color`] || "#FFFFFF";
      html += `
        <button
          type="button"
          class="looker-custom-dash-btn"
          data-dash-id="${dashId}"
          style="
            width: ${config.buttonWidth || "100%"};
            min-width: 120px;
            max-width: 100%;
            height: ${config.buttonHeight || "auto"};
            min-height: 40px;
            background: ${bg};
            color: ${color};
            border: none;
            border-radius: 6px;
            font-size: 1.1em;
            font-family: inherit;
            font-weight: 700;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.10);
            transition: background 0.2s;
            margin: 0;
            cursor: pointer;
            flex: 1 1 0%;
            box-sizing: border-box;
          "
          onmouseover="this.style.background='#d22c00'"
          onmouseout="this.style.background='${bg}'"
        >
          ${label}
        </button>
      `;
    }

    html += `</div></div>`;
    element.innerHTML = html;

    // Add event listeners for dynamic URL parameter handling and console logging
    Array.from(element.querySelectorAll(".looker-custom-dash-btn")).forEach(btn => {
      btn.onclick = function(e) {
        const dashId = btn.getAttribute("data-dash-id");
        const params = window.location.search || "";
        const url = `https://moblooker.cloud.looker.com/dashboards/${dashId}${params}`;
        console.log("Dashboard link:", url);
        window.open(url, "_blank");
      };
    });

    done();
  }
});
