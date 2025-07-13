/**
    @description: Gets the required environment variables.
	@param {string} envVar - The environment variable to get.
    @returns {string} - The required environment variables.
*/

export function getRequiredEnv(envVar: string): string {
	const envName = process.env[envVar];
	if (!envName) {
		throw new Error(
			`Missing required environment variable: ${envVar}\n` +
				"Please set this environment variable before starting the application.",
		);
	}
	return envName;
}
