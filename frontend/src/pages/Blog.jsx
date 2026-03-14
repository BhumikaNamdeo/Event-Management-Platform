import React from 'react';
import Footer from '../components/Footer';

const blogs = [
  {
    id: 1,
    title: "How to Plan a Perfect Event",
    description: "Learn the step-by-step process of planning an event from scratch and making it unforgettable.",
    image: "https://images.unsplash.com/photo-1746021278356-66b31ca55dbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Top Event Trends in 2025",
    description: "Discover the hottest trends in event management that will dominate the industry in 2025.",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Event Budgeting Tips You Must Know",
    description: "Master your event budget with these essential and easy-to-follow tips.",
    image: "https://images.unsplash.com/photo-1721133073235-e4b5facb27fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Blog = () => {
  return (

    <div>

  
    <div className="max-w-full h-230 bg-white mx-auto  p-5">
      <h2 className="text-8xl font-bold mt-20 text-center mb-4">Our Event Insights Blog</h2>
      <p className='w-180 text-center text-gray-600 text-md font-medium ml-120'>Planning an event can seem overwhelming at first, but with a clear process and the right tools, it becomes easy and enjoyable! Whether you’re organizing a wedding, corporate seminar, or birthday party, these steps will help you stay on track.</p>

      <div className="grid md:grid-cols-3 mt-14 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg  overflow-hidden hover:shadow-xl transition-shadow">
            <img src={blog.image} alt={blog.title} className="w-full h-77 object-cover"/>
            <div className="p-5">
              <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 font-semibold mb-4">{blog.description}</p>
              <button className="bg-pink-500 text-white px-4 py-3 font-semibold rounded hover:bg-blue-600 transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    
          
    </div>
    <Footer/>

      </div>

    
  );
};

export default Blog;
