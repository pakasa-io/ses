import 'reflect-metadata';

import {Container, Newable, ServiceIdentifier} from "inversify";

export * from 'inversify'

export const ioc = new Container({
  autobind: true,
  defaultScope: 'Singleton'
})

export const toConstant = <T>(id: ServiceIdentifier<T>, val: any) => ioc.bind<T>(id).toConstantValue(val)

export const toNew = <T>(id: ServiceIdentifier<T>, clz: Newable<T>) => ioc.bind<T>(id).to(clz)
export const toSelf = <T>(id: ServiceIdentifier<T>) => ioc.bind<T>(id).toSelf()

export const resolve = <T>(id: ServiceIdentifier<T>): T => ioc.get<T>(id)
export const resolveAll = <T>(id: ServiceIdentifier<T>): T[] => ioc.getAll<T>(id)

export const isBound = (id: ServiceIdentifier) => ioc.isBound(id)
export const has = isBound

export const reset = async (id: ServiceIdentifier) => ioc.unbind(id)
export const unbind = reset

export const resetAll = async (id: ServiceIdentifier) => ioc.unbindAll()
export const unbindAll = resetAll

