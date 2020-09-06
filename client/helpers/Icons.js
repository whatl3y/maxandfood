export function commonClasses() {
  return {
    docusign: ['fas', 'fa-file-contract'],
    github: 'devicon-github-plain',
    google: 'devicon-google-plain',
    intuit: ['far', 'fa-clock'],
    o365: ['fab', 'fa-windows'],
    okta: ['far', 'fa-circle'],
  }
}

export function vendorClass(vendor) {
  return commonClasses()[vendor]
}
