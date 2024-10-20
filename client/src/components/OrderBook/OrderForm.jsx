import React, { useState , useEffect} from 'react';
import { useForm } from 'react-hook-form';
// import { storage, db } from '../../FirebaseConfig';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDocument } from "pdf-lib";
import API_URL from '../../_helpers';
import './OrderForm.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [blackAndWhiteFile, setBlackAndWhiteFile] = useState(null);
  const [colorFile, setColorFile] = useState(null);
  const [blackAndWhitePageCount, setBlackAndWhitePageCount] = useState(0);
  const [colorPageCount, setColorPageCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [donePayment, setDonePayment] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [uemail, setuemail] = useState('');
  const [previousBlackAndWhitePrice, setPreviousBlackAndWhitePrice] = useState(0);
const [previousColorPrice, setPreviousColorPrice] = useState(0);

  useEffect(() => {
    const temail = Cookies.get('printouseremail');
    setuemail(temail)
    if (!temail) {
      navigate('/signin'); // Redirect to home if email is found in cookies
    }
  }, [navigate]);
  // Handle Black and White PDF Upload
  const handleBlackAndWhiteUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setBlackAndWhiteFile(selectedFile);
  
    // Read the PDF and calculate the total pages
    const pdfData = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfData);
    const totalPages = pdfDoc.getPageCount();
  
    // Calculate the price for black and white
    const blackAndWhitePrice = totalPages * 2; // ₹2 per page for black and white
  
    // Subtract the previous black and white price from the total
    setPrice((prevPrice) => prevPrice - previousBlackAndWhitePrice + blackAndWhitePrice);
  
    // Update the previous black and white price with the new price
    setPreviousBlackAndWhitePrice(blackAndWhitePrice);
  
    // Optionally, update the page count state
    setBlackAndWhitePageCount(totalPages);
  };
  
  const handleColorUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setColorFile(selectedFile);
  
    // Read the PDF and calculate the total pages
    const pdfData = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfData);
    const totalPages = pdfDoc.getPageCount();
  
    // Calculate the price for color
    const colorPrice = totalPages * 4; // ₹4 per page for color
  
    // Subtract the previous color price from the total
    setPrice((prevPrice) => prevPrice - previousColorPrice + colorPrice);
  
    // Update the previous color price with the new price
    setPreviousColorPrice(colorPrice);
  
    // Optionally, update the page count state
    setColorPageCount(totalPages);
  };

  // Handle Form Submission
  const onSubmit = async (data) => {
    if (!blackAndWhiteFile && !colorFile) {
      toast.error('Please upload at least one file');
      return;
    }
    
    try {
      
      setUploading(true);
      let blackAndWhiteFileUrl = null;
      let colorFileUrl = null;
      
      // Upload Black and White File if present
      if (blackAndWhiteFile) {
        console.log("hello")
        // const blackAndWhiteStorageRef = ref(storage, `orders/black_and_white/${blackAndWhiteFile.name}`);
        // const blackAndWhiteUploadTask = uploadBytesResumable(blackAndWhiteStorageRef, blackAndWhiteFile);
        // await blackAndWhiteUploadTask;
        // blackAndWhiteFileUrl = await getDownloadURL(blackAndWhiteUploadTask.snapshot.ref);
        blackAndWhiteFileUrl="kdknvkdnv" 
        
      }

      // Upload Color File if present
      if (colorFile) {
        // const colorStorageRef = ref(storage, `orders/color/${colorFile.name}`);
        // const colorUploadTask = uploadBytesResumable(colorStorageRef, colorFile);
        // await colorUploadTask;
        // colorFileUrl = await getDownloadURL(colorUploadTask.snapshot.ref);
        colorFileUrl ="djbfjdbvdb"
      }
      console.log(data.address);
      // branch: data.branch,
       // year: data.year,
      // Create the order object
      const orderData = {
        createdAt: new Date(),
        uname: data.uname,
        email: data.email,
        phoneno: data.phoneno,
        deliveryslot: data.deliveryslot,
        typeOfOrder: data.typeOfOrder,
        address: data.address,
        branch: data.branch,
        year: data.year,
        price: price,
        paymentdata: { amount: price },
        black_and_white_fileurl: blackAndWhiteFileUrl,
        color_fileurl: colorFileUrl,
        delivered: false
      };
     
      // Save the order to Firestore (or send to your backend)
      // await addDoc(collection(db, 'orders'), orderData);

      // Send to Node.js backend
      const response = await fetch(`${API_URL}/orders/createorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        toast.success('Order created successfully!');
      } else {
        toast.error('Failed to create order');
      }

      setUploading(false);
    } catch (error) {
      toast.error('An error occurred');
      setUploading(false);
    }
  };

  return (
    <div className="container containerx mt-5" style={{ maxWidth: '600px' }}>
  <h3 className="text-center mb-4" style={{ color: '#5A7D9F' }}>Place Your Order</h3>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-3">
      <label className="inputlabeltext">*Name</label>
      <input
        type="text"
        className="form-control"
        {...register('uname', { required: true })}
      />
      {errors.uname && <span className="text-danger">Name is required</span>}
    </div>

    <div className="mb-3">
      <label className="inputlabeltext">*Email</label>
      <input
        type="email"
        className="form-control"
        // defaultValue={uemail}  // Autofill the email from state
        {...register('email', { required: true })}
        // readOnly  
       
      />
      {errors.email && <span className="text-danger">Email is required</span>}
    </div>

    <div className="mb-3">
      <label className="inputlabeltext">*Phone No</label>
      <input
        type="text"
        className="form-control"
        {...register('phoneno', { required: true })}
      />
      {errors.phoneno && <span className="text-danger">Phone number is required</span>}
    </div>

    <div className="mb-3">
      <label className="inputlabeltext">*Type of Order</label>
      <select className="form-control" {...register('typeOfOrder', { required: true })}>
        <option value="preorder">Preorder</option>
        <option value="express">Express Order</option>
      </select>
      {errors.typeOfOrder && <span className="text-danger">Order type is required</span>}
    </div>

    <div className="mb-3">
      <label className="inputlabeltext">*College Name/Address</label>
      <input
        type="text"
        className="form-control"
        {...register('address', { required: true })}
      />
      {errors.address && <span className="text-danger">Address is required</span>}
    </div>
    <div className="mb-3">
  <label className="inputlabeltext">*Branch Name</label>
  <select
    className="form-control"
    {...register('branch', { required: true })}
  >
    <option value="">Select Branch</option>
    <option value="engineering-cse">Engineering - CSE</option>
    <option value="engineering-mechanical">Engineering - Mechanical</option>
    <option value="engineering-civil">Engineering - Civil</option>
    <option value="engineering-electrical">Engineering - Electrical</option>
    <option value="mtech">MTech</option>
    <option value="pharmacy">Pharmacy</option>
    <option value="agriculture">Agriculture</option>
    <option value="bba">BBA</option>
    <option value="mba">MBA</option>
    <option value="bsc">BSc</option>
    <option value="forensic">Forensic</option>
    <option value="bca">BCA</option>
    <option value="mca">MCA</option>
    <option value="other">Other</option>
  </select>
  {errors.branch && <span className="text-danger">Branch is required</span>}
</div>

<div className="mb-3">
  <label className="inputlabeltext">*Year</label>
  <select
    className="form-control"
    {...register('year', { required: true })}
  >
    <option value="">Select Year</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
  {errors.year && <span className="text-danger">Year is required</span>}
</div>

    <div className="mb-3">
      <label className="inputlabeltext">*Delivery Slot</label>
      <select className="form-control" {...register('deliveryslot', { required: true })}>
        <option value="10 AM">10 AM</option>
        <option value="12 PM">12 PM</option>
        <option value="3 PM">3 PM</option>
      </select>
      {errors.deliveryslot && <span className="text-danger">Delivery slot is required</span>}
    </div>

    
    <div className="file-upload mb-3">
      <label className="inputlabeltext">Upload Black and White PDF</label>
      <div className="file-upload-box">
        <p>Drag and drop your PDF here or <span>browse</span></p>
        <input
          type="file"
          className="file-input"
          accept=".pdf"
          onChange={handleBlackAndWhiteUpload}
        />
      </div>
    </div>

    <div className="file-upload mb-3">
      <label className="inputlabeltext">Upload Color PDF</label>
      <div className="file-upload-box">
        <p>Drag and drop your PDF here or <span>browse</span></p>
        <input
          type="file"
          className="file-input"
          accept=".pdf"
          onChange={handleColorUpload}
        />
      </div>
    </div>

    {(blackAndWhitePageCount > 0 || colorPageCount > 0) && (
      <div className="mb-3">
        <p>Number of pages (Black and White): {blackAndWhitePageCount}</p>
        <p>Number of pages (Color): {colorPageCount}</p>
        <p>Total Payable amount: ₹{price}</p>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setDonePayment(true)}
        >
          Done Payment
        </button>
      </div>
    )}

    {donePayment && (
      <button type="submit" className="btn btn-primary" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Place Order'}
      </button>
    )}
  </form>
  <ToastContainer />
</div>

  );
};

export default OrderForm;
