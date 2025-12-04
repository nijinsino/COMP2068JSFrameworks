// Handlebars helper functions
//
module.exports = {
  formatDate: (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  },
  //here in this part of code conversts date into the original format
  formatDateInput: (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  //i have added a simple equality check helper
  eq: (a, b) => {
    return a === b;
  },

  gt: (a, b) => {
    return parseFloat(a) > parseFloat(b);
  },
  //this will outputs an object as a JSON string
  //useful for debugging
  json: (context) => {
    return JSON.stringify(context);
  },
  //this will format amount to two decimal places
  formatAmount: (amount) => {
    return parseFloat(amount).toFixed(2);
  }
};

