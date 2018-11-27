import { Dimensions } from 'react-native';
 
/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
export function msp(dim, limit) {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};
 
/**
 * Returns true if the screen is in portrait mode
 */
export function isPortrait() {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};
 
/**
 * Returns true of the screen is in landscape mode
 */
export function isLandscape() {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
 
/**
 * Returns true if the device is a tablet
 */
export function isTablet() {
    const dim = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};
 
/**
 * Returns true if the device is a phone
 */
export function isPhone() { return !isTablet(); }