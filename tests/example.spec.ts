import { test } from '@playwright/test';
import { EnrollmentPage } from './pages/enrollment.page';

test('enrollment success is visible', async ({ page }) => {
  const enrollment = new EnrollmentPage(page);
  await enrollment.navigateToForm();
  await enrollment.fillFirstName('Jacqueline');
  await enrollment.fillLastName('K');
  await enrollment.fillEmail('jaczeboso@gmail.com');
  await enrollment.fillPhone('+254 742912874');
  await enrollment.selectSchedule('weekday-evenings');
  await enrollment.selectBackground('qa-experienced');
  await enrollment.selectSource('linkedin');
  await enrollment.fillNotes('NA');
  await enrollment.submit();
  await enrollment.expectSubmissionSuccess();
});