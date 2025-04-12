export abstract class Logger {
  abstract info(...msg: any): any

  abstract log(...msg: any): any

  abstract error(...msg: any): any

  abstract warn(...msg: any): any

  abstract debug(...msg: any): any
}

module.exports = Logger
