import { CONFIG } from "../config";
import { IOptionalLogParams } from "../interfaces/IOptionalLogParams";
import * as fs from 'fs';
import * as path from 'path';
import { Helper } from "./helper";

export class Logger {

    /**
     * Loads the current LogLevel from CONFIG
     * @returns The current LogLevel as string
     */
    static getLogLevel(): 'CRITICAL' | 'DEBUG' | 'ALL' {
        switch(CONFIG.LOGLEVEL) {
            case 'CRITICAL':
                return 'CRITICAL'
            case 'DEBUG':
                return 'DEBUG'
            case 'ALL':
                return 'ALL'
            default:
                return 'CRITICAL'
        }
    }

    static logIntoFile(text: string) {
       fs.appendFileSync(path.resolve('.') + '/log/baseapi.log', text + '\n'); 
    }

    /**
     * Builds the string wich will be printed in console for logentries later
     * @param text the main log-text
     * @param params optional: all additional params
     * @returns a string containing the full console-friendly logentry
     */
    static preBuildLogText(text: string, params?: IOptionalLogParams) {
        const currentDate = Helper.formatDateConsole(new Date(Date.now()));
        if(params) {
            return `${currentDate} ${params.category ? '[' + params.category + ']' : ''}: ${text} ${params.additionalInfo ? ' | More Info: ' + JSON.stringify(params.additionalInfo) + '' : ''}`
        } else {
            return `${currentDate}: ${text}`;
        }
    }

    /**
     * Logs only if LOGLEVEL is ALL
     * @param text Text to log
     * @param params Additional Parameters
     */
    static log(text: string, params?: IOptionalLogParams) {
        if(Logger.getLogLevel() == 'ALL') {
            console.log('[' + CONFIG.SYSTEM_NAME + ']' + Logger.preBuildLogText(text, params))
        }
        Logger.logIntoFile(Logger.preBuildLogText(text, params));
    }

    /**
     * Logs if LOGLEVEL is ALL or DEBUG
     * @param text Text to log
     * @param params Additional Parameters
     */
    static debug(text: string, params?: IOptionalLogParams) {
        if(Logger.getLogLevel() == 'ALL' || Logger.getLogLevel() == 'DEBUG') {
            console.log('[' + CONFIG.SYSTEM_NAME + '] ' + Logger.preBuildLogText(text, params))
        }
        Logger.logIntoFile(Logger.preBuildLogText(text, params));
    }

    /**
     * Logs if LOGLEVEL is ALL, DEBUG or CRITICAL
     * @param text Text to log
     * @param params Additional Parameters
     */
    static warn(text: string, params?: IOptionalLogParams) {
        if(Logger.getLogLevel() == 'ALL' || Logger.getLogLevel() == 'DEBUG' || Logger.getLogLevel() == 'CRITICAL') {
            console.log('[' + CONFIG.SYSTEM_NAME + '] ' + Logger.preBuildLogText(text, params))
        }
        Logger.logIntoFile(Logger.preBuildLogText(text, params));
    }

     /**
     * Logs if LOGLEVEL is ALL, DEBUG or CRITICAL
     * @param text Text to log
     * @param params Additional Parameters
     */   
    static error(text: string, params?: IOptionalLogParams) {
        if(Logger.getLogLevel() == 'ALL' || Logger.getLogLevel() == 'DEBUG' || Logger.getLogLevel() == 'CRITICAL') {
            console.log('[' + CONFIG.SYSTEM_NAME + '] ' + Logger.preBuildLogText(text, params))
        }
        Logger.logIntoFile(Logger.preBuildLogText(text, params));
    }

    /**
     * Logs everytime.
     * @param text Text to log
     * @param params Additional Parameters
     */
    static ever(text: string, params?: IOptionalLogParams) {
        console.log('[' + CONFIG.SYSTEM_NAME + '] ' + Logger.preBuildLogText(text, params))
        Logger.logIntoFile(Logger.preBuildLogText(text, params));
    }
}