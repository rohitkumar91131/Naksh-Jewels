const mongoose = require('mongoose')
const dotenv = require('dotenv')
const axios = require('axios')
const cloudinary = require('cloudinary').v2
const Product = require('./src/models/productModel')

dotenv.config()

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dkaxd3wha/image/upload/v1770460083/logo_euw2qx.png'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('DB Connection Failed', error)
    process.exit(1)
  }
}

const toDataUrl = async (url) => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const base64 = Buffer.from(res.data).toString('base64')
    return `data:image/jpeg;base64,${base64}`
  } catch (err) {
    return ''
  }
}

const seedProducts = async () => {
  try {
    console.log("Fetching data...")
    const { data } = await axios.get('https://api.escuelajs.co/api/v1/products')

    const productsToSave = []


    for (const item of data) {
      const cleanImages = item.images.map(i => i.replace(/["[\]]/g, ''))
      const imageUrl = cleanImages[0]

      let profileImage = FALLBACK_IMAGE
      let profileDataUrl = ""

      try {
        process.stdout.write(`Processing: ${item.title.substring(0, 15)}... `)
        
        const upload = await cloudinary.uploader.upload(imageUrl, {
          folder: 'naksh-jewels-products',
          public_id: `product_${item.id}`,
          resource_type: 'image'
        })
        
        profileImage = upload.secure_url

        const tinyUrl = cloudinary.url(upload.public_id, {
           secure: true,
           transformation: [
             { width: 20, crop: "scale" },
             { quality: "auto" },
             { format: "jpg" }
           ]
        })

        profileDataUrl = await toDataUrl(tinyUrl)
        console.log("✅ Done")

      } catch (err) {
        console.log("❌ Failed (Using Fallback)")
      }

      productsToSave.push({
        title: item.title,
        price: item.price * 85,
        description: item.description,
        images: cleanImages,
        category: {
          id: item.category.id,
          name: item.category.name,
          image: item.category.image
        },
        profileImage,
        profileDataUrl
      })
    }

    console.log('Clearing old data...')
    await Product.deleteMany({})
    
    console.log(`Inserting ${productsToSave.length} products...`)
    await Product.insertMany(productsToSave)

    console.log('Data Imported Successfully')
    process.exit()

  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

connectDB().then(seedProducts)