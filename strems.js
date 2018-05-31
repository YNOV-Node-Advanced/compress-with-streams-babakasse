const fs = require("fs");
const zlib = require("zlib");

async function compress(input, output) {
    return new Promise((resolve, reject) => {
        let gzip = zlib.createGzip();
        let readStream = fs.createReadStream(input);
        let writeStream = fs.createWriteStream(output);

        let bytesWritten = 0;

        readStream
            .on("error", error => reject(error))
            .pipe(gzip)
            .on("data", buffer => bytesWritten += buffer.length)
            .on("error", error => reject(error))
            .pipe(writeStream)
            .on("error", error => reject(error))
            .on("close", () => resolve(bytesWritten));
    });
}

compress("./README.md", "./compress").then(bytesWritten => {
    console.log("Written", bytesWritten);
});