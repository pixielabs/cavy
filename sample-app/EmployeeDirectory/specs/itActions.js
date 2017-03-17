// itActions

export function presenceActionBarEmailButton(spec) {
  spec.describe('Employee list item exists', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', 'Amy');     
      await spec.pause(1000);
      await spec.exists('EmployeeListItem.AmyTaylor');
      await spec.press('EmployeeListItem.AmyTaylor');
      await spec.exists('ActionBar.EmailButton');
      await spec.exists('NavBar.LeftButton');
      await spec.press('NavBar.LeftButton');
    });
  });
}

export function navigateToEmployeeList(spec) {
  spec.describe('Navigate from details to employee list', function() {
    spec.it('PASS', async function() {
      await spec.exists('NavBar.LeftButton');
      await spec.press('NavBar.LeftButton');
      await spec.pause(500);
    });
  }); 
}

export function clearTextInput(spec) {
  spec.describe('Clear searchbar text input', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', '');
    });
  });
}

export function failure(spec) {
  spec.describe('Clear searchbar text input', function() {
    spec.it('FAIL', async function() {
      await spec.exists('FooBar.Baz');
      await spec.fillIn('FooBar.Baz', 'Bar');
    });
  });
}
export function pause(spec, time) {
  spec.describe('pause test execution', function() {
    spec.it('PASS', async function() {
      await spec.pause(time);
    });
  });
}

export function secretShowDetails(spec) {
  spec.describe('Use secret component to continue testing past OS alert', function() {
    spec.it('PASS', async function() {
      await spec.exists('SecretShowDetails');
      await spec.press('SecretShowDetails');
      await spec.pause(500);
      await spec.exists('EmployeeListItem.JamesKennedy');
    });
  });
}

export function secretSearch(spec) {
  spec.describe('Use secret component to enter string in search bar', function() {
    spec.it('PASS', async function() {
      await spec.exists('SecretSearch');
      await spec.press('SecretSearch');
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

export function inputSearchBarTextInput(spec, input, fullName) {
  spec.describe('Listing the employees', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', input);
      await spec.pause(500);
      await spec.exists('SearchBar.TextInput', fullName);
    });
  });
}

export function inputSearchBarClearText(spec) {
  spec.describe('Clear search bar', function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', '');
      await spec.pause(500);
    });
  });
}
