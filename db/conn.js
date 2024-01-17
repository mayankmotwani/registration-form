const mongoose = require('mongoose');

const uri = "mongodb+srv://mayankmotwani70:fsDmn3g0JutGTz8F@mayankscluster.laokceb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to database');
});  
db.on('error', (err) => {
    console.error('Error in database connection:');
    console.log(err);
});
