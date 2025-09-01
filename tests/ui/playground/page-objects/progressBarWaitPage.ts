import { Page, Locator } from '@playwright/test';

export class ProgressBarWaitPage {
    constructor(private page: Page) { }

    startButton(): Locator {
        return this.page.getByRole('button', { name: 'Start' });
    }

    stopButton(): Locator {
        return this.page.getByRole('button', { name: 'Stop' });
    }

    progressBar(): Locator {
        return this.page.locator('.progress-bar');
    } 
    
    async clickStopButton(): Promise<void> {
        await this.stopButton().click();
    }

    async progressBarValue(): Promise<string | null > {
        const actualValue = await this.progressBar().getAttribute('aria-valuenow');
        //console.log(`Progress bar current value: ${actualValue}`);
        const finalValue = parseFloat(actualValue || '0');
        return finalValue.toString();
    }

    async waitForProgressBarToReach75Percent(timeoutMs = 15000): Promise<void> {
        await this.page.waitForFunction(() => {
            const elem = document.querySelector('.progress-bar');
            if (elem) {
                const valueNow = parseFloat(elem.getAttribute('aria-valuenow') || '0');
                return valueNow === 75;
            }
            return false;
        },{ timeout: 15000 });
    }
}                                
