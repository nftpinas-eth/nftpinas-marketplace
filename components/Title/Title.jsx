import React from 'react'

const style = {
    title: ``,
    title_box: ``,
}

const Title = ({heading, paragraph}) => {
  return (
    <div className={style.title}>
        <div className={style.title_box}>
            <h2>{heading}</h2>
            <h1>{paragraph}</h1>
        </div>
    </div>
  )
}

export default Title