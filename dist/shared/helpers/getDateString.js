"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
function getDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
exports.getDateString = getDateString;
//# sourceMappingURL=getDateString.js.map