import {toSelf} from "@/inversify.config";
import {SESClient,} from '@aws-sdk/client-ses';

toSelf(SESClient)
