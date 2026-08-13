 /**
    // Add any other global setup logic here:
    // - Database initialization
    // - Test data preparation
    // - Environment configuration
    // - External service setup
    // - Start test servers
     */

import { FullConfig } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export default async function globalSetup(config: FullConfig) {
    /* Executed before all the workers start. Good place to keep one-off tasks before all workers start */
    console.log("--- STARTING GLOBAL SETUP ---");
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        const resultsDir = path.resolve(process.cwd(), "allure-results");
        if (fs.existsSync(resultsDir)) {
            fs.rmSync(resultsDir, { recursive: true, force: true });
            console.log(">> Deleted allure-results folder for clean local run.");
        }
    }
}


    //Get the login coockie
    process.env.LOGIN_COOKIE = undefined