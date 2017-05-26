export function navigateToEmployeeList(spec) {
  spec.describe('Navigate from details to employee list', function() {
    spec.it('PASS', async function() {
      await spec.exists('NavBar.LeftButton');
      await spec.press('NavBar.LeftButton');
      await spec.pause(500);
    });
  }); 
}

export function inputSearchBar(spec, text) {
  let description = `Input ${text} to search bar`;
  spec.describe(description, function() {
    spec.it('PASS', async function() {
      await spec.exists('SearchBar.TextInput');
      await spec.fillIn('SearchBar.TextInput', text);
      await spec.pause(1000);
    });
  });
}

export function inputSearchBarClear(spec) {
  spec.describe('Input text to search bar clear', function() {
    spec.it('PASS', async function() {
      await spec.fillIn('SearchBar.TextInput', ' ');
      await spec.pause(1000);
    });
  });
}

export function pressEmployeeRow(spec, employee) {
  let pressEmployee = 'EmployeeListItem.' + employee;
  let description = `Press ${employee} row`;
  spec.describe(description, function() {
    spec.it('PASS', async function() {
      await spec.exists(pressEmployee);
      await spec.press(pressEmployee);
    });
  });
}

export function presenceActionBarEmailButton(spec) {
  spec.describe('ActionBar EmailButton exists', function() {
    spec.it('PASS', async function() {
      await spec.exists('ActionBar.EmailButton');
    });
  });
}

export function presenceEmployeeListItem(spec, name) {
  let searchName = 'EmployeeListItem.' + name;
  let description = `${name} list item exists`;
  spec.describe(description, function() {
    spec.it('PASS', async function() {
      await spec.exists(searchName);
    });
  });
}

export function notPresenceEmployeeListItem(spec, name) {
  let searchName = 'EmployeeListItem.' + name;
  let description = `${name} list item does not exist`;
  spec.describe(description, function() {
    spec.it('PASS', async function() {
      await spec.notExists(searchName);
    });
  });
}