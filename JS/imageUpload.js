import {  storage,  sRef, uploadBytesResumable, getDownloadURL } from "./firebase.js";

// upload image into firestorage and export its url 

let files = [];
let reader = new FileReader();
let namebox = document.getElementById("namebox");
let extlab = document.getElementById("extlab");
let myimg = document.getElementById("myimg");
let upprogress = document.getElementById("upprogress");
let selbtn = document.getElementById("selbtn");
let uploadBtn = document.getElementById("upbtn");
let input = document.createElement("input");

let productImageURL;

input.type = "file";
input.onchange = e => {

    files = e.target.files;
    let extension = GetFileExt(files[0]);
    let name = GetFileName(files[0]);
    namebox.value = name;
    extlab.innerHTML = extension;
    reader.readAsDataURL(files[0]);
}
reader.onload = function () {
    myimg.src = reader.result;
}

selbtn.onclick = function () {
    input.click();
}

function GetFileExt(file) {
    let temp = file.name.split(".");
    let ext = temp.slice((temp.length - 1), (temp.length));
    return '.' + ext[0];

}

function GetFileName(file) {
    let temp = file.name.split(".");
    let fname = temp.slice(0, -1).join(".");
    return fname;
}
async function UploadProcess() {
    productImageURL="";
    let ImgToUpload = files[0];
    let ImgName = namebox.value + extlab.innerHTML;
    const metaData = {
        contentType: ImgToUpload.type
    }
    const stroageRef = sRef(storage, "Images/" + ImgName);
    const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);
    UploadTask.on('state-changed', (snapshot) => {
        let progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        upprogress.innerHTML = "Upload " + progess + "%";
    },
        (error) => {
            alert("error: image not uploaded!");
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((downlodURL) => {
                productImageURL=downlodURL;
                           
            });
        }
    );
}
uploadBtn.onclick = UploadProcess;
export {productImageURL};
