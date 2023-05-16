const GOAL_PLAN_TYPES = Object.freeze({
  DREAM_CAR: 'dream-car',
  DREAM_HOUSE: 'dream-house',
  VACATION: 'vacation-planning',
  CHILD_EDUCATION: 'child-education',
  CHILD_MARRAIGE: 'child-marriage',
  RETIREMENT: 'retirement-planning',
  WEALTH_CREATION: 'wealth-creation',
  SELF_EDUCATION: 'self-education',
  CUSTOM: 'custom',
})

const SOCKET_EVENTS = Object.freeze({
  GET_ACCOUNT: 'get_account_balance',
  SEND_ACCOUNT: 'send_account_balance',

  GETCOMPANYLIST: 'get_market_company',
  SENDCOMPANYLIST: 'send_market_company',
  ADDTOWATCHLIST: 'post_stock_watch_list',
  ADDEDTOWATCHLIST: 'send_stock_watch_list_add',
  GETWATCHLIST: 'get_stock_watch_list',
  SENDWATCHLIST: 'send_stock_watch_list',

  // GETWATCHPRICE: 'get market watch price',
  // SENDWATCHPRICE: 'send market watch price',


  REMOVEWATCH: 'delete_stock_watch_list',
  WATCHREMOVED: 'stock_watch_list_deleted',

  // TICKER
  // GET_LATEST_PRICE: 'get latest price',
  // SEND_LATEST_PRICE: 'send latest price',
  GET_COMPANY_INFO: 'get_company_info',
  SEND_COMPANY_INFO: 'send_company_info',

  CREATE_ORDER: 'save_trading_order',
  ORDER_CREATED: 'send_trading_order_save_success',
  GET_ORDER_LIST: 'get_trading_orders',
  SEND_ORDER_LIST: 'send_user_trading_orders',

  // ORDER_PROCESSED: 'order processed',
  // CHECK_MARKETLIVE: 'check is market live',
  // SEND_MARKETLIVE: 'send is market live',
  GET_POSITION_LIST: 'get_order_position',
  SEND_POSITION_LIST: 'send_user_trading_order_position',
  GET_HISTORY_LIST: 'get_trading_orders_history',
  SEND_HISTORY_LIST: 'send_trading_orders_history',
  GET_ACCOUNT_HISTORY_LIST: 'get_trading_balance_history',
  SEND_ACCOUNT_HISTORY_LIST: 'send_trading_balance_history',

  UPDATE_ORDER: 'update_trading_order',
  SEND_UPDATE_ORDER: 'send_trading_order_update_success',

  REMOVE_ORDER: 'remove_trading_order',
  SEND_REMOVE_ORDER: 'send_trading_order_remove_success',


  // ALERTS
  GET_ALERTS: 'get_stock_alerts',
  SEND_ALERTS: 'send_stock_alerts',
  SAVE_ALERT: 'save_stock_alert',
  SEND_SAVE_ALERT: 'stock_alert_saved',
  UPDATE_ALERT: 'update_stock_alert',
  SEND_UPDATE_ALERT: 'stock_alert_updated',
  REMOVE_ALERT: 'remove_stock_alert',
  ALERT_REMOVED: 'stock_alert_removed',

  // HOT LISTS
  GET_HOT_LISTS: 'get_market_hot_lists',
  SEND_HOT_LISTS: 'send_market_hot_lists',

  // Announcements
  GET_ANNOUNCEMENT: 'get_announcement',
  SEND_ANNOUNCEMENT: 'send_announcement',

  // Journal tab
  GET_JOURNAL: 'get_trading_journal',
  SEND_JOURNAL: 'send_trading_journal',
  
  SEND_LIVE_DATA: 'send_live_market',
  GET_MARKET_DEPTH: 'get_market_depth',
  SEND_MARKET_DEPTH: 'send_market_depth',
  
})

const PAPER_DEFAULTS = Object.freeze({
  TICK_VALUE: 0.1,
  DEFAULT_TICKS: 50
})

const USER_ID = 1

const USER_FORUM_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0NDQyMjE0LCJpYXQiOjE2NzI5MDYyMTQsImp0aSI6IjE1Njk4Y2IyZjQ3MTQ0ZTFiNWE3MWM3NjNmZGZhMzM1IiwidXNlcl9pZCI6Mn0.1BiX7idESIDyInmKiDUqhr2X8F5d93fFnveVn-zr-RM'


export {
  GOAL_PLAN_TYPES,
  SOCKET_EVENTS,
  PAPER_DEFAULTS,
  USER_ID,
  USER_FORUM_TOKEN
}
