const mediaSizes = {
    desktop: 1800,
    laptop: 1200,
    tablet: 900,
    phone: 600,
    smallPhone: 400,
}

const media = Object.keys(mediaSizes).reduce(
    (acc, label) => ({
        ...acc,
        [`${label}Down`]: `@media (max-width: ${mediaSizes[label]}px)`,
        [`${label}Up`]: `@media (min-width: ${mediaSizes[label]}px)`,
    }),
    {},
)
media.sizes = mediaSizes
media.between = (min, max) =>
    // Takes a min and a max size from media.sizes
    `@media (min-width: ${min}px) and (max-width: ${max}px)`

export default media
