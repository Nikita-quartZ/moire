export default function changeWord (number) {
  let amount = number % 100
  if (amount <= 20) {
    if (amount === 0 || (amount > 4 && amount <= 20)) {
      return 'товаров'
    } else if (amount === 1) {
      return 'товар'
    } else if (amount > 1 && amount < 5) {
      return 'товара'
    }
  } else {
    amount = amount % 10
    if (amount === 0 || (amount > 4 && amount <= 9)) {
      return 'товаров'
    } else if (amount === 1) {
      return 'товар'
    } else if (amount > 1 && amount < 5) {
      return 'товара'
    }
  }
  return 'товаров'
}
