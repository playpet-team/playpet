/// <reference types="express" />
import * as functions from 'firebase-functions';
export declare const helloWorld: functions.HttpsFunction;
export declare const userDetail: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response<any>) => void | Promise<void>) & functions.Runnable<any>;
