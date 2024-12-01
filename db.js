const mongoose = require('mongoose');

// MongoDB URI (use your own MongoDB URI)
const dbURI = 'mongodb+srv://ddrd7718:Jy5VLgXzovuNG16f@cluster0.ldkdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
