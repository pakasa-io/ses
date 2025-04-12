import {resolve, isBound, reset, toNew} from '@/inversify.config'
import {beforeEach, describe, expect, it} from "vitest";
import {Logger} from "./logger";
import {ConsoleLogger} from "./console";

describe('ConsoleLogger', () => {
  let logger :Logger;

  beforeEach(async () => {
    if (isBound(Logger)) await reset(Logger);
    toNew(Logger, ConsoleLogger)

    logger = resolve<Logger>(Logger)
  })

  describe('IoC', () => {
    it('should be defined', () => {
      expect(logger).toBeInstanceOf(Logger)
    });
  })

  describe('debug()', () => {
    it('should write debug log messages', () => {
      logger.debug('message')
    });
  })

  describe('info()', () => {
    it('should write info log messages', () => {
      logger.info('message')
    });
  })

  describe('error()', () => {
    it('should write error log messages', () => {
      logger.error('message')
    });
  })

  describe('warn()', () => {
    it('should write warn log messages', () => {
      logger.warn('message')
    });
  })

  describe('log()', () => {
    it('should write log log messages', () => {
      logger.log('message')
    });
  })
})
