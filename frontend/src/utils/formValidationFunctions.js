export const isValidMobileNumber = (mobileNumber) => {
	const mobileNumberRegex = new RegExp('[7-9][0-9]{9}');
	return mobileNumberRegex.test(mobileNumber);
};

export const isValidPinCode = (pinCode) => {
	const pinCodeRegex = new RegExp('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$');
	return pinCodeRegex.test(pinCode);
};
