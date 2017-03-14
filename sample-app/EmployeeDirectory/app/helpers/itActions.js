// itActions

// presenceActionBarEmailButton(spec, name)
// secretPresenceActionBar(spec) 
// presenceEmployeeListItem(spec, name)
// notPresenceEmployeeListItem(spec, name)
// inputSearchBarTextInput(spec, input)

export function presenceActionBarEmailButton(spec) {
  spec.describe('Employee list item exists', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', 'Amy');     
      await spec.pause(1000);
      await spec.exists('EmployeeListItem.AmyTaylor');
      await spec.press('EmployeeListItem.AmyTaylor');
      await spec.exists('ActionBar.EmailButton');
      await spec.fillIn('SearchBar.TextInput', '');
    });
  });
}

export function secretPresenceActionBar(spec) {
  spec.describe('Secret Presence Action Bar', function() {
    spec.it('PASS', async function() {
      await spec.exists('secretPresenceActionBar');
      await spec.press('secretPresenceActionBar');
    });
  });
}

export function presenceEmployeeListItem(spec, name) {
  spec.describe('Employee list item exists', function() {
    spec.it('PASS', async function() {
      let search = 'EmployeeListItem.' + name;
      await spec.exists(search);
    });
  });
}


export function notPresenceEmployeeListItem(spec, name) {
  spec.describe('Employee list item does not exist', function() {
    spec.it('PASS', async function() {
      await spec.notExists('EmployeeListItem.' + name);
    });
  });
}


export function inputSearchBarTextInput(spec, input) {
  spec.describe('Listing the employees', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', input);
      await spec.pause(500);
    });
  });
}
