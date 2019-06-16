const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = Wallet = mongoose.model('wallets', WalletSchema);
