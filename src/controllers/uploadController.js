// controllers/uploadController.js
const cloudinary = require('../config/cloudinaryConfig');

exports.uploadFile = async (req, res) => {
  try {    
    const timestamp = Math.floor(Date.now() / 1000);
    // Determine resource type based on mimetype
    const resourceType = req.file.mimetype.startsWith('audio') ? 'video' : 'auto';
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: resourceType,
      folder: 'chat_app',
      timestamp: timestamp
    });
    
    res.status(200).json({ 
      success: true, 
      fileUrl: result.secure_url,
      public_id: result.public_id 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'File upload failed', error: error.message });
  }
};