
export class Confirmation {
    static ask() {
        return new Promise(((resolve, reject) => {
            if (window.confirm("All predictions will be deleted. Are you sure?")) {
                if (window.confirm("This action cannot be undone. Continue?")) {
                    resolve();
                } else {
                    reject();
                }
            } else {
                reject();
            }
        }));
    }
}
