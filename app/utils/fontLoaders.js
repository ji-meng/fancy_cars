import FontFaceObserver from 'fontfaceobserver'

const sourceSansProObserver = new FontFaceObserver('Source Sans Pro', {})
sourceSansProObserver.load().then(
    () => {
        document.body.classList.add('sourceSansProLoaded')
    },
    () => {
        document.body.classList.remove('sourceSansProLoaded')
    },
)

const octoberCondensedBoldObserver = new FontFaceObserver(
    'October Condensed Bold',
    {},
)
octoberCondensedBoldObserver.load().then(
    () => {
        document.body.classList.add('octoberCondensedBoldLoaded')
    },
    () => {
        document.body.classList.remove('octoberCondensedBoldLoaded')
    },
)
