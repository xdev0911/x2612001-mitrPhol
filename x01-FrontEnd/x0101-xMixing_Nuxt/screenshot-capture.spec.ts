/**
 * Screenshot Capture Script for xMixing Frontend
 * ================================================
 * Captures screenshots of all pages in the application.
 * 
 * Usage:
 *   npx playwright test screenshot-capture.spec.ts
 * 
 * Screenshots saved to: ./screenshots/
 */

import { test } from '@playwright/test';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = './screenshots';

// Test credentials
const TEST_USER = {
    email: 'cj@mitrphol.com',
    password: 'admin'
};

// All pages to capture
const PUBLIC_PAGES = [
    { name: '01-login', path: '/x80-UserLogin' },
    { name: '02-register', path: '/x81-UserRegister' },
];

const AUTH_PAGES = [
    { name: '03-dashboard', path: '/' },
    { name: '04-ingredient-intake', path: '/x10-IngredientIntake' },
    { name: '05-ingredient-config', path: '/x11-IngredientConfig' },
    { name: '06-intake-report', path: '/x13-IngredientIntakeReport' },
    { name: '07-sku-management', path: '/x20-Sku' },
    { name: '08-production-plan', path: '/x30-ProductionPlan' },
    { name: '09-plant-config', path: '/x30-ProductionPlan/plant-config' },
    { name: '10-pre-batch', path: '/x40-PreBatch' },
    { name: '11-user-config', path: '/x89-UserConfig' },
    { name: '12-server-status', path: '/x90-ServerStatus' },
];

test.describe('Screenshot Capture', () => {

    test.beforeAll(async () => {
        if (!fs.existsSync(SCREENSHOT_DIR)) {
            fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
        }
    });

    // Capture public pages
    for (const pageInfo of PUBLIC_PAGES) {
        test(`Capture ${pageInfo.name}`, async ({ page }) => {
            await page.goto(`${BASE_URL}${pageInfo.path}`);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);

            await page.screenshot({
                path: `${SCREENSHOT_DIR}/${pageInfo.name}.png`,
                fullPage: true
            });

            console.log(`✅ Captured: ${pageInfo.name}`);
        });
    }

    // Capture authenticated pages
    test('Capture authenticated pages', async ({ page }) => {
        // Go to login page
        await page.goto(`${BASE_URL}/x80-UserLogin`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // Fill login form using Quasar q-input (nested input inside q-input)
        // Find first input in the form for email
        const emailInput = page.locator('.q-input input').first();
        await emailInput.fill(TEST_USER.email);

        // Find password input
        const passwordInput = page.locator('.q-input input[type="password"]');
        await passwordInput.fill(TEST_USER.password);

        // Click login button
        await page.locator('.q-btn').filter({ hasText: /login/i }).click();

        // Wait for navigation
        await page.waitForTimeout(3000);

        // Check if we're logged in by looking at URL or content
        console.log('Current URL:', page.url());

        // Capture each authenticated page
        for (const pageInfo of AUTH_PAGES) {
            try {
                await page.goto(`${BASE_URL}${pageInfo.path}`);
                await page.waitForLoadState('networkidle');
                await page.waitForTimeout(2000); // Wait for data loading

                await page.screenshot({
                    path: `${SCREENSHOT_DIR}/${pageInfo.name}.png`,
                    fullPage: true
                });

                console.log(`✅ Captured: ${pageInfo.name}`);
            } catch (error) {
                console.log(`❌ Failed: ${pageInfo.name} - ${error}`);

                // Try to capture error state
                await page.screenshot({
                    path: `${SCREENSHOT_DIR}/${pageInfo.name}-error.png`,
                    fullPage: true
                });
            }
        }
    });
});
