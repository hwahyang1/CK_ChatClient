/* eslint-disable */
const COMMAND_SIZE = 16;
const NAME_SIZE = 16;
const DATA_SIZE = 512;

const _stringToByteArray = (message: string, size: number): Buffer => {
	const byteArray = Buffer.alloc(size);
	byteArray.write(message, 'utf-8');
	return byteArray;
};

const stringToByteArray = (command: string, name: string, data: string): Buffer => {
	const byteArray1 = _stringToByteArray(command, COMMAND_SIZE);
	const byteArray2 = _stringToByteArray(name, NAME_SIZE);
	const byteArray3 = _stringToByteArray(data, DATA_SIZE);

	const combinedByteArray = Buffer.concat([byteArray1, byteArray2, byteArray3]);

	return combinedByteArray;
};

const removeNullCharacters = (inputString: string): string => {
	return inputString.replace(/\0/g, '');
};

const byteArrayToString = (data: Buffer): { command: string; name: string; data: string } => {
	const command = removeNullCharacters(data.toString('utf-8', 0, COMMAND_SIZE)).trim();
	const name = removeNullCharacters(
		data.toString('utf-8', COMMAND_SIZE, COMMAND_SIZE + NAME_SIZE)
	).trim();
	const dataStr = removeNullCharacters(
		data.toString('utf-8', COMMAND_SIZE + NAME_SIZE, COMMAND_SIZE + NAME_SIZE + DATA_SIZE)
	).trim();

	return { command, name, data: dataStr };
};

export { stringToByteArray, byteArrayToString };

