const mongoose = require('mongoose');

const uri = "mongodb+srv://mayankmotwani70:jiYuRa5ecM9T8FzB@mayankscluster.laokceb.mongodb.net/?retryWrites=true&w=majority";

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
