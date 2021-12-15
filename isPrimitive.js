import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

export default (val) => isNumber(val) || isString(val) || isBoolean(val) || isNil(val)
