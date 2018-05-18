let employees = [
  {
    id: 1,
    firstName: "Amy",
    lastName: "Taylor",
    title: "CEO",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "amy@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/coronet.jpg"
  },
  {
    id: 2,
    firstName: "Jim",
    lastName: "Cavy",
    title: "VP of Engineering",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "jim@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/alpaca.jpg"
  },
  {
    id: 3,
    firstName: "Guineath",
    lastName: "Paltrow",
    title: "VP of Marketing",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "guineath@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/self_pink_eyed_golden.jpg"
  },
  {
    id: 4,
    firstName: "Elvis",
    lastName: "Guineapigsley",
    title: "VP of Sales",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "elvis@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/black_otter.jpg"
  },
  {
    id: 5,
    firstName: "Guinea",
    lastName: "Stefani",
    title: "Account Executive",
    managerId: 4,
    managerName: "Elvis Guineapigsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "guinea@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/black_himalayan.jpg"
  },
  {
    id: 6,
    firstName: "Cavyham",
    lastName: "Lincoln",
    title: "Account Executive",
    managerId: 4,
    managerName: "Elvis Guineapigsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "cavyham@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/texel.jpg"
  },
  {
    id: 7,
    firstName: "Lady",
    lastName: "Guineavere",
    title: "Account Executive",
    managerId: 4,
    managerName: "Elvis Guineapigsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "ladyguineavere@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/cream_english_crested.jpg"
  },
  {
    id: 8,
    firstName: "Capybarbra",
    lastName: "Streisand",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Guineath Paltrow",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "capybarbra@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/peruvian.jpg"
  },
  {
    id: 9,
    firstName: "Miss Lambourguinea",
    lastName: "Mercy",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Guineath Paltrow",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "misslambourguinea@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/rex.jpg"
  },
  {
    id: 10,
    firstName: "Mark",
    lastName: "Zuckerbara",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Guineath Paltrow",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "mark@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/argente.jpg"
  },
  {
    id: 11,
    firstName: "Piggy",
    lastName: "Stardust",
    title: "Software Architect",
    managerId: 2,
    managerName: "Jim Cavy",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "piggy@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/lunkyara.jpg"
  },
  {
    id: 12,
    firstName: "Cavy",
    lastName: "Jones",
    title: "Software Architect",
    managerId: 2,
    managerName: "Jim Cavy",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "cavyjones@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/merino.jpg"
  },
  {
    id: 13,
    firstName: "Capybarry",
    lastName: "White",
    title: "Software Architect",
    managerId: 2,
    managerName: "Jim Cavy",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "capybarry@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/teddy.jpg"
  },
  {
    id: 14,
    firstName: "Guinea",
    lastName: "Saville",
    title: "Software Architect",
    managerId: 2,
    managerName: "Jim Cavy",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "guinea@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/cavies/tortoise_and_white.jpg"
  }
];

// Simulating async calls for plug-and-play replacement with REST services
export let findAll = () => new Promise((resolve, reject) => {
  resolve(employees);
});

export let findByName = (name) => new Promise((resolve, reject) => {
  let filtered = employees.filter(employee => (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1);
  resolve(filtered);
});

export let findById = (id) => new Promise((resolve, reject) => {
  let employee = employees[id-1];
  resolve({
    firstName: employee.firstName,
    lastName: employee.lastName,
    title: employee.title,
    email: employee.email,
    mobilePhone: employee.mobilePhone,
    picture: employee.picture,
    manager: employees[employee.managerId - 1],
    reports: employees.filter(item => item.managerId === id)
  });
});
