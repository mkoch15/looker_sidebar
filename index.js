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
    // Button 1 config
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
      default: "#FA3C00" // Orange-Red
    },
    button1Color: {
      type: "string",
      label: "Button 1: Text Color",
      section: "Button 1",
      default: "#FFFFFF"
    },
    // Button 2 config
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
    // Container styling
    containerBg: {
      type: "string",
      label: "Container: Background Color",
      section: "Container",
      default: "#350051" // Purple
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
    }
  },

  create: function(element, config) {
    element.innerHTML = "";
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    const numButtons = Math.max(1, Math.min(10, config.numButtons || 2));
    // Logo section
    const logoUrl = "https://media.ffycdn.net/eu/mobile-de-gmbh/7MzGm13UnVynqPwoWPiF.svg";
    let html = `
      <div style="display:flex; flex-direction:column; align-items:center; background:${config.containerBg}; padding:${config.containerPadding}; border-radius:${config.containerBorderRadius}; box-shadow:${config.containerBoxShadow};">
        <img src="${logoUrl}" alt="Logo" style="width:120px; margin-bottom:24px;" />
        <div style="display:flex; gap:20px; justify-content:center; align-items:center;">
    `;

    // Get current URL params
    const urlParams = window.location.search || "";

    for (let i = 1; i <= numButtons; i++) {
      const label = config[`button${i}Label`] || `Dashboard ${i}`;
      const dashId = config[`button${i}DashboardId`] || "2717";
      const bg = config[`button${i}Bg`] || "#FA3C00";
      const color = config[`button${i}Color`] || "#FFFFFF";
      const link = `https://moblooker.cloud.looker.com/dashboards/${dashId}${urlParams}`;

      html += `
        <a href="${link}" target="_blank" style="
          display: inline-block;
          padding: 14px 32px;
          background: ${bg};
          color: ${color};
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-size: 1.1em;
          font-family: inherit;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          transition: background 0.2s;
        " onmouseover="this.style.background='#d22c00'" onmouseout="this.style.background='${bg}'">
          ${label}
        </a>
      `;
    }

    html += `</div></div>`;
    element.innerHTML = html;
    done();
  }
});
