'use strict';

/**
 * Mirrors conventional-changelog-writer defaults but skips invalid dates
 * (avoids RangeError: Invalid time value in committerDate).
 */
function committerDate(date) {
    if (date == null || date === '') return;
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return;
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

module.exports = { committerDate };
