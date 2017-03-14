// itActions //

// presenceActionBarEmailButton(spec, name)
// secretPresenceActionBar(spec) 
// presenceEmployeeListItem(spec, name)
// notPresenceEmployeeListItem(spec, name)
// inputSearchBarTextInput(spec, input)

export function presenceActionBarEmailButton(spec, name) {
  spec.describe('Employee list item exists', function() {
    spec.it('PASS', async function() {
      await spec.fillIn('SearchBar.TextInput', name);
      await spec.exists('EmployeeListItem.AmyTaylor');
      await spec.press('EmployeeListItem.AmyTaylor');
      await spec.pause(1000);
      await spec.exists('presenceActionBar.EmailButton');
    });
  });
}

export function secretPresenceActionBar(spec) {
  spec.describe('Secret Presence Action Bar', function() {
    spec.it('PASS', async function() {
      await spec.exists('secretPresenceActionBar');
      await spec.press('secretSignupFB');
    });
  });
}

export function presenceEmployeeListItem(spec, name) {
  spec.describe('Employee list item exists', function() {
    spec.it('PASS', async function() {
      await spec.exists('EmployeeListItem.' + name);
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
    });
  });
}
