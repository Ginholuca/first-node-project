import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransaction {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulated, transaction) => {
      return transaction.type === 'income'
        ? accumulated + transaction.value
        : accumulated
    }, 0)

    const outcome = this.transactions.reduce((accumulated, transaction) => {
      return transaction.type === 'outcome'
        ? accumulated + transaction.value
        : accumulated
    }, 0)

    const total = income - outcome
    const balance = {
      income,
      outcome,
      total,
    }
    return balance
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const bill = this.getBalance()
    const transaction = new Transaction({ title, value, type })

    if (transaction.type === 'outcome') {
      if (transaction.value > bill.total) {
        throw Error('Ops. You do not have money.')
      }
    }
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
