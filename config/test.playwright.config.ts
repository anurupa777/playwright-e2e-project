import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config";
import {EnvConfig} from "../tests/helper/config-fixtures.ts"

export default defineConfig<EnvConfig>({
    ...baseConfig   //Brings all existing defineconfig  configuration
  });