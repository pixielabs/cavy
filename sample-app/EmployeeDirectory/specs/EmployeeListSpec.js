export default function(spec) {

  spec.describe('Listing the employees', function() {

    spec.it('filters the list by search input', async function() {
      await spec.exists('EmployeeListItem.2');
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.notExists('EmployeeListItem.2');
      await spec.exists('EmployeeListItem.1');
    });

  });

  spec.describe('Tapping on an employee', function() {

    spec.it('shows a button to email them', async function() {
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.press('EmployeeListItem.1');
      await spec.pause(1000);
      await spec.exists('ActionBar.EmailButton');
    });

  });
}
