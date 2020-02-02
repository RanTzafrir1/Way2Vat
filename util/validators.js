exports.validateDate = date => {
    this.date = new Date(date);
    return this.date instanceof Date && !isNaN(this.date);
}
