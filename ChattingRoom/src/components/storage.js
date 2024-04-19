import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config";

export const Storage = () => {
    const [uploadPath, setUploadPath] = useState("");
    const [downloadPath, setDownloadPath] = useState("");
    const [fileContent, setFileContent] = useState("");

    const handleDownload = () => {
        const fileRef = ref(storage, downloadPath);
        getDownloadURL(fileRef).then((url) => {
            window.open(url, "_self");
        });
        setDownloadPath("");
    };

    const handleUpload = () => {
        const fileRef = ref(storage, uploadPath);
        uploadBytes(fileRef, fileContent).then((snapshot) => {
            console.log("Uploaded a blob or file!");
        });
        setUploadPath("");
    };

    return (
        <>
            <h1>Firebase Cloud Storage</h1>
            <div>
                <h2>Upload</h2>
                <h3>
                    Choose Upload File:
                    <br />
                    <input
                        type="file"
                        onChange={(e) => setFileContent(e.target.files[0])}
                    />
                </h3>
                <h3>
                    Upload Path Reference:
                    <br />
                    <input
                        placeholder="Reference"
                        value={uploadPath}
                        onChange={(e) => setUploadPath(e.target.value)}
                    />
                </h3>
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                <h2>Download</h2>
                <h3>
                    Download Path Reference
                    <br />
                    <input
                        placeholder="Reference"
                        value={downloadPath}
                        onChange={(e) => setDownloadPath(e.target.value)}
                    />
                </h3>
                <button onClick={handleDownload}>Download</button>
            </div>
        </>
    );
};
