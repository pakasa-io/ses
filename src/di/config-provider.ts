import {toConstant} from "@/inversify.config";
import dotenv from 'dotenv';
import config from 'config'

dotenv.config()
export const DI_CONFIG = "config"
toConstant(DI_CONFIG, config)
