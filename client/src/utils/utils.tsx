export function getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
        {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                if (reader.result instanceof ArrayBuffer) {
                    const decoder = new TextDecoder("utf-8")
                    resolve(decoder.decode(reader.result))
                } else {
                    if (reader.result) {
                        resolve(reader.result)
                    } else {
                        reject("null data")
                    }
                }
            };
            reader.onerror = function (error) {
                reject(error)
            };
        }
    })
}
