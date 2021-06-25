const schema = require("./app/models/rf.js");

for(x in schema){
   // console.log(x+': this.rf.'+x+',');
   console.log('<div class="form-group"><label for="'+x+'">'+x+'</label><input type="text" class="form-control" id="'+x+'" [(ngModel)]="rf.'+x+'" name="'+x+'" /></div>');

}