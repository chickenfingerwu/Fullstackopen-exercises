import React from 'react'

const Filter = ({onChange}) =>
  <div>
    <form>
      <div>
        filter shown with: <input onChange={onChange}/>
      </div>
    </form>
  </div>

export default Filter
