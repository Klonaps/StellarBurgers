import React from 'react'
import PropTypes from "prop-types";

const Subtitle = (props) => {
  return (
      <p className="text text_type_main-medium" style={{marginBottom: 24}}>
        {props.subtitle}
      </p>
  )
}

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired
}

export default Subtitle