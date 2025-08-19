#!/bin/bash

echo "🚀 EmailJS Setup Script"
echo "========================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# EmailJS Configuration
# Get these values from your EmailJS dashboard

VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://www.emailjs.com/ and create an account"
echo "2. Add a Gmail service and get your Service ID"
echo "3. Create an email template and get your Template ID"
echo "4. Get your Public Key from Account → API Keys"
echo "5. Update the values in your .env file"
echo "6. Run 'npm run dev' to test your contact form"
echo ""
echo "📖 See EMAILJS_SETUP.md for detailed instructions"
echo ""
