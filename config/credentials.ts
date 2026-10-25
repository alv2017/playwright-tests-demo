function getEnv(name: string): string {
    return process.env[name] || "UNDEFINED";
};

export const standardUser = getEnv("STANDARD_USER");
export const standardPassword = getEnv("STANDARD_PASSWORD");
export const lockedOutUser = getEnv("LOCKED_OUT_USER");
export const lockedOutPassword = getEnv("LOCKED_OUT_PASSWORD");
