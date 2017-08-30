// Kevin Sheehy
// Marketo coding challenge

var fs = require('fs');
var leads = require('./leads.json').leads;

// I had previously written an implementation of merge sort, and I adapted it to this problem.
const mergeSort = (arr, field) => {
  if (arr.length === 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2);
  var half1 = arr.slice(0, middle);
  var half2 = arr.slice(middle);

  return merge(mergeSort(half1, field), mergeSort(half2, field), field);
};
const merge = (left, right, field) => {
  var results = [];
  var i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if(left[i][field] < right[j][field]) {
      results.push(left[i++]);
    } else {
      results.push(right[j++]);
    }
  }
  return results.concat(left.slice(i)).concat(right.slice(j));
};



// Log changes for each updated lead
const logChange = (oldLead, newLead) => {
  console.log('');
  console.log('Field Change(s):');
  for (let k in oldLead) {

    // If field value has not changed, just log the field's value
    // Else if field value has changed, log the different values in the format (old => new)
    console.log(k + ": '" + (oldLead[k] === newLead[k] ? oldLead[k] : oldLead[k] + "' => '" + newLead[k]) + "'");
  }
};

//Log initial list
console.log('Original Leads List:');
console.log(leads);

//perform a stable sort by entryDate (earliest to latest)
leads = mergeSort(leads, 'entryDate');

// Iterate through integers representing leads, from top (0) to second-to-bottom of list (leads.length - 2)
for (let i = 0; i < leads.length - 1; i++) {

  // Iterate through integers representing leads more recent than leads[i]
  for (let j = i + 1; j < leads.length; j++) {

    // If leads[i] and leads[j] have a common _id or email...
    if (leads[j]._id === leads[i]._id || leads[j].email === leads[i].email) {
      
      //...log the field changes
      logChange(leads[i], leads[j]);

      //...remove the earlier entry (or entry with same timestamp but appearing later in the list), always leads[i] because list is sorted chronologically
      leads.splice(i, 1);

      //...with old lead removed, leads[i] now represents the next lead to compare
      //...but j must be reset (will become i + 1) in next for loop iteration
      j = i;
    }
  }
}

// Log final, deduplicated list
console.log('');
console.log('Deduplicated Leads List:');
console.log(leads);

fs.writeFile('deduplicatedLeads.json', JSON.stringify({ leads: leads }, null, 2), 'utf8');
