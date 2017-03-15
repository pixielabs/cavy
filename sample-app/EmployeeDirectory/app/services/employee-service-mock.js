let employees = [
  {
    id: 1,
    firstName: "Amy",
    lastName: "Taylor",
    title: "CEO",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "amy@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/amy_taylor.jpg"
  },
  {
    id: 2,
    firstName: "Anup",
    lastName: "Gupta",
    title: "VP of Engineering",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "anup@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/anup_gupta.jpg"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Jones",
    title: "VP of Marketing",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "michael@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/michael_jones.jpg"
  },
  {
    id: 4,
    firstName: "Caroline",
    lastName: "Kingsley",
    title: "VP of Sales",
    managerId: 1,
    managerName: "Amy Taylor",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "caroline@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/caroline_kingsley.jpg"
  },
  {
    id: 5,
    firstName: "James",
    lastName: "Kennedy",
    title: "Account Executive",
    managerId: 4,
    managerName: "Caroline Kingsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "james@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/james_kennedy.jpg"
  },
  {
    id: 6,
    firstName: "Jennifer",
    lastName: "Wu",
    title: "Account Executive",
    managerId: 4,
    managerName: "Caroline Kingsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "jen@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/jennifer_wu.jpg"
  },
  {
    id: 7,
    firstName: "Jonathan",
    lastName: "Bradley",
    title: "Account Executive",
    managerId: 4,
    managerName: "Caroline Kingsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "jonathan@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/jonathan_bradley.jpg"
  },
  {
    id: 8,
    firstName: "Kenneth",
    lastName: "Sato",
    title: "Account Executive",
    managerId: 4,
    managerName: "Caroline Kingsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "kenneth@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/kenneth_sato.jpg"
  },
  {
    id: 9,
    firstName: "Lisa",
    lastName: "Parker",
    title: "Software Architect",
    managerId: 2,
    managerName: "Anup Gupta",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "lisa@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/lisa_parker.jpg"
  },
  {
    id: 10,
    firstName: "Brad",
    lastName: "Moretti",
    title: "Software Architect",
    managerId: 2,
    managerName: "Anup Gupta",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "brad@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/brad_moretti.jpg"
  },
  {
    id: 11,
    firstName: "Michelle",
    lastName: "Lambert",
    title: "Software Architect",
    managerId: 2,
    managerName: "Anup Gupta",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "michelle@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/michelle_lambert.jpg"
  },
  {
    id: 12,
    firstName: "Miriam",
    lastName: "Aupont",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Michael Jones",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "miriam@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/miriam_aupont.jpg"
  },
  {
    id: 13,
    firstName: "Olivia",
    lastName: "Green",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Michael Jones",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "olivia@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/olivia_green.jpg"
  },
  {
    id: 14,
    firstName: "Robert",
    lastName: "Sullivan",
    title: "Marketing Manager",
    managerId: 3,
    managerName: "Michael Jones",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "robert@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/robert_sullivan.jpg"
  },
  {
    id: 15,
    firstName: "Tammy",
    lastName: "Robinson",
    title: "Software Architect",
    managerId: 2,
    managerName: "Anup Gupta",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "tammy@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/tammy_robinson.jpg"
  },
  {
    id: 16,
    firstName: "Victor",
    lastName: "Ochoa",
    title: "Account Executive",
    managerId: 4,
    managerName: "Caroline Kingsley",
    phone: "617-123-4567",
    mobilePhone: "617-987-6543",
    email: "victor@fakemail.com",
    picture: "https://s3.eu-west-2.amazonaws.com/cavy-sample-app/people/victor_ochoa.jpg"
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
