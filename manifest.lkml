project_name: "mob_looker_sidebar"

constant: VIS_LABEL {
  value: "Sidebar Navigation"
  export: override_optional
}

constant: VIS_ID {
  value: "mob_looker_sidebar"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  url: ""
  label: "@{VIS_LABEL}"
}
