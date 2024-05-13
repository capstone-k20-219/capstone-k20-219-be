"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = void 0;
function idGenerator(digits, id, pre = '') {
    const zeroNeeded = digits - id.toString().length;
    const zeros = '0'.repeat(zeroNeeded);
    return pre + zeros + id.toString();
}
exports.idGenerator = idGenerator;
//# sourceMappingURL=idGenerator.js.map