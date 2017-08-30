// Kevin Sheehy
// Marketo coding challenge

var fs = require('fs');
var leads = require('./leads.json').leads;

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
