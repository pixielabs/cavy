import { hasButtonText } from './helpers';

export default function(spec) {
  spec.describe('Listing the employees', function() {
    spec.it('filters the list by search input', async function() {
      await spec.exists('EmployeeList.JimCavy');
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.notExists('EmployeeList.JimCavy');
      await spec.exists('EmployeeList.AmyTaylor');
    });
  });

  spec.describe('Tapping on an employee', function() {
    spec.it('shows a button to email them and job title', async function() {
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.press('EmployeeList.AmyTaylor');
      await spec.pause(1000);
      await spec.containsText('EmployeeList.CEO', 'CEO');
      await spec.exists('ActionBar.EmailButton');
      const button = await spec.findComponent('ActionBar.EmailButton');
      await hasButtonText(button, 'email');
    });
  });
}
