import { Page, expect } from '@playwright/test';

export class EnrollmentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://kiwamitech.com/school/');
  }

  get automationLink() {
    return this.page.getByRole('link', { name: 'AUTOMATION Playwright (' });
  }

  get contactLink() {
    return this.page.getByRole('link', { name: 'Contact Us to Enroll →' }).first();
  }

  get firstName() {
    return this.page.getByRole('textbox', { name: 'e.g. Alice' });
  }

  get lastName() {
    return this.page.getByRole('textbox', { name: 'e.g. Kamau' });
  }

  get email() {
    return this.page.getByRole('textbox', { name: 'you@example.com' });
  }

  get phone() {
    return this.page.getByRole('textbox', { name: '+254 7XX XXX XXX' });
  }

  get schedule() {
    return this.page.locator('#schedule');
  }

  get background() {
    return this.page.locator('#background');
  }

  get source() {
    return this.page.locator('#source');
  }

  get notes() {
    return this.page.getByRole('textbox', { name: 'e.g. I work full time so' });
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Send Enquiry →' });
  }

  async navigateToForm() {
    await this.goto();
    await this.automationLink.click();
    await this.contactLink.click();
  }

  async fillFirstName(name: string) {
    await this.firstName.click();
    await this.firstName.fill(name);
  }

  async fillLastName(name: string) {
    await this.lastName.click();
    await this.lastName.fill(name);
  }

  async fillEmail(address: string) {
    await this.email.click();
    await this.email.fill(address);
  }

  async fillPhone(number: string) {
    await this.phone.click();
    await this.phone.fill(number);
  }

  async selectSchedule(value: string) {
    await this.schedule.selectOption(value);
  }

  async selectBackground(value: string) {
    await this.background.selectOption(value);
  }

  async selectSource(value: string) {
    await this.source.selectOption(value);
  }

  async fillNotes(text: string) {
    await this.notes.click();
    await this.notes.fill(text);
  }

  async submit() {
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.submitButton.click();
  }

  async expectSubmissionSuccess() {
    const success = this.page.locator('.success-title');
    await expect(success).toBeVisible({ timeout: 10000 });
    await expect(success).toHaveText('Enquiry received!');
  }
}
