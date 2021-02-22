module.exports = {
  uri: process.env.DB_URI || 'mongodb://localhost:27017/api_jwt',
  options: {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
};