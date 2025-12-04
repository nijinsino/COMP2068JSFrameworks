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
  //here in this part of code 
  formatDateInput: (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  eq: (a, b) => {
    return a === b;
  },
  
  gt: (a, b) => {
    return parseFloat(a) > parseFloat(b);
  },
  
  json: (context) => {
    return JSON.stringify(context);
  },
  
  formatAmount: (amount) => {
    return parseFloat(amount).toFixed(2);
  }
};

