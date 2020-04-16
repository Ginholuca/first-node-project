import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface TransactionCreate {
  title: string

  value: number

  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: TransactionCreate): Transaction {
    // TODO

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })
    return transaction
  }
}

export default CreateTransactionService
