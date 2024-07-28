// Function to generate random phone number
function generateRandomPhoneNumber() {
    let phoneNumber = '98';
    for (let i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
    console.log(phoneNumber);
}

// Class definition using the generated phone number
exports.randomnumber=class randomnumber {
    constructor(page) {
        this.page = page;
        this.mobile_number = page.locator('#AddressVM_PermMobileNo');
    }

    
    async mobilenumber(phoneNumber) {
        let randomPhoneNumber = generateRandomPhoneNumber(); // Generate random phone number
        await this.mobile_number.fill(phoneNumber); // Fill the form field with the random phone number
    }
}
module.exports ={
    generateRandomPhoneNumber
}

