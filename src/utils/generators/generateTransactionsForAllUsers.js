import { faker } from '@faker-js/faker';
import {
  closeMongoConnection,
  initMongoConnection,
} from '../../db/initMongoConnection.js';
import { UserCollection } from '../../db/models/User.js';
import { rndRange } from '../rndRange.js';
import { CategoryCollection } from '../../db/models/Category.js';
import { TransactionCollection } from '../../db/models/Transaction.js';

export class Transaction {
  constructor(userId, categories) {
    const { type, _id } = categories[rndRange(categories.length - 1)];

    this.type = type;
    this.category = _id;
    this.sum = { income: rndRange(3000, 10000), expense: rndRange(10, 500) }[
      type
    ];
    this.date = faker.date.between({ from: '2020-01-01', to: Date.now() });
    this.comment = faker.finance.transactionDescription();
    this.userId = userId;
  }
}

await initMongoConnection();
const users = await UserCollection.find();
const categories = await CategoryCollection.find();
const transactions = users
  .map(user =>
    Array(rndRange(500, 1000))
      .fill(0)
      .map(() => new Transaction(user._id, categories)),
  )
  .flat();
await TransactionCollection.create(transactions);
console.log(
  `${transactions.length} contacts have been added to the "contacts" collection of "contacts" mongodb`,
);
// console.log({ transactions });
closeMongoConnection();
