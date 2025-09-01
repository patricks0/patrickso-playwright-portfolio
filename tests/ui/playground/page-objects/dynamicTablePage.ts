
import { Page, Locator } from '@playwright/test';

export class DynamicTablePage {
    constructor(private page: Page) { }

    columnHeaders(): Locator {
        return this.page.getByRole('columnheader');
    }

    rowByName(name: string): Locator {
        return this.page.getByRole('row', { name });
    }

    yellowCpuSummary(): Locator {
        return this.page.locator('.bg-warning').first();
    }

    async columnIndex(headerText: string): Promise<number> {
        const headers = this.columnHeaders();
        const idx = await headers.evaluateAll((elements, text) => {
            return elements.findIndex(el => el.textContent?.trim() === text);
        }, headerText);
        if (idx === -1) throw new Error(`Column header not found: ${headerText}`);
        return idx;
    }

    async cellFor(rowName: string, headerText: string): Promise<Locator> {
        const idx = await this.columnIndex(headerText);
        const row = this.rowByName(rowName);
        return row.locator('span').nth(idx);
    }

    async cellText(rowName: string, headerText: string): Promise<string> {
        const cell = await this.cellFor(rowName, headerText);
        return (await cell.textContent())?.trim() || '';
    }

    async captureValueofCpu(rowName: string): Promise<string> {
        return this.cellText(rowName, 'CPU');
    }

    async chromeCpuSummaryValue(): Promise<string> {
        const raw = (await this.yellowCpuSummary().textContent())?.trim() || '';
        return raw.replace(/.*CPU:\s*/, '');
    }
}
