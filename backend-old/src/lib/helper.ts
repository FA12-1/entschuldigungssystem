import { Core } from "./core";
import * as datefns from 'date-fns';

export class Helper {
    core: Core;

    constructor(core: Core) {
        this.core = core;
    }

    isFirstStart(): boolean {
        return false;
    }

    firstStartActions() {
        // this function needs to wrap all jobs for the first start together.
        // it is also needed, that they run in an 
    }

    static formatDate(date: Date): string {
        return datefns.format(date, 'dd.MM.yyyy HH:mm:ss');
    }

    static formatDateConsole(date: Date): string {
        return datefns.format(date, 'dd.MM.yyyy HH:mm:ss.SSS')
    }
}