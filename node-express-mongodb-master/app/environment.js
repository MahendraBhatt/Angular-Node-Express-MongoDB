module.exports = () => {
  var production = true;
  var baseurl = 'http://localhost:3000/';
  var dburl = 'mongodb://localhost:27017/RFIDDB';

  if (production == true) {
    baseurl = 'https://cloudasset.el.r.appspot.com/';
    dburl = 'mongodb+srv://mbhatt101:F22R@pt0r@cluster0.shejs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  }

  return {
    "baseurl": baseurl,
    "dburl": dburl
  };
};
