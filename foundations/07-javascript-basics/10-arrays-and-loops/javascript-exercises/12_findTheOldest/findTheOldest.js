const getAge = function (yearOfBirth, yearOfDeath) {
  if (!yearOfDeath) { // This person may be alive
    yearOfDeath = new Date().getFullYear();
  }

  return yearOfDeath - yearOfBirth;
}

const findTheOldest = function(people) {
  return people.reduce((oldestPerson, currentPerson) => {
    const oldestAge = getAge(oldestPerson.yearOfBirth, 
      oldestPerson.yearOfDeath);
    const currentAge = getAge(currentPerson.yearOfBirth, 
      currentPerson.yearOfDeath);

    return currentAge > oldestAge ? currentPerson : oldestPerson;
  });
};

// Do not edit below this line
module.exports = findTheOldest;
