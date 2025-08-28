import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

const cloudinaryV2 = cloudinary.v2;

// TODO: Replace these with your actual Cloudinary credentials
// You can find these in your Cloudinary dashboard
const CLOUDINARY_CONFIG = {
  cloud_name: "dw6klz9kg",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key_here",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret_here",
};

// Configure Cloudinary
cloudinaryV2.config(CLOUDINARY_CONFIG);

const uploadImage = async (filePath, folder) => {
  try {
    const result = await cloudinaryV2.uploader.upload(filePath, {
      folder: `home/portfolio/about/${folder}`,
      resource_type: "image",
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
    });

    console.log(`✅ Uploaded: ${filePath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
};

const uploadAboutImages = async () => {
  console.log("🚀 Starting About Images Cloudinary upload...\n");

  // Check if credentials are set
  if (
    CLOUDINARY_CONFIG.api_key === "your_api_key_here" ||
    CLOUDINARY_CONFIG.api_secret === "your_api_secret_here"
  ) {
    console.log("❌ Please set your Cloudinary credentials first!");
    console.log("You can either:");
    console.log(
      "1. Set environment variables: CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET"
    );
    console.log("2. Or edit this file and replace the placeholder values");
    console.log("\nGet your credentials from: https://cloudinary.com/console");
    return;
  }

  const aboutDir = "./public/about";
  const images = [
    { file: "ME and Rhodes.png", folder: "personal" },
    { file: "Glasto.png", folder: "events" },
    { file: "Cardiff.png", folder: "locations" },
  ];

  for (const image of images) {
    const filePath = path.join(aboutDir, image.file);
    if (fs.existsSync(filePath)) {
      await uploadImage(filePath, image.folder);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }

  console.log("\n🎉 About images upload complete!");
  console.log("\n📝 Next steps:");
  console.log("1. Copy the URLs from above");
  console.log("2. Update the About.tsx component with the new URLs");
  console.log("3. Test the about page to make sure images load correctly");
};

uploadAboutImages().catch(console.error);
