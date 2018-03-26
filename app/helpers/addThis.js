export const addAddThisScript = () => {
    const addthisScript = document.createElement('script')
    addthisScript.src =
        '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a3838cd0d852c64'
    addthisScript.async = true
    addthisScript.id = 'addThisScript'
    document.body.appendChild(addthisScript)
}

export const removeAddThisScript = () => {
    const addthisScript = document.getElementById('addThisScript')
    addthisScript.remove()
}
