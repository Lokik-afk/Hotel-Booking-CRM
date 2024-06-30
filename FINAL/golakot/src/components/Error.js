import React from 'react'

function error({message}) {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {message}
            </div>
        </div>
    )
}

export default error
