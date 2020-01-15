/**
 * Joins arguments into a string producing a valid value for HTML class attribute.
 * Arguments other than non-empty strings are ignored.
 * @param parts Any type and number of arguments
 */
const joinClassNames = (...parts: Array<any>) => {
    return parts.filter(part => part && typeof part === 'string').join(' ');
};

export default joinClassNames;