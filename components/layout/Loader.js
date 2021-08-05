import React from 'react'

const Loader = () => {
    return (
        <div className="row wrapper">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
