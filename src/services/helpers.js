export const createProjectFormValidation = (formData) => {
  let errors = {}
  if (formData.projectName === '') {
    errors["projectName"] = "Needs to be filled in";
  }
  if (formData.projectDescription === '') {
    errors["projectDescription"] = "Needs to be filled in";
  }
  if (formData.projectImage === '') {
    errors["projectImage"] = "Needs to be filled in";
  }
  if (formData.projectType === '') {
    errors["projectType"] = "Needs to be filled in";
  }
  if (formData.creativeDeliverables === '') {
    errors["creativeDeliverables"] = "Needs to be filled in";
  }
  if (formData.projectUsers.length < 1) {
    errors["projectUsers"] = "Needs to include users";
  }
  if (formData.projectCampaign === '') {
    errors["projectCampaign"] = "Needs to include a campaign";
  }
  formData.deliverables.map( (deliverable, i) => {
    if( deliverable.description === '' ) {
      errors[`deliverable-${i}`] = "Needs to include a description";
    }
  })
  return errors
}


export const combineUsers = (allCompanyUsers, currentUsers) => {
  const companyUserIds = allCompanyUsers.map(users => {return users.id});
  const allUsers = allCompanyUsers;
  currentUsers.forEach( user => {
    if (!companyUserIds.includes(user.id)) {
      allUsers.push(user);
    }
  })
  return allUsers;
}

export const restrictCharToLength = (string, charLength) => {
  let x = string.split(' ')
  let length = 0
  let wordCount = 0
  while ( length < charLength && x.length <= wordCount ) {
    length += (x[wordCount].length + 1)
    wordCount++
  }

  return x.slice(0,wordCount+1).join(' ') + "\u2026"
}


export const sortDeliverableByData = (array) => {
  return array.sort( ( a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  })
}

export const createCampaignFormValidation = (formData) => {
  let errors = {}
  if (formData.name == ''){
    errors["name"] = "Needs to be filled in";
  }
  if (formData.description == ''){
    errors["description"] = "Needs to be filled in";
  }

  return errors
}


export const editProjectValidation = (data) => {
  let errors = {}
  if (data.projectName === '') {
    errors["projectName"] = "Needs to be filled in";
  }
  if (data.projectDescription === '') {
    errors["projectDescription"] = "Needs to be filled in";
  }
  if (data.projectType === '') {
    errors["projectType"] = "Needs to be filled in";
  }
  if (data.projectImage === '') {
    errors["projectImage"] = "Needs to be filled in";
  }
  return errors
}
