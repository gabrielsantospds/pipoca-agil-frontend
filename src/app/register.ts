export class Register {
    name?: string
    email?: string
    birthDate?: string
    password?: string
    favoriteWordPhrase?: string
}

export class UpdatePassword {
    email?: string
    oldPassword?: string
    newPassword?: string
}

export class ResetPassword {
    favoriteWordPhrase?: string
    token?: string
    newPassword?: string
}

export class GenerateToken {
    email?: string
}

export class ValidateToken {
    token?: string
}

export class ValidateKeyWord {
    favoriteWordPhrase?: string
}