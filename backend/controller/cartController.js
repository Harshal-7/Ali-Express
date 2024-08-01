import User from '../model/User.js';
import dotenv from 'dotenv'
dotenv.config()


export const addToCart = async(req,res)=>{
    try {
        const { productId, title, price,
            image, quantity, size
        } = req.body

        const userId = req.userId;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartItem = user.cart.find((item) =>
            item.productId === productId && item.size === size
        )

        if (cartItem) {
            cartItem.quantity += quantity
        } else {
            user.cart.push({
                productId, title, price, image, quantity, size
            })
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ success: true, message: 'Item added to cart', cart: user.cart });
    }
    catch (error) {
        console.log(`erorr`, error)
    }
}

// to get the cart data

export const getCartData = async (req, res) => {
    try {
        const userId = req.userId // getting from authMiddleware after verification

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // Send the cart data back in the response
        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).json({ success: false, message: 'Server error: Unable to fetch cart data' });
    }

}