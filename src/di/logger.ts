import {isBound, toNew} from "@/inversify.config";
import {Logger} from "@/logger";
import {ConsoleLogger} from "@/logger/console";

if (!isBound(Logger)) toNew(Logger, ConsoleLogger)
