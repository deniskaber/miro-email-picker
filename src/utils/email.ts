export const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkEmailValidity = (value: string): boolean => {
    return emailRegexp.test(value);
};

export const getRandomEmail = (): string => {
    return `${Date.now()}@example.com`;
};
