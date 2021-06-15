export const addNewItemToExistingArray = (
	existingArray,
	newItem,
	propertyToBeSetTrue,
	propertToBeSetFalse,
) => [
	{ ...newItem, [propertyToBeSetTrue]: true, [propertToBeSetFalse]: false },
	...existingArray,
];

export const removeItemFromExistingArray = (existingArray, itemToBeRemoved) =>
	existingArray.filter((item) => item.id !== itemToBeRemoved.id);
