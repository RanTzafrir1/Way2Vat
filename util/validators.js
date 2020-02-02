exports.validateDate = date => {
    console.log(date);
    this.date = new Date(date);
    return this.date instanceof Date && !isNaN(this.date);
}