const isValidEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    return re.test(email);
};

const isValidPhone = (phone) => {
    const re = /^\+?1?(\d{10})$/;

    return re.test(phone);
};

const isValidYearlyIncome = (yearlyIncome) => {
    const parseYearlyIncome = Number(yearlyIncome);
    return parseYearlyIncome < 1000000 && parseYearlyIncome >= 0;
};

const isValidAge = (age) => {
    const parsedAge = Number(age);

    return Number.isInteger(parsedAge) && parsedAge >= 21;
};

const isValidExpirience = (experience, age) => {
    const parsedExperience = Number.parseFloat(experience);
    const parsedAge = Number.parseFloat(age);

    return parsedExperience && parsedExperience >=0 && parsedExperience <= parsedAge;
};

const isValidHasChildren = (hasChildren) => {
    const lowerValue = hasChildren.toLowerCase();

    return (lowerValue === 'true' || lowerValue === 'false' || lowerValue === '');
};

const isValidExpirationDate = (expirationDate) => {
    const reFirst = new RegExp('^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$'); // format MM/DD/YYYY
    const reSecond = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/; // format YYYY-MM-DD

    return reFirst.test(expirationDate) || reSecond.test(expirationDate);
};

const isValidLicenseNumber = (licenseNumber) => {
    const re = /^[a-z0-9_-]{6}$/;

    return re.test(licenseNumber);
};

const cellValidator = (row, type, value) => {
    const age = row.find(cell => cell.type === 'Age');
    const typeToUppercase = type.toUpperCase();

    switch (typeToUppercase) {
        case 'EMAIL':
            return isValidEmail(value);

        case 'PHONE':
            return isValidPhone(value);

        case 'AGE':
            return isValidAge(value);

        case 'EXPERIENCE':
            return isValidExpirience(value, age.value);

        case 'YEARLY INCOME':
            return isValidYearlyIncome(value);

        case 'EXPIRATION DATE':
            return isValidExpirationDate(value);

        // case 'License states LICENSE STATES' :
            // return isValidLicenseStates(value);

        case 'LICENCE NUMBER' :
            return isValidLicenseNumber(value);

        case 'HAS CHILDREN' :
            return isValidHasChildren(value);

        default:
            return true;
    }
};

export default cellValidator;
