import React from 'react'

export const CompanyImage = ({company}) => {
  return (
    <div id="company-details-item">
      <div id="company-image-container">
        <img id="company-image" src={company.image} />
      </div>
      {company.name}
    </div>
  )
}
