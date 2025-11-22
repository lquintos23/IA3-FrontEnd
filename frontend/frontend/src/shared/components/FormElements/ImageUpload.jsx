import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  // Handler for clicking custom button → triggers real file input
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // Handler for actual file picking
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(pickedFile, fileIsValid);
  };

  // Preview update using FileReader
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload__preview" style={{ marginBottom: '1rem' }}>
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ) : (
          <p>Please pick an image.</p>
        )}
      </div>
      <button type="button" onClick={pickImageHandler}>
        Pick Image
      </button>
    </div>
  );
};

export default ImageUpload;
