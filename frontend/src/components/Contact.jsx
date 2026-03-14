import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
    <div className="min-h-screen mt-10 p-4  flex items-center justify-center ">
      <div className="w-full max-w-8xl p-4  overflow-hidden bg-white ">
        <div className="grid md:grid-cols-2 ">
          {/* Contact Info */}
          <div className="bg-[#023047] rounded-lg text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-white rounded-full opacity-30"></div>
            <div className="absolute top-40 right-40 w-12 h-12 bg-white rounded-full opacity-25"></div>

            <div className="relative p-4  z-1">
              <h2 className="text-6xl font-bold mb-4">Contact Information</h2>
              <p className="text-white/80  mb-8 leading-relaxed">
                We'll create high-quality, linkable content and build at least 40 high-authority links to each 
                asset, paving the way for you to grow your rankings, improve brand.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">+8801778171686</div>
                    <div className="text-sm opacity-80">+7489333724</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Support@urgency.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Bhopal (M.P)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border ml-5 border-gray-200 p-4 rounded-md md:p-12">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-[#264653] mb-4">Get In Touch</h1>
              <p className="text-gray-600 font-semibold leading-relaxed">
                We'll create high-quality, linkable content and build at least 40 high-authority links to each 
                asset, paving the way for you to grow your rankings, improve brand.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-900 font-medium">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Trangely"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-14 w-full px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-900 font-medium">Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@currency.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-14 w-full px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-gray-900 font-medium">Your Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="I want to hire you quickly"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="h-16 w-full px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-gray-900 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write here your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-[140px] w-full px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="bg-pink-500 w-full  text-white px-6 py-3 rounded-md font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <Footer/>

    </div>
  );
};

export default Contact;
