export function generateRandomEmail(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const usernameLength = Math.floor(Math.random() * 10) + 10;
    let username = '';
    for (let i = 0; i < usernameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters[randomIndex];
    }
    return username + '@ex.com';
}


export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export function generateValidPhone(): string {
    const digits = '0123456789';
    let phone = '+ 7 (9';
    for (let i = 0; i < 2; i++) {
        phone += digits[Math.floor(Math.random() * 10)];
    }
    phone += ') ';
    for (let i = 0; i < 3; i++) {
        phone += digits[Math.floor(Math.random() * 10)];
    }
    phone += '-';
    for (let i = 0; i < 2; i++) {
        phone += digits[Math.floor(Math.random() * 10)];
    }
    phone += '-';
    for (let i = 0; i < 2; i++) {
        phone += digits[Math.floor(Math.random() * 10)];
    }
    return phone;
}

 export function generateRandomPassword(): string {
        return `Password_${Date.now()}`;
    }