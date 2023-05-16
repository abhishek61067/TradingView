export const ordersColumns = [
  {
    label: 'Symbol',
    field: 'symbol'
  },
  {
    label: 'Side',
    field: 'trade_type'
  },
  {
    label: 'Type',
    field: 'order_type'
  },
  {
    label: 'Qty',
    field: 'unit'
  },
  {
    label: 'Price',
    field: 'current_market_price'
  },
  {
    label: 'Fill Price',
    field: 'fillPrice'
  },
  {
    label: 'Take Profit',
    field: 'take_profit'
  },
  {
    label: 'Stop Loss',
    field: 'stop_loss'
  },
  {
    label: 'Status',
    field: 'status'
  },
  {
    label: 'Commission',
    field: 'commission'
  },
  {
    label: 'Placing Time',
    field: 'created_on',
    type: 'date'
  },
  {
    label: 'Order id',
    field: 'id'
  },
  {
    label: 'Expiry',
    field: 'expiry_date'
  },
]

export const positionColumns = [
  {
    label: 'Symbol',
    field: 'symbol'
  },
  {
    label: 'Side',
    field: 'side'
  },
  {
    label: 'Qty',
    field: 'quantity'
  },
  {
    label: 'Avg Fill Price',
    field: 'avgFillPrice'
  },
  {
    label: 'Take Profit',
    field: 'profitPrice'
  },
  {
    label: 'Stop Loss',
    field: 'lossPrice'
  },
  {
    label: 'Last Price',
    field: 'ltp'
  },
  {
    label: 'Profit',
    field: 'profit'
  },
]

export const historyColumns = [
  {
    label: 'Symbol',
    field: 'symbol'
  },
  {
    label: 'Side',
    field: 'side'
  },
  {
    label: 'Type',
    field: 'type'
  },
  {
    label: 'Qty',
    field: 'quantity'
  },
  {
    label: 'Price',
    field: 'price'
  },
  {
    label: 'Fill Price',
    field: 'fillPrice'
  },
  {
    label: 'Status',
    field: 'status'
  },
  {
    label: 'Time',
    field: 'created_on'
  },
  {
    label: 'Order id',
    field: 'order_id'
  },
]

export const accountHistoryColumns = [
  {
    label: 'Time',
    field: 'created_on'
  },
  {
    label: 'Balance Before',
    field: 'balanceBefore'
  },
  {
    label: 'Balance After',
    field: 'balanceAfter'
  },
  {
    label: 'Profit',
    field: 'profit'
  },
  {
    label: 'Action',
    field: 'action'
  },
]
