import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ image, title, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition hover:opacity-80">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
