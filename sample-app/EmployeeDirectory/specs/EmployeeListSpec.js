export default function(spec) {

  spec.describe('Listing the employees', function() {

    spec.it('filters the list by search input', async function() {
      await spec.exists('EmployeeListItem.Anup Gupta');
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.notExists('EmployeeListItem.Anup Gupta');
      await spec.exists('EmployeeListItem.Amy Taylor');
    });

  });

  spec.describe('Tapping on an employee', function() {

    spec.it('shows a button to email them', async function() {
      await spec.fillIn('SearchBar.TextInput', 'Amy');
      await spec.press('EmployeeListItem.Amy Taylor');
      await spec.pause(1000);
      await spec.exists('ActionBar.EmailButton');
    });

  });
}
