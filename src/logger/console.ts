import {injectable} from "@/inversify.config";
import {Logger} from "@/logger/logger";

@injectable()
export class ConsoleLogger extends Logger{
  debug(...msg: any): any {
    console.debug(...msg)
  }

  error(...msg: any): any {
    console.error(...msg)
  }

  info(...msg: any): any {
    console.info(...msg)
  }

  log(...msg: any): any {
    console.log(...msg)
  }

  warn(...msg: any): any {
    console.warn(...msg)
  }
}
