import React from 'react'

function success({message}) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                {message}
            </div>
        </div>
    )
}

export default success
