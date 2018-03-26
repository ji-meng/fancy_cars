/*
 * Validates that a prop is a component of a specific type
 */
export const oneOfComponents = (componentTypes, isRequired = false) => (
    props,
    propName,
    parentComponentName,
) => {
    const prop = props[propName]
    if (prop === null || prop === undefined) {
        return isRequired
            ? new Error(
                  `The prop \`${propName}\` is marked as required in ${parentComponentName} but its value is ${prop}.`,
              )
            : undefined
    }
    if (Array.isArray(prop)) {
        return new Error(
            `Invalid prop \`${propName}\` of type \`Array\` supplied to ${parentComponentName}, expected only one element.`,
        )
    }
    if (!componentTypes.includes(prop.type))
        return new Error(
            `Invalid prop \`${propName}\` of type \`${
                prop.type
            }\` supplied to ${parentComponentName}, expected one of [${componentTypes.map(
                c => `\`${c.name}\``,
            )}].`,
        )
    return undefined
}

/*
 * Validates that a prop is an Array that only contains specific component types
 */
export const areComponents = (componentTypes, isRequired = false) => (
    props,
    propName,
    parentComponentName,
) => {
    const prop = props[propName]
    if (prop === null || prop === undefined) {
        return isRequired
            ? new Error(
                  `The prop \`${propName}\` is marked as required in ${parentComponentName} but its value is ${prop}.`,
              )
            : undefined
    }
    if (!Array.isArray(prop)) {
        return new Error(
            `Invalid prop \`${propName}\` of type \`${
                prop.type
            }\` supplied to ${parentComponentName}, expected an \`Array\`.`,
        )
    }

    const invalidChild = prop.find(
        child => child !== null && !componentTypes.includes(child.type),
    )
    return invalidChild
        ? new Error(
              `Invalid child of prop \`${propName}\` of type \`${
                  invalidChild.type
              }\` supplied to ${parentComponentName}, expected all children to be one of [${componentTypes.map(
                  c => `\`${c.name}\``,
              )}].`,
          )
        : undefined
}
