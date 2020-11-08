
export function isNewPwInvalid(pw, pwRep) {
    if (!pw || !pwRep) {
        return true;
    }

    return pw !== pwRep || pw.length < 8;
}
