import { JWT_HEADER, JSON_HEADER } from "../../config/authConfig"; 
 
 
 // uploading single file
 async function uploadFile (token, endpoint, filedata, key, fetchAsBlob) {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: token
          ? Object.assign({}, JWT_HEADER(token), JSON_HEADER)
          : Object.assign({}, JSON_HEADER),
        cache: 'default',
      };


    const formData = new FormData();
    formData.append(key, filedata);

    // return fetch(endpoint, {
    //   method: 'PATCH',
    //   headers: JWT_HEADER(token),
    //   body: formData,
    // })
    // event.preventDefault();
    // const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name);
   
    const resp = await fetchAsBlob(UPLOAD_ENDPOINT, formData, config);
    console.log(resp.status)
      .then(res => res.json())
      .then(res => res)
      .catch(err => err);
  };



  export default uploadFile;