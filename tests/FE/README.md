# Playwright Test Guide

This guide explains how to set up and run Playwright tests for this project.

## Setup
1. Install the dependencies:
    ```sh
    npm install
    ```

2. Install Playwright browsers:
    ```sh
    npx playwright install
    ```

## Running Tests
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000)

To run all Playwright tests, use the following command:
```
npx playwright test
```
To run a specific test file, use the following command:
```
npx playwright test path/to/test-file.spec.js
```
For example, to run the ktcb-page.spec.js test:
```
npx playwright test tests/ktcb-page.spec.js