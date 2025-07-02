const MAX_BUTTONS = 10; // Change as needed

function buildButtonOptions() {
  const options = {};
  for (let i = 1; i <= MAX_BUTTONS; i++) {
    options[`button${i}Label`] = {
      type: "string",
      label: `Button ${i}: Label`,
      section: "Config",
      default: `Dashboard ${i}`
    };
    options[`button${i}DashboardId`] = {
      type: "string",
      label: `Button ${i}: Dashboard ID`,
      section: "Config",
      default: i === 1 ? "2717" : i === 2 ? "1234" : ""
    };
    options[`button${i}FilterName`] = {
      type: "string",
      label: `Button ${i}: Filter Name (URL Key)`,
      section: "Config",
      default: ""
    };
    options[`button${i}FilterValueField`] = {
      type: "string",
      label: `Button ${i}: Filter Value Field (data key)`,
      section: "Config",
      default: ""
    };
    // Button styling in Style section
    options[`button${i}Bg`] = {
      type: "string",
      label: `Button ${i}: Background Color`,
      section: "Style",
      default: "#FA3C00"
    };
    options[`button${i}Color`] = {
      type: "string",
      label: `Button ${i}: Text Color`,
      section: "Style",
      default: "#FFFFFF"
    };
  }
  return options;
}

looker.plugins.visualizations.add({
  id: "dashboard_buttons",
  label: "Dashboard Buttons",
  options: {
    // CONFIG TAB (button logic) -- Number of Buttons FIRST!
    numButtons: {
      type: "number",
      label: "Number of Buttons",
      section: "Config",
      default: 2
    },
    buttonToConfigure: {
      type: "string",
      label: "Button to Configure (for reference)",
      section: "Config",
      display: "select",
      values: Array.from({length: MAX_BUTTONS}, (_, i) => ({[`${i+1}`]: `${i+1}`})),
      default: "1"
    },
    ...buildButtonOptions(),

    // STYLE TAB (container and button style)
    containerBg: {
      type: "string",
      label: "Container: Background Color",
      section: "Style",
      default: "#350051"
    },
    containerHeight: {
      type: "string",
      label: "Container: Height (e.g. 100%, 400px, auto)",
      section: "Style",
      default: "100%"
    },
    containerPadding: {
      type: "string",
      label: "Container: Padding",
      section: "Style",
      default: "24px"
    },
    containerBorderRadius: {
      type: "string",
      label: "Container: Border Radius",
      section: "Style",
      default: "12px"
    },
    containerBoxShadow: {
      type: "string",
      label: "Container: Box Shadow",
      section: "Style",
      default: "0 4px 16px rgba(53,0,81,0.10)"
    },
    buttonWidth: {
      type: "string",
      label: "Button Width (e.g. 100%, 220px, auto)",
      section: "Style",
      default: "100%"
    },
    buttonHeight: {
      type: "string",
      label: "Button Height (e.g. auto, 50px)",
      section: "Style",
      default: "auto"
    },
    buttonOrientation: {
      type: "string",
      label: "Button Layout",
      section: "Style",
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
    const numButtons = Math.max(1, Math.min(MAX_BUTTONS, config.numButtons || 2));
    const orientation = config.buttonOrientation || "vertical";
    const flexDirection = orientation === "horizontal" ? "row" : "column";
    const gap = orientation === "horizontal" ? "20px" : "16px";
    const logoUrl = "https://media.ffycdn.net/eu/mobile-de-gmbh/7MzGm13UnVynqPwoWPiF.svg";

    element.innerHTML = "";

    // Build container
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.background = config.containerBg;
    container.style.height = config.containerHeight || "100%";
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

    // Helper: Get value from data row by field name
    function getFieldValue(fieldName) {
      if (!fieldName) return '';
      const row = data[0];
      if (!row) return '';
      return (row[fieldName] && (row[fieldName].value !== undefined ? row[fieldName].value : row[fieldName])) || '';
    }

    // Add buttons
    for (let i = 1; i <= numButtons; i++) {
      const label = config[`button${i}Label`] || `Dashboard ${i}`;
      const dashId = config[`button${i}DashboardId`] || "";
      const bg = config[`button${i}Bg`] || "#FA3C00";
      const color = config[`button${i}Color`] || "#FFFFFF";
      const filterName = config[`button${i}FilterName`] || "";
      const filterValueField = config[`button${i}FilterValueField`] || "";
      const filterValue = getFieldValue(filterValueField);

      let url = `https://moblooker.cloud.looker.com/dashboards/${dashId}`;
      if (filterName && filterValue !== '') {
        const paramKey = encodeURIComponent(filterName);
        const paramValue = encodeURIComponent('"' + filterValue + '"');
        url += `?${paramKey}=${paramValue}`;
      }

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

      btn.addEventListener("mouseenter", function() {
        btn.style.background = "#d22c00";
      });
      btn.addEventListener("mouseleave", function() {
        btn.style.background = bg;
      });

      btn.addEventListener("click", function() {
        console.log("Dashboard link:", url);
        window.open(url, "_blank");
      });

      btnGroup.appendChild(btn);
    }

    container.appendChild(btnGroup);
    element.appendChild(container);

    // Log available fields for user reference
    if (data && data[0]) {
      console.log("Available field names for filter value:", Object.keys(data[0]));
    }

    done();
  }
});
