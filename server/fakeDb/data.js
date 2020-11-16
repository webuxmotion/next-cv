const mongoose = require('mongoose');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
      email: "admin@gmail.com",
      name: "admin@gmail.com",
      username: "admin@gmail.com",
      info: "admin@gmail.com",
      password: "admin@gmail.com",
      role: "admin"
    },
    {
      _id: user2Id,
      avatar: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
      email: "guest@gmail.com",
      name: "guest@gmail.com",
      username: "guest@gmail.com",
      info: "guest@gmail.com",
      password: "guest@gmail.com",
      role: "guest"
    },
    {
      _id: user3Id,
      avatar: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png",
      email: "instructor@gmail.com",
      name: "instructor@gmail.com",
      username: "instructor@gmail.com",
      info: "instructor@gmail.com",
      password: "instructor@gmail.com",
      role: "instructor"
    },
  ],
  portfolios: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
      user: user1Id
    },
    {
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
      user: user2Id
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user3Id
    }
  ],
}

module.exports = data;
